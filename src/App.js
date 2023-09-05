import logo from './logo.svg';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { useState, useRef, useEffect } from 'react';
import { Chat } from './components/Chat';
import {signOut} from 'firebase/auth';
import {auth} from './firebase-config'


function App() {
  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roominput = useRef(null);


  // const signuserout = async  ()=>{
  //  await signOut(auth);
  //  cookies.remove("auth-token");
  //  setIsAuth(false);
  //  setRoom(null);
  // }

  const signuserout = async () => {
    await signOut(auth); // Use the 'auth' object here
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  

  useEffect(() => {
    
    setIsAuth(!!cookies.get("auth-token"));
  }, [cookies]);

  const handleSignIn = () => {
    setIsAuth(true);
    {isAuth && <Auth/>}
  }

  if (!isAuth) {
    return (
      <div className='returntext'>
        <Auth onSignIn={handleSignIn}  inputroom={roominput}/>
        
      </div>
    );
  }
  
  return (
    <div className="App">
      {room ? (
        <Chat  room={room}/>
      ) : (
        <div className="room"> 
          <div className="roomname">
            Enter Room Name1
          </div>
          <input type="text" className='input' ref={roominput} />
          <button className='Enterid' onClick={() =>{
            setRoom(roominput.current.value)
            {<Chat room={room}/>}
          } 
            }>Enter Chat</button>

<div className="signout">
        <button onClick={signuserout}>Sign out</button>
      </div>

        </div>
        
      )}
        
    
    </div>
    
  )
}

export default App;


