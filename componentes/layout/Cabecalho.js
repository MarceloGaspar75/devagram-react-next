import Image from 'next/image';
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from './Navegacao';
import { useState } from 'react';
import ResultadoPesquisa from './ResultadoPesquisa';


export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);

    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if(termoPesquisado.length < 3) {
            return;
        }
        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'Marcelo',
                email: 'marcelo@devagram.com',
                _id: '3242432'

            },

            {
                avatar: '',
                nome: 'Thais',
                email: 'thaiso@devagram.com',
                _id: '3005354'

            },

            {
                avatar: '',
                nome: 'Matheus',
                email: 'matheus@devagram.com',
                _id: '1109175'

            },
        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', {id} );      
    }

    return (
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                   <Image
                   src={logoHorizontalImg}
                   alt='Logo Devagram'
                   layout='fill'
                   />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image
                        src={imagemLupa}
                        alt='Icone Lupa'
                        layout='fill'
                        />
                    </div>

                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className='desktop'/>
            </div>
            {resultadoPesquisa.length >0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa 
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
    
            )}  
            
        </header>

    );
}