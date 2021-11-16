import Login from './components/Login';
import Sources from './components/Sources';
import Loading from './components/Loading';
//hooks
import { useEffect } from 'react';
import {useAuthState} from "react-firebase-hooks/auth"
//firebase
import { getAuth } from 'firebase/auth';
import app from './components/Firebase';

const App = () => {

  const auth = getAuth(); 
  useEffect(() => {
    console.log('firebase obj: ' + app);
  }, [])

  const [user, loading, error] = useAuthState(auth);

  const ErrorDisplay = () => {
    return(
      <div className="container flexbox column center">
        <h1>Sorry we have encountered an error of {error}.</h1>
        <h2>Quit tab and retry</h2>
      </div>
    )
  }

  return (
    <>  
        {!loading ? error ?  <ErrorDisplay />: user ? <Sources /> : <Login />: <Loading />}
    </>
  );
}

export default App;
