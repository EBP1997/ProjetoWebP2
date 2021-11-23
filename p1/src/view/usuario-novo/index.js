import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar/';

import './usuario-novo.css';

function NovoUsuario(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){

        setCarregando(1);

        setMsgTipo(null);

        
        
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso')

        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')

            if(!email || !senha){
                setMsgTipo('erro')
                setMsg('Informe o e-mail e senha para realizar o cadastro!')
                return;
            }

            
           switch(erro.message)
           {
           case 'Password should be at least 6 characters':
               setMsg('A senha deve ter pelo menos 6 caracteres!');
               break;
           case 'The email address is already in use by another account.':
                setMsg('Este e-mail já está sendo utilizado por outro usuário!');
               break;
           case 'The email address is badly formatted':
                    setMsg('O formato do e-mail é inválido!');
               break;
            default:
               setMsg('Não foi possível cadastrar. Tente novamente mais tarde')
               break;
           }

        });

    }

    return (
        <>
        <Navbar/>

        <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
                <h1 className="h3 mb-3 text-white font weight-bold">Cadastro</h1>

                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />
                <input onChange={(e) => setSenha(e.target.value)} type="passord" className="form-control my-2" placeholder="Senha" />

                {
                    carregando ? <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
                    : <button onClick={cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                }
                
                

                <div className="msg-login text-black texte-center my-5">
                    {msgTipo === 'sucesso' && <span><strong>BEM VINDO! </strong>Usuário cadastrado com sucesso! &#9989;</span>}                                        
                    {msgTipo === 'erro' && <span><strong>ERRO! </strong> {msg} &#10060;</span>}
                </div>

            </form>
        </div>
        </>
    )
}   

export default NovoUsuario;