import {  useEffect, useState, } from "react";
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default function Feed({ usuarioLogado }) {
    const [listaDePostagens, setistaDePostagens] = useState([]);

    const pegarDados = async () => {
        
        const {data} =await feedService.carregarPostagens();

        setistaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Marcelo Gaspar',
                    avatar: null
                },
                fotoDoPost: 'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg',
                descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry/s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Fulano',
                        mensagem: 'Muilo legal'
                    },
                    {
                        nome: 'Fulano de tal',
                        mensagem: 'imagem linda'
                    },
                    {
                        nome: 'Fulano da esquina',
                        mensagem: 'Ok de boa'
                    }
                ]
            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Matheus P. Gaspar',
                    avatar: null
                },
                fotoDoPost: 'https://png.pngtree.com/thumb_back/fw800/background/20230524/pngtree-fire-phoenix-wallpaper-hd-image_2670157.jpg',
                descricao: 'Neque porro quisquam est qui dolorem ipsum sit amet, consectetur, adipisci velit...',
                curtidas: [],
                comentarios: [
                    {
                        nome: 'Ciclano',
                        mensagem: 'Muilo bom'
                    }
                ]
            },
        ]);
       
    };
 
    
    useEffect(() => {
        pegarDados();
    }, [usuarioLogado]);

    return(
        <div className="feedContainer largura30pctDesktop" >
            {listaDePostagens.map(dadosPostagem => (
                <Postagem 
                key={dadosPostagem.id} 
                {...dadosPostagem} 
                usuarioLogado={usuarioLogado}
                />
            ))}
        </div>
    );      
}

    
            