import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { getFirestore, doc, setDoc } from "firebase/firestore"; 


const Choices = () => {



    const createCode = () =>{ 
        var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for ( let i = 0; i < 4; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const [selected, setSelected] = useState(false)

    const db = getFirestore();

    const handleCreateSession = async() => {
        
        await setDoc(doc(db, code, "teacherData"), {
            handsRaised : 0,
            numberOfStudents: 0,
            status: 0,
          })

        
    }

    const code = createCode();



    return ( 

        <>  
            <Navbar /> 
            <div className="flexbox column center">
                <div className="choices">
                        <div className="flexbox column center">
                            <h1>
                                First things first, are you a...
                            </h1>
                            <div className = "flexbox column center buttons">
                                <Link to={{pathname: `/create/${code}`}}><button onClick = {()=>handleCreateSession()}>Teacher</button></Link>
                                <button onClick = {()=>setSelected(true)}>Student</button>
                                {selected ? <Link to={{pathname: `/join:${code}`}}><button>Join</button></Link> : null}
                            </div>
                        </div>
                </div>
            </div>
        </>
     );
}
 
export default Choices;