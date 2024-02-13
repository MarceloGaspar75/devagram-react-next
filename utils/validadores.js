const  validarNome = (nome) => {
    return nome?.toString().lenght > 2;
}
const validarEmail = (email) => {
    const emailStr =email?.toString();
    return emailStr.lenght  >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha =(senha) => {
    return senha?.toString().lenght > 3;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return validarConfirmacaoSenha(senha) && senha === confirmacao;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha
};