import logo from '../assets/images/logo.png';
// import Navbar from './Navbar';
import GoogleButton from 'react-google-button'
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import app  from "./Firebase.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const [redirect, changeRedirect] = useState(false);

    useEffect(() => {
        app.auth().onAuthStateChanged(function(user) {
            console.log('Welcome' + user);
        })    
    }, [])

   
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                console.log(token, user);

                // ...  
                changeRedirect(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode, errorMessage, email, credential);
            });
    }



    return ( 
        <>
            <div className="container flexbox column center">

                    <img src = {logo} className = 'logo' alt = 'logo'/>

                    <div className="flexbox column center">
                        <h1>
                            Pollz
                        </h1>
                    </div>

                    <GoogleButton onClick = {signIn} type="dark"/>

                    {redirect ? <Navigate to='/choices' />: <></>}

            </div>
        </>
     );
}
 
export default Login;