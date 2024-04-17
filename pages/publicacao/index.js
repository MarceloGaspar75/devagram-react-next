import { useState } from "react";
import { useRouter } from "next/router";
import Botao from "../../componentes/botao";
import UploadImagem from "../../componentes/uploadImagem";
import CabecalhoComAcoes from "../../componentes/cabecalhoComAcoes";
import comAutorizacao from "../../hoc/comAutorizacao"
import imagemPublicacao from '../../public/imagens/imagemPubicacao.svg'
import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import FeedService from "../../services/FeedService";


const limiteDaDescricao = 255;
const descricaoMinima = 3;
const feedService = new FeedService();

function Publicacao() {

    const [imagem, setImagem] = useState();
    const [descricao, setDescricao] = useState('');
    const [inputImagem, setInputImagem] = useState();
    const [etapaAtual, setEtapaAtual] = useState(1);
    const router = useRouter();

    const estaNaEtapaUm = () => etapaAtual === 1;

    const obterTextoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm() && imagem) {
            return 'Cancelar';
        }

        return '';
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem) {
            return '';
        }
        if (estaNaEtapaUm()) {
            return 'Avançar';
        }
        return 'Compartilhar';
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            inputImagem.value = null
            setImagem(null);
            return;
        }
        setEtapaAtual(1);

    }
    const aoClicarAcaoDireitaCabecalho = () => {
        if (estaNaEtapaUm()){
            setEtapaAtual(2);
            return;
        }

        publicar();

    }

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        if (valorAtual.lenght >= limiteDaDescricao) {
            return;
        }
        setDescricao(valorAtual);
    }


    const obterClassNameCabecalho = () => {
        if (estaNaEtapaUm()) {
            return 'primeiraEtapa';
        }
        return 'segundaEtapa';
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert('A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada!')
                return;
            }  

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(corpoPublicacao);
            router.push('/');
        } catch (error) {
            alert('Erro ao salvar publicação!');
            
        }
    }

    const validarFormulario = () => {
        if (descricao.length < descricaoMinima) {
            return false;
        }    
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
    }

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeEsquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda}
                textoEsquerda={obterTextoEsquerdaCabecalho()}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                elementoDireita={obterTextoDireitaCabecalho()}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
                titulo='Nova Publicação'
            />

            <hr className="linhaDivisoria" />

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                    ? (
                        <div className="primeiraEtapa">
                            <UploadImagem
                                setImagem={setImagem}
                                aoSetarRerefencia={setInputImagem}
                                imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                                imagemPreview={imagem?.preview || imagemPublicacao.src}
                            />

                            <span className="desktop textoDragAnDrop"> Arraste sua foto aqui!</span>

                            <Botao
                                texto='Selecionar uma imagem'
                                manipularClique={() => inputImagem?.click()}

                            />
                        </div>
                    ) : (
                        <>
                            <div className="segundaEtapa">
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                />

                                <textarea
                                    rows={4}
                                    value={descricao}
                                    placeholder="Escreva uma legenda..."
                                    onChange={escreverDescricao}
                                    //onChange={e => setDescricao(e.target.value)}
                                ></textarea>
                            </div>
                            <hr className="linhaDivisoria" />
                        </>
                    )}

            </div>

        </div>
    );
}
export default comAutorizacao(Publicacao);