import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InputPublico from "../inputPublico";
import Botao from "../botao";
import {validarEmail, validarSenha} from "../../utils/validadores";

import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemLogo from "../../public/imagens/logo.svg";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Login() {

    const [email, setEmail] = useState("");
    const [Senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

const validarFormulario = () => {
    return (
        validarEmail(email)
        && validarSenha(Senha)
    );
}

const aoSubmeter = async (e) => {
    e.preventDefault();
    if(!validarFormulario()) {
        return;
    }

    setEstaSubmetendo(true);

    try {
        await usuarioService.login({
            login: email,
            senha: Senha
        });

        // TODO: redirecionar o usuário para Home
        
    } catch (error) {
        alert(
            "Erro ao realizar o login. " + error?.response?.data?.erro
        );
        
    }

    setEstaSubmetendo(false);


}

    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div> 

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={Senha}
                        mensagemValidacao="Necessário mais de 3 caracteres"
                        exibirMensagemValidacao={Senha && !validarSenha(Senha)}
                    />
                    

                    <Botao
                        texto="Login"
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora!</Link>

                </div>
            </div>

        </section>
    );
}