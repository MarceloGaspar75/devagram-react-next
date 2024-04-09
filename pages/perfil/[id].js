import { useEffect, useState } from 'react';
import  Feed  from '../../componentes/feed';
import comAutorizacao from '../../hoc/comAutorizacao';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '../../componentes/cabecalhoPerfil';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();

 function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    const obterPerfil =  async (idUsuario) => {
        try {
           const { data } = await usuarioService.obterPerfil(
            estaNoPerfilPessoal()
            ? usuarioLogado.id
            : idUsuario
        );
           setUsuario(data);
        } catch (error) {
            alert(`Erro ao obter o perfil do usuário!`);
        }

        
    }

    const estaNoPerfilPessoal = () => {
        return router.query.id === 'eu';
    }
   
    useEffect( () => {
        if (!router.query.id) {
            return;
        }

        obterPerfil(router.query.id);
        
    }, [router.query.id]);

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil 
                usuarioLogado = {usuarioLogado}
                usuario = {usuario}
                estaNoPerfilPessoal = {estaNoPerfilPessoal()}
            />

            <Feed 
            usuarioLogado ={usuarioLogado}
            idUsuario={usuario?._id} 
            />
        </div>
    );
}

export default comAutorizacao(Perfil);