import React, { useState, useEffect } from 'react';
import './evento-detalhes.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/';

// variavel props serve para recuperar o id da pagina.
function EventoDetalhes(props){

// constantes para armazenar os detalhes do evento.
    const [evento, setEvento] = useState({});
// constante para guardar a imagem dinamicamente na pagina detalhes.
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail); 
    const [carregando, setCarregando] = useState(1);
    const [excluido, setExcluido] = useState(0);


// UseEffect para sempre que usar a pagina ele ir no firebase e carregar as informações em tela.
// Pega a minha coleção no firestore database no caso é eventos, mas especificamente está pegando um doc especifico.
// then usado para aguardar o resultado.
// firebase.storage para carregar a url da imagem.

    /*useEffect(() => {
        firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
            setEvento(resultado.data())
            firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => {
                setUrlImg(url)
                setCarregando(0);
            });
        })
    }, [])
    */

    function remover(){
        firebase.firestore().collection('eventos').doc(props.match.params.id).delete().then(() => {
            setExcluido(1);
        }, [])
    }

    useEffect(() => {
        if(carregando){        
        firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
            setEvento(resultado.data())
            firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1)
            firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL().then(url => {
                setUrlImg(url)
                setCarregando(0);
            });                
        });
    }else{
        firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => setUrlImg(url))
    }
    },[])

    return(
        <>

        <Navbar />

        {excluido ? <Redirect to='/' /> : null}

        <div className="container-fluid">
         {

              carregando ? <div className="row"><div className="spinner-border mx-auto" role="status"><span class="visually-hidden">Loading...</span></div></div>  
              :
            <div>
                <div className="row">
                    <img src={urlImg} className="img-banner" alt="Banner" />

                        <div className="col-12 text-right mt-1 visualizacoes">
                            <i class="fas fa-eye"></i> <span>{evento.visualizacoes + 1}</span>
                        </div>
                    
                        <h3 className="mx-auto mt-5 titulo"><strong>{evento.titulo}</strong></h3>
                    
                </div>

                <div className="row mt-5 d-flex justify-content-around">
                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                        <i className="fas fa-ticket-alt fa-2x"></i>
                        <h5 ><strong>Tipo</strong></h5>
                        <span className="mt-3">{evento.tipo}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                        <i className="fas fa-calendar-alt fa-2x "></i>
                        <h5 ><strong>Data</strong></h5>
                        <span className="mt-3">{evento.data}</span>
                    </div>

                    <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                        <i className="fas fa-clock fa-2x "></i>
                        <h5 ><strong>Hora</strong></h5>
                        <span className="mt-3">{evento.hora}</span>
                    </div>
                </div>

                <div className="row box-detalhes mt-5">
                    <div className="col-12 text-center text-black">
                        <h5><strong>Detalhes do Evento</strong></h5>
                    </div>

                    <div className="col-12 text-center text-black">
                        <p>{evento.detalhes}</p>
                    </div> 
                                                   
                </div>

                {
                    usuarioLogado === evento.usuario ?              
                    <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>
                    : ''
                }
                    {
                    usuarioLogado === evento.usuario ? <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro ml-2 mr-2">Remover Evento</button>
                    : null
                    }
                    
            </div>

            }
        </div>
        </>
    )
}

export default EventoDetalhes;