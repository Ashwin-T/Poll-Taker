import Choices from '../pages/Choices'
import Teacher from '../pages/teacher/Teacher'
import Student from '../pages/student/Student'

import {Route, Routes} from 'react-router-dom';


const Sources = () => {
    return ( 
        <>
        <Routes>
            <Route path = "/" element = {<Choices />} />
            <Route path = "join/:joinCode" element = {<Student />} />
            <Route path = "create/:code" element = {<Teacher />} />
        </Routes>
        </>
     );
}
 
export default Sources;