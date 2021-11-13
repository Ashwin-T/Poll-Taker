import logo from '../assets/images/logo.png'
import { getAuth, signOut } from "firebase/auth";
import {Navigate} from 'react-router-dom'

const Navbar = () => {

        const auth = getAuth();

        const handleSignOut = () => {

            signOut(auth).then(() => {
                console.log('Signed Out')
            }).catch((error) => {
                console.log(error)
            });

            <Navigate to="/"/>
        }
  
    return ( <>
        <nav>
            <div className = 'nav-links'>
                <img alt = 'logo' src = {logo} />
            </div>

            <div className = 'flexbox'>
                <div className = 'nav-links'>
                    <h6 onClick = {handleSignOut}>Sign Out</h6>
                </div>
            </div>
                
        </nav>
    
    </> );
}
 
export default Navbar;