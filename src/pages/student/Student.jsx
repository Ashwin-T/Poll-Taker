import Navbar from '../../components/Navbar'
import Loading from "../../components/Loading"

import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import {getFirestore, doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore"
import swal from 'sweetalert';

const Student = () => {

    const db = getFirestore();

    const {joinCode} = useParams();
    
    const [teacherData, setTeacherData] = useState({numberOfStudents : 0, questions: 0, start: false, pollNumber: 0});
    const [questionData, setQuestionData] = useState({question : 'none', yes: 0, no: 0, maybe: 0});


    const [selected, setSelected] = useState(false)

    const [pollNumber, setPollNumber] = useState(0);

    const [loading, setLoading] = useState(false);
    const [left, setLeft] = useState(false); 
    
    let navigate = useNavigate();


    useEffect(() => {

        setLoading(true);
        const changeSelected = async () => {
            const docRef = doc(db, joinCode, "teacherData");
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setPollNumber(teacherData.pollNumber);
                setSelected(false);
            }
        }

        changeSelected();
        setLoading(false);

    }, [teacherData, joinCode, db])

    useEffect(() => {
        setLoading(true);
        onSnapshot(doc(db, `${joinCode}`, "teacherData"), (doc) => {
          setTeacherData(doc.data());
        });

        onSnapshot(doc(db, `${joinCode}`, "currentQuestion"), (doc) => {
            setQuestionData(doc.data());
            setLoading(false);
         });

  }, [db, joinCode])

   

    useEffect(() => {

        setLoading(true);

        const checkForDoc = async() => {

            const docRef = doc(db, joinCode, "teacherData");
            const docSnap = await getDoc(docRef);
    
            if (!docSnap.exists() && !left) {
                swal("You have been kicked or the session has ended!" , "If this is mistake, try re-entering a join code" ,  "warning" )
                window.location.href = `/Poll-Taker/#`
            }
           
        }
   
           checkForDoc();

           setLoading(false);



    } , [db, joinCode, teacherData, left])


    const handleChoose  = async(choice) => {
        

            setLoading(true);

            setSelected(true);

            console.log('Answer Submitted for Current question number: ' + pollNumber)

            if(choice === 0){
                const ref = doc(db, `${joinCode}`, "currentQuestion")
                await updateDoc(ref, {
                    yes: questionData.yes + 1
                });
            }
            if(choice === 1){
                const ref = doc(db, `${joinCode}`, "currentQuestion")
                await updateDoc(ref, {
                    no: questionData.no + 1
                });
            }
            if(choice === 2){
                const ref = doc(db, `${joinCode}`, "currentQuestion")
                await updateDoc(ref, {
                    maybe: questionData.maybe + 1
                });
            }

            setLoading(false);


        
   }

   const handleLeave = ()=>{
       setLeft(true)
       navigate('/')
   }


    return (
        <>
          <Navbar />

          {loading ? <Loading /> :

            <div className="flexbox column center">
                <div className="flexbox column center join">
                    <h1>Current Poll: {questionData.currentQuestion}</h1>

                    {!selected ? <div className="flexbox center">

                        <button className = 'buttonChoose' onClick={() => handleChoose(0)}>Yes</button>
                        <button className = 'buttonChoose' onClick={() => handleChoose(1)}>No</button>
                        <button className = 'buttonChoose' onClick={() => handleChoose(2)}>Maybe</button>
                        
                    </div>: <h1 style = {{color: 'green'}} className="flexbox center">Your Answer Has Been Submitted</h1>}


                    <button onClick = {handleLeave} className = 'buttonStop'>Leave</button>

                    <div className="flexbox flex-end center">

                    </div>
                </div>



                <div className = 'showCode'>Session Code: {joinCode}</div>

            </div>}


            

        </>
      );
}
 
export default Student;