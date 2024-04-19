import Image from 'next/image';

export default function CabecalhoComAcoes({
    className,
    iconeEsquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita,
    aoClicarElementoDireita
}) {

    return (
        <div className={`cabecalhoComAcoes  ${className}`}> 
            {iconeEsquerda ? (
                <Image 
                    src={iconeEsquerda}
                    alt='icone esquerda cabecalho ações'
                    onClick={aoClicarAcaoEsquerda}
                    width={20}
                    height={20}
                />
            ) : (
                textoEsquerda !== null && (
                    <span className="cabecalhoComAcoesTextoEsquerda" onClick={aoClicarAcaoEsquerda}>
                    {textoEsquerda}
                    </span>
                )
            )}

            <h3>{titulo} - X </h3>

            {elementoDireita  && (
                <button 
                type='button'
                className='btnAcaoDireita'
                onClick={aoClicarElementoDireita}
                >
                    {elementoDireita}
                </button>
            )}
        </div>
    )
}