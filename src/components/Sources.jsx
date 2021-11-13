import Choices from '../pages/Choices'
import Teacher from '../pages/Teacher/Teacher'
import {Route, Routes} from 'react-router-dom';


const Sources = () => {
    return ( 
        <>
        <Routes>
            <Route path = "/" element = {<Choices />} />
            <Route path = "join" />
            <Route path = "create/:code" element = {<Teacher />}>
            </Route>
        </Routes>
        </>
     );
}
 
export default Sources;