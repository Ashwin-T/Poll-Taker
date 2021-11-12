import {Route, Routes} from 'react-router-dom';
import Login from './components/Login';

import Choices from './pages/Choices'

const App = () => {

  return (
    <>  
          <Routes>
            <Route path = "/" element = {<Login />}/>
            <Route path = "choices" element = {<Choices />} />
            <Route path = "join" />
            <Route path = "create" />
          </Routes>
    </>
  );
}

export default App;
