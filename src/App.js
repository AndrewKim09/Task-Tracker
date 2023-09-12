
import './App.css';
import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {HomePage} from './Components/HomePage';
import { Tasks } from './Components/Tasks';
import { Create } from './Components/Create';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Components/firebase';

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {

    return <div>Loading...</div>;
    
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div class = "transition-fade bg-[#a5f3fc] w-[750px] h-[800px] m-auto mt-[50px] border-2 border-[#67e8f9] rounded-3xl shadow-[-15px_-15px_0px_0px_rgba(165,243,252),-25px_-25px_0px_0px_rgba(207,250,254)]">
          <Router basename={process.env.REACT_APP_URI}>
            <Routes>
              <Route path = "/" element = {<Navigate to="/home-page"/>} />
              <Route path = "/home-page" element = {user? <HomePage/>: <Navigate to= "/"/>}/>
              <Route path = "/tasks" element = {user? <Tasks/>: <Navigate to= "/"/>}/>
              <Route path = "/create" element = {user? <Create/>: <Navigate to= "/"/>}/>
            </Routes>
          </Router>
        </div>
    </div>
    </LocalizationProvider>
  );
}

export default App;
//q: when i deploy my app into github pages, it is blank when i am using tailwindcss and react
//a: https://stackoverflow.com/questions/68724290/why-is-my-react-app-blank-when-deployed-to-github-pages


