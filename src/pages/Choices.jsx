import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 
import swal from 'sweetalert';



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
            questions : 0,
            numberOfStudents: 0,
            start: false,
          })

          await setDoc(doc(db, code, "currentQuestion"), {
            currentQuestion: 'n/a',
            yes : 0,
            no: 0,
            maybe: 0,
          })
    
    }

    const code = createCode();
    
    const [codeInput, setCodeInput] = useState('')

    const handleJoin = async() => {

        const docRef = doc(db, codeInput, "teacherData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            window.location.href = `/#/join/${codeInput}`
        } else {
            swal( "Oops" ,  "The code you entered is not valid" ,  "error" )
        }

    }

    

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
                                {selected ? 


                                <>  
                                    <div>
                                    <label>Enter Code: </label>
                                        <input type = "text" className = 'joinInput' value = {codeInput}  onChange = {(e)=> setCodeInput(e.target.value)}placeholder = 'a1b2'/>
                                    </div>
                                    <button className = 'joinButton' onClick = {()=>handleJoin()}>Join</button>
                                </>
                                : null}
                            </div>
                        </div>
                </div>
            </div>
        </>
     );
}
 
export default Choices;