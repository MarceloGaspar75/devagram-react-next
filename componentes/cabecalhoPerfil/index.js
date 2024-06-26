import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';
import CabecalhoComAcoes from '../cabecalhoComAcoes';
import Avatar from '../avatar';
import Botao from '../botao';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import UsuarioService from '../../services/UsuarioService';


const usuarioService = new UsuarioService;

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}){
    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] =useState(0);
    const router = useRouter();
    useEffect(() => {
        if (!usuario) {
            return;
        }
        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    }, [usuario]);

    const obterTextoBotaoSeguir = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar Perfil';
        }
        if (estaSeguindoOUsuario) {
            return 'Deixar de seguir';
        }
        return 'Seguir';
    }

    const obterCorDoBotaoSeguir = () => {
        if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
            return 'invertido'
        }
        return 'primaria';
    }

    const manipularCliqueBotaoPrincipal = async () => {
        if ( estaNoPerfilPessoal) {
           return router.push('/perfil/editar');
        }
        try {
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoOUsuario 
                ? (quantidadeSeguidores - 1) 
                : (quantidadeSeguidores + 1)
            );
            setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
        } catch (error) {
            alert(`Erro ao Seguir/Deixar de seguir!`)
            
        }
    }
    const aoClicarSetaEsquerda = () => {
        router.back();
    }
    const logout =() => {
        usuarioService.logout();
        router.push('/');
    }

    const obterElementoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal) {
            return (
                    <Image 
                        src={imgLogout}
                         alt='icone Logout'
                         onClick={logout}
                         whidth={23}
                         height={23}
                     />
            );
        }
        return null;
    }


    return (        
        <div className='cabecalhoPerfil largura30pctDesktop'>
            <CabecalhoComAcoes
          iconeEsquerda={!estaNoPerfilPessoal ? null : imgSetaEsquerda}
          aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
          titulo={usuario.nome}
          elementoDireita={obterElementoDireitaCabecalho()}
          />

        <hr  className='linhaDivisoria'/>

        <div className='statusPerfil'>
            <Avatar src={usuario.avatar} />
            <div className='informacoesPerfil'>
                <div className='statusContainer'> 
                    <div className='status'>
                        <strong>{usuario.publicacoes}</strong>
                        <span>Publicações</span>
                    </div>
                    <div className='status'>
                        <strong>{usuario.seguidores}</strong>
                        <span>Seguidores</span>
                    </div>
                    <div className='status'>
                        <strong>{usuario.seguindo}</strong>
                        <span>Seguindo</span>
                    </div>
                </div>
                <Botao 
                    texto={obterTextoBotaoSeguir()}
                    cor={obterCorDoBotaoSeguir()}
                    manipularClique={manipularCliqueBotaoPrincipal}
                    />
            </div>

        </div>
        </div>
    )
}