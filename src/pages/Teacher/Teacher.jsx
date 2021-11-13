import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";

import {getFirestore, doc, onSnapshot, deleteDoc } from "firebase/firestore";

const Teacher = () => {

    const [loading, setLoading] = useState(false);


    const WaitingRoom = () => {


        const {code} = useParams();

        const db = getFirestore();


        const [teacherData, setTeacherData] = useState({});

    
        useEffect(() => {

            onSnapshot(doc(db, `${code}`, "teacherData"), (doc) => {
                setTeacherData(doc.data());
            });


        }, [db, code])

            const [loading, setLoading] = useState(false);


        const handleTermination = async() => {
            setLoading(true);
                await setTeacherData({numberOfStudents : 0})
                window.location.href = '/'
                await deleteDoc(doc(db, `${code}`, "teacherData"))
                await deleteDoc(doc(db, `${code}`, "currentQuestion")).then();
            setLoading(false);
       }

        

        return (  
            <>
            <Navbar />
            <div className="flexbox column center">
                <div className="flexbox column center join">
                    <h1>Awaiting Students...</h1>
                    <h2># of Students: {teacherData.numberOfStudents}</h2>
                    <br />
                    <div className="joinCode">Join Code: {code}</div>
                    <br />
                    <div>
                        <button className = 'buttonStart' onClick = {()=>{setStarted(true)}}>Start Session</button>
                        <button className = 'buttonStop' onClick = {()=>{handleTermination()}}>End Session</button>
                    </div>
                </div>
            </div>
            </>
        );

    }
 
    
    const [started, setStarted] = useState(false);





    return ( 
    
    <>
    
        {loading ? <Loading /> : <WaitingRoom />}

    </> 
    );
}
 
export default Teacher;