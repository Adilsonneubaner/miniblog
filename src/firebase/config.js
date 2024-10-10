import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCcHQ_yHRfJ7Pd4KsuCNRAY_tadkU07G3M",
    authDomain: "miniblog-fbf87.firebaseapp.com",
    projectId: "miniblog-fbf87",
    storageBucket: "miniblog-fbf87.appspot.com",
    messagingSenderId: "266224643649",
    appId: "1:266224643649:web:1d03713d9a7d2cb8c120c0"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)

  export {db, app}