import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { signOut } from "firebase/auth";
import './auth.css'
import {useNavigate} from 'react-router-dom';

const cookies = new Cookies();


export const Auth = () => {
  const navigate=useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!cookies.get("auth-token")
  );

  const [isEnteringChat, setIsEnteringChat] = useState(false);
  const [roomName, setRoomName] = useState("");

  const [room, setRoom] = useState(null);
  const [isAuth, setIsAuth] = useState(!!cookies.get("auth-token"));

  const[retchat, setretchat] = useState(false);


  const signinwithgoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const signuserout = async () => {
    await signOut(auth); // Use the 'auth' object here
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  useEffect(() => {
    if (isAuthenticated) {
      // User is authenticated, show the chat room input and button
      setIsEnteringChat(true);
    }
  }, [isAuthenticated]);

  const handleEnterChat = () => {
    // Handle entering the chat room here
    
    console.log(`Entering chat room: ${room}`);

    setretchat(true);
    // You can perform any logic related to entering the chat room here
  };

  return (
    <div className="authentic">
      {!isAuthenticated && (
        <div>
          <p>
           <div className="signintext" >
           <h2>Sign In with Google</h2>
           </div>
           <div className="buttontext">
           <button onClick={signinwithgoogle} className="button1">Sign in</button>
           </div>
          </p>
         
        </div>
      )}

      {isAuthenticated && isEnteringChat && (
        <div className="room">
          <div className="roomname">
            Enter Room Name
          </div>
          <input
            type="text"
            className="input"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="Enterid" onClick={handleEnterChat}>
            Enter Chat
          </button>
        </div>
      )}

      {retchat==true &&(
        <Chat room={room}/>
      )}
    </div>
  );
};
