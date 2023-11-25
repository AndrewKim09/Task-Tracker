import React from 'react'
import Typed from 'react-typed';
import {FaStop} from 'react-icons/fa';
import { auth, provider} from './firebase';
import { signInWithPopup } from 'firebase/auth';

export const HomePage = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () =>{
    const result = await signInWithPopup(auth, provider);
    navigate("/tasks"); 
    window.location.reload();
  };
  return (
    <div class = "flex flex-col items-center">
      <div class = "font-bold text-7xl mt-[20px] text-[#2563eb]">Task Tracker</div>
      <div class = "w-[80%] flex items-center mt-5"><FaStop style={{color: '#2563eb', verticalAlign:'center'}}/> <Typed strings={["Finish Homework"]} typeSpeed={50} showCursor={false}></Typed></div>
      <div class = "w-[80%] flex items-center mt-5"><FaStop style={{color: '#2563eb'}}/> <Typed strings={["Start Project"]} typeSpeed={50} startDelay={750} showCursor={false}></Typed></div>
      <div class = "w-[80%] flex items-center mt-5"><FaStop style={{color: '#2563eb'}}/> <Typed strings={["Prepare to make dinner", "Meet up with Joe", "set up zoom meeting"]} typeSpeed={50} backSpeed={25} backDelay={50} startDelay={1150} loop smartBackspace={true}></Typed></div>
      

      <div class ="mt-20 text-2xl font-bold">Start tracking your tasks Today!</div>

      <p class = "mt-9">Sign in with google</p>
      <button class='login-button' onClick = {signInWithGoogle}>Login</button>

      
    </div>
  )
}
