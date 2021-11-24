import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();
    
    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            // se der tudo certo ele entra aqui
            setMsgTipo('sucesso')
            setTimeout(() => {
                dispatch({type: 'LOG_IN', usuarioEmail: email})
            },2000);
            
        }).catch(erro => {
            // se der tudo errado ele cai aqui
            setMsgTipo('erro')
        });
    }

    

    return (
        <div className="login-content d-flex align-items-center">

            {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null}

                <form className="form-signin mx-auto">
                <div className="text-center mb-4">
                
                
                <h1 className="h3 mb-3 fw-normal text-white font-weight-bold">Login</h1>
                </div>
             
                    <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control my-2" id="floatingInput" placeholder="E-mail" />                     
                    <input onChange={(e) => setSenha(e.target.value)}  type="password" class="form-control my-2" id="floatingPassword" placeholder="Senha" />
                           
                <button onClick={logar} class="w-100 btn btn-lg btn-primary btn-login" type="button">Entrar</button>

                <div className="msg-login text-white texte-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>BEM VINDO! </strong>Você está conectado! &#9989;</span>}                                        
                    {msgTipo === 'erro' && <span><strong>INCORRETO! </strong>Usuário ou senha incorretos! &#10060;</span>}
                </div>

                <div className="opcoes-login mt-5 text-center">                   
                    <Link to="usuariorecuperarsenha" className="mx-2">Recuperar Senha</Link>
                    <span className="text-white">&#10072;</span>
                    <Link to='novousuario' className="mx-2">Criar Conta</Link>
                </div>

            </form>
        </div>
    )
}

// export default xxxxx; retorna tudo o que estiver dentro da function Login ou o que eu quiser que esteja dentro da function.
export default Login;


