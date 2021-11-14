import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading"

import {getFirestore, doc, setDoc, onSnapshot, deleteDoc, updateDoc} from "firebase/firestore";

const Teacher = () => {

    
        const {code} = useParams();

        const db = getFirestore();

        const [teacherData, setTeacherData] = useState({numberOfStudents : 0, questions: 0, start: false});
        const [questionData, setQuestionData] = useState({question : 'none', yes: 0, no: 0, maybe: 0, pollNumber: 0});

    
        const [loading, setLoading] = useState(true) 
        useEffect(() => {

            setLoading(true)
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
            await setTeacherData({numberOfStudents : 0, questions: 0, start: false, pollNumber: 0})
            await setQuestionData({question : 'none', yes: 0, no: 0, maybe: 0})
            await deleteDoc(doc(db, `${code}`, "teacherData"))
            await deleteDoc(doc(db, `${code}`, "currentQuestion")).then(()=>window.location.href = '/')
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

        const handleTermination = async() => {
            setLoading(true);
            await setTeacherData({numberOfStudents : 0, questions: 0, start: false, pollNumber: 0})
            await setQuestionData({question : 'none', yes: 0, no: 0, maybe: 0})
            await deleteDoc(doc(db, `${code}`, "teacherData"))
            await deleteDoc(doc(db, `${code}`, "currentQuestion")).then(()=>window.location.href = '/')
            setLoading(false);
       }


        const handleQuestionSubmit = async()=>{
            await setDoc(doc(db, code, "currentQuestion"), {
                currentQuestion : question,
                yes: 0,
                no: 0,
                maybe: 0,
            })

            const startRef = doc(db, `${code}`, "teacherData")
            await updateDoc(startRef, {
                pollNumber: teacherData.pollNumber + 1,
            });
        }

        return(
        <>

            {window.innerWidth > 600 ? <div className = 'flexbox center teacherView' >
                <div className = 'flexbox column center'>

                <input type = 'text' value = {question} onChange = {(e)=>setQuestion(e.target.value)}className = 'questionInput' placeholder = 'New Poll Here' />
                <br/>

                    <button className = 'buttonStart' onClick = {()=>handleQuestionSubmit()}>Post</button>


                    <h2>Join Code: {code}</h2>
            
                </div>
            
                <div className = 'flexbox column center teacherView'>
                    <h1>
                    Current Poll: <span className = 'teacherQuestion'>{questionData.currentQuestion}</span>
                    </h1>

                    <h2>
                        Hands Raised: <span className = 'teacherQuestion'>{teacherData.questions}</span>
                    </h2>

                    <h3>
                        Yes: <span className = 'teacherQuestion'>{(100* (questionData.yes) / (questionData.yes + questionData.no + questionData.maybe)).toFixed(2)}%</span>
                    </h3>
                    <h3>
                        No: <span className = 'teacherQuestion'>{(100* (questionData.no) / (questionData.yes + questionData.no + questionData.maybe)).toFixed(2)}%</span>
                    </h3>
                    <h3>
                        Maybe: <span className = 'teacherQuestion'>{(100* (questionData.maybe) / (questionData.yes + questionData.no + questionData.maybe)).toFixed(2)}%</span>
                    </h3>

                    <button className = 'buttonStop' onClick = {()=>{handleTermination()}}>End Session</button>
                </div>

            </div>: <> <div className = 'flexbox column center'>

                <input type = 'text' value = {question} onChange = {(e)=>setQuestion(e.target.value)}className = 'questionInput' placeholder = 'New Poll Here' />
                <br/>

                <button className = 'buttonStart' onClick = {()=>handleQuestionSubmit()}>Post</button>


                <h2>Join Code: {code}</h2>

            </div>

    <div className = 'flexbox column center teacherView'>
        <h1>
        Current Poll: <span className = 'teacherQuestion'>{questionData.currentQuestion}</span>
        </h1>

        <h2>
            Hands Raised: <span className = 'teacherQuestion'>{teacherData.questions}</span>
        </h2>

        <h3>
            Yes: <span className = 'teacherQuestion'>{(100* (questionData.yes) / (questionData.yes + questionData.no + questionData.maybe)).toFixed(2)}%</span>
        </h3>
        <h3>
            No: <span className = 'teacherQuestion'>{(100* (questionData.no) / (questionData.yes + questionData.no + questionData.maybe)).toFixed(2)}%</span>
        </h3>
        <h3>
            Maybe: <span className = 'teacherQuestion'>{(100* (questionData.maybe) / (questionData.yes + questionData.no + questionData.maybe)).toFixed(2)}%</span>
        </h3>

        <button className = 'buttonStop' onClick = {()=>{handleTermination()}}>End Session</button>
    </div> </>}

           

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