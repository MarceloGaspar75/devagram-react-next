import { useEffect, useState } from 'react';
import  Feed  from '../../../componentes/feed';
import comAutorizacao from '../../../hoc/comAutorizacao';
import { useRouter } from 'next/router';
import CabecalhoPerfil from '@/componentes/cabecalhoPerfil';

 function Perfil({usuarioLogado}) {
    const [usuario, setUsuario] = useState({});
    const router = useRouter();
   
    useEffect(async () => {
        setUsuario({
            nome: 'Marcelo Gaspar'
        });
        console.log('chegou aqui')
    }, [router.query.id]);

    return (
        <div className='paginaPerfil'>
            <CabecalhoPerfil 
                usuarioLogado ={usuarioLogado}
                usuario={usuario}
            
    />
        <p>teste</p>
            <Feed usuarioLogado ={usuarioLogado} />
        </div>
    );
}

export default comAutorizacao(Perfil);