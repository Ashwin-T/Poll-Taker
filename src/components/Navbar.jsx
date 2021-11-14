import logo from '../assets/images/logo.png'
import { getAuth, signOut } from "firebase/auth";
import {Navigate} from 'react-router-dom'
import swal from 'sweetalert';


const Navbar = () => {

        const auth = getAuth();

        const handleSignOut = () => {

            signOut(auth).then(() => {
                console.log('Signed Out')
                swal("You have been signed out", "NOTE: Signing out does not mean ending/leaving a session!\nRelogin and click end/leave session", "success");
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