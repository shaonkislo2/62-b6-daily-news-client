import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from './../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    

    const providerLogin = 
    (provider) =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile);
    };

    const verifyEmail = () =>{
        return sendEmailVerification(auth.currentUser)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() =>{
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) =>{
            console.log('inside auth state change', currentUser);
            if(currentUser === null ||currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoading(false)
        });

        return () =>{
            unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        providerLogin,
        logOut, 
        createUser, 
        signIn, 
        loading, updateUserProfile,
        verifyEmail,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

/* 
config code 

const firebaseConfig = {
  apiKey: "AIzaSyBlRm4E9gwCQv06A_nfxn7jhSIsk9qeHI0",
  authDomain: "b6-dragon-news.firebaseapp.com",
  projectId: "b6-dragon-news",
  storageBucket: "b6-dragon-news.appspot.com",
  messagingSenderId: "737554103596",
  appId: "1:737554103596:web:403e65e8fce56d9f2a4089"
};
*/