import { createContext, useContext } from "react"
import { useEffect,useState } from "react";
import { createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,onAuthStateChanged,GoogleAuthProvider,signInWithPopup ,signInWithRedirect} from "firebase/auth";
import {auth,db} from '../firebase'
import{setDoc,doc} from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({children}){

    const [user, setUser] = useState({});

    // function signUp(email,password,displayName){
    //     createUserWithEmailAndPassword(auth,email,password,displayName);
    //     setDoc(doc(db,'users',email),{
    //     savedShows:[]
    //     })
    //     }
    async function signUp(email, password, displayName) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await updateProfile(user, { displayName: displayName });
          console.log('Display name updated:', user.displayName);
          await setDoc(doc(db, 'users', user.uid), {
            savedShows: [],
            displayName: displayName,
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        } catch (error) {
          console.error('Error during sign-up:', error);
        }
      }

function logIn(email,password){
    return signInWithEmailAndPassword(auth,email,password)
}
function logOut(){
    return signOut(auth)
}
function resetPassword(email){
    return sendPasswordResetEmail(auth,email)
}



  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
     
    });
    return () => {
        unsubscribe()
    };
  },[]);

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, logOut, resetPassword, signInWithGoogle, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
