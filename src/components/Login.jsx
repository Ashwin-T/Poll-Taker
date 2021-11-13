import logo from '../assets/images/logo.png';
import GoogleButton from 'react-google-button'

//firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();


    const signIn = () => {
        console.log('sign in attempt')
        
        signInWithPopup(auth, provider)
        .then((result) => {
          GoogleAuthProvider.credentialFromResult(result);
         
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);

          console.log('error: ' + errorCode, errorMessage, email, credential)

          // ...
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

            </div>
        </>
     );
}
 
export default Login;