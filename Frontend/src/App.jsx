import {Routes, Route,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Customize from './pages/Customize';
import { userDataContext } from './context/UserContext';
import MainPage from './pages/MainPage';
import { useContext } from 'react';
import Customize2 from './pages/Customize2';
// import { UserContext } from "./context/UserContext";

const App=()=>{
  const {userData,setUserData}=useContext(userDataContext)
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chat" element={<MainPage/>}/>
      <Route path="/signup" element={!userData?<Signup/>:<Navigate to={"/home"}/>}/>

      <Route path="/login" element={!userData?<Login/>:<Navigate to={"/home"}/>}/>

      <Route path="/customize" element={userData?<Customize/>:<Navigate to={"/login"}/>}/>

      <Route path="/home" element={(userData?.assistantImage && userData?.assistantName)?<MainPage/>:<Navigate to={"/customize"}/>}/> 
      <Route path="/customize2" element={ userData?<Customize2/>:<Navigate to={"/login"}/>}/>
      
    </Routes>
    
  )

}
export default App;