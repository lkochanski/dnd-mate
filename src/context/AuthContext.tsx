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
import {UserInfo} from '@firebase/auth-types';
import {useAppDispatch} from "../app/hooks";
import {setUserData} from "../redux/slices/userSlice";
import {setGlobalLoading} from "../redux/slices/reduxAppSlice";

const UserContext: any | undefined = createContext(undefined);


export const AuthContextProvider = ({children}: any) => {

  const [user, setUser] = useState<UserInfo | null | undefined>();
  const dispatch = useAppDispatch();

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
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!!currentUser) {
        const preparedUserData = {
          providerId: currentUser.providerId,
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          phoneNumber: currentUser.phoneNumber,
          photoURL: currentUser.photoURL,
          isAnonymous: currentUser.isAnonymous,
        }
        dispatch(setUserData(preparedUserData));
      } else {

        const preparedUserData = {
          providerId: "",
          uid: "",
          displayName: null,
          email: null,
          emailVerified: false,
          phoneNumber: "",
          photoURL: null,
          isAnonymous: false,
        }

        dispatch(setUserData(preparedUserData));
      }
      dispatch(setGlobalLoading(false));

  });

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <UserContext.Provider value={{createUser, logout, signIn, googleSignIn, sendRecoveryPasswordMail, user}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
}
