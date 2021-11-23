import firebase from 'firebase';


const firebaseConfig = {

    //BANCO DE DADOS ANTIGO - LIMITE DE USO EXPIROU
  apiKey: "AIzaSyBWmI8yBfgsQz5WQffbc69MCcW7sQWCzis",
  authDomain: "eventos-b32fa.firebaseapp.com",
  projectId: "eventos-b32fa",
  storageBucket: "eventos-b32fa.appspot.com",
  messagingSenderId: "148393577050",
  appId: "1:148393577050:web:f0385ee33636641689e663"
};
   

  // SEGUNDO BANCO DE DADOS
   /* apiKey: "AIzaSyD2zFaRxNhjWknETQzazl1RoRDXCG_3ssU",
    authDomain: "eventos1-961c3.firebaseapp.com",
    projectId: "eventos1-961c3",
    storageBucket: "eventos1-961c3.appspot.com",
    messagingSenderId: "489227112835",
    appId: "1:489227112835:web:6d89613f68cff23c8366b6",

  };
  */
  
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);