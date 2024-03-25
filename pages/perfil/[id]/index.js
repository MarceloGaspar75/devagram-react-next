import { useEffect, useState } from 'react';
import  Feed  from '../../../componentes/feed';
import comAutorizacao from '../../../hoc/comAutorizacao';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '@/componentes/cabecalhoPerfil';
import UsuarioService from '../../../services/UsuarioService';

const usuarioService = new UsuarioService();

 function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();

    const obterPerfil =  async (idUsuario) => {
        try {
           const { data } = await UsuarioService.obterPerfil(idUsuario);
           return data;
        } catch (error) {
            alert(`Erro ao obter o perfil do usuário!`);
            
        }
    }
   
    useEffect( () => {
        if (!router.query.id) {
            return;
        }

        const dadosPerfil = obterPerfil(router.query.id);
        setUsuario(dadosPerfil);
    }, [router.query.id]);

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil 
                usuarioLogado ={usuarioLogado}
                usuario={usuario}
            
    />

            <Feed usuarioLogado ={usuarioLogado} />
        </div>
    );
}

export default comAutorizacao(Perfil);