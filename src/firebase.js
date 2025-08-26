import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDAGnd5aqW8_kz5OO4cPsizRPYu97xSHIs",
  authDomain: "netflix-clone-aaf0d.firebaseapp.com",
  projectId: "netflix-clone-aaf0d",
  storageBucket: "netflix-clone-aaf0d.firebasestorage.app",
  messagingSenderId: "154320237018",
  appId: "1:154320237018:web:520011b45ff88e2e3b10e3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}


const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signUp, logout};