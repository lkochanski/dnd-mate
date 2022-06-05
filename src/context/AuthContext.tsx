import {auth} from "../utils/firebase";
import {createContext, useContext, useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { UserInfo } from '@firebase/auth-types';

const UserContext: any | undefined = createContext(undefined);


export const AuthContextProvider = ({children}: any) => {

  const [user, setUser] = useState<UserInfo | null | undefined>();

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  const sendRecoveryPasswordMail = async (email: string) => {

    await sendPasswordResetEmail(auth, email);
    console.log("Sended!")
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    }
  },[])

  return (
      <UserContext.Provider value={{ createUser, logout, signIn, googleSignIn, sendRecoveryPasswordMail, user }}>
        {children}
      </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
}
