import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading"

import {getFirestore, doc, setDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const Teacher = () => {

    
        const {code} = useParams();

        const db = getFirestore();

        const [teacherData, setTeacherData] = useState({numberOfStudents : 0, questions: 0, start: false});
        const [questionData, setQuestionData] = useState({question : 'none', yes: 0, no: 0, maybe: 0});

    
        const [loading, setLoading] = useState(true) 
        useEffect(() => {

            onSnapshot(doc(db, `${code}`, "teacherData"), (doc) => {
                setTeacherData(doc.data());
            });

            onSnapshot(doc(db, `${code}`, "currentQuestion"), (doc) => {
                setLoading(false);
                setQuestionData(doc.data());
            });

        }, [db, code])


    const WaitingRoom = () => {

        const handleStart = async() =>{
            setLoading(true);

            const startRef = doc(db, `${code}`, "teacherData")
            await updateDoc(startRef, {
                start: true
            });
            setLoading(false);

        }


        const handleTermination = async() => {
            setLoading(true);
            await setTeacherData({numberOfStudents : 0, questions: 0, start: false})
            window.location.href = '/'
            await deleteDoc(doc(db, `${code}`, "teacherData"))
            await deleteDoc(doc(db, `${code}`, "currentQuestion"))
            setLoading(false);
       }

        

        return (  
            <>
            <h1>Awaiting Students...</h1>
                    <h2># of Students: {teacherData.numberOfStudents}</h2>
                    <br />
                    <div className="joinCode">Join Code: {code}</div>
                    <br />
                    <div>
                        <button className = 'buttonStart' onClick = {()=>{handleStart()}}>Start Session</button>
                        <button className = 'buttonStop' onClick = {()=>{handleTermination()}}>End Session</button>
                    </div>
            </>
        );

    }


    
    const Session = ()=>{

        const [question, setQuestion] = useState('');



        const handleSessionTermination = async() => {
            setLoading(true);
            await setTeacherData({numberOfStudents : 0, questions: 0, start: false})
            await setQuestionData({question : 'none', yes: 0, no: 0, maybe: 0})

            await updateDoc(doc(db, `${code}`, "teacherData"), {
                start: false
            });

            await deleteDoc(doc(db, `${code}`, "teacherData"))
            await deleteDoc(doc(db, `${code}`, "currentQuestion")).then(()=> window.location.href = '/')
            setLoading(false);

       }

        const handleQuestionSubmit = async()=>{
            await setDoc(doc(db, code, "currentQuestion"), {
                currentQuestion : question,
                yes: 0,
                no: 0,
                maybe: 0,
            })
        }

        return(
        <>

            <br />
            <div className = 'flexbox column center'>

            <input type = 'text' value = {question} onChange = {(e)=>setQuestion(e.target.value)}className = 'questionInput' placeholder = 'Enter New Yes/No/Maybe Question Here' />
            <br/>
            {/* <button className = 'option' onClick = {()=>setOptions(options + 1)}>+ Option</button> */}

            <button className = 'buttonStart' onClick = {()=>handleQuestionSubmit()}>Post</button>


            <h2>Join Code: {code}</h2>

            </div>

            <hr />
            
            <div className = 'flexbox column center' dashboard>
                <h1>
                   Current Question: <span className = 'teacherQuestion'>{questionData.currentQuestion}</span>
                </h1>

                <h3>
                    Yeses: <span className = 'teacherQuestion'>{questionData.yes}</span>
                </h3>
                <h3>
                    Nos: <span className = 'teacherQuestion'>{questionData.no}</span>
                </h3>
                <h3>
                    Maybes: <span className = 'teacherQuestion'>{questionData.maybe}</span>
                </h3>
            </div>

            <button className = 'buttonStop' onClick = {()=>{handleSessionTermination()}}>End Session</button>


        </>)
    }
 
    


    return ( 
    
    <>
        <Navbar />
            <div className="flexbox column center">
                <div className="flexbox column center join">
                    {loading ? <Loading /> : teacherData.start ? <Session />: <WaitingRoom />}
                </div>
            </div>

    

    </> 
    );
}
 
export default Teacher;