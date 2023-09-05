
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config"
import "./chat.css"

export const Chat =(props)=>{

    const {room}= props;



   const[newmessage, setnewmessage] = useState();
   const[messages,  setmessages] = useState([]);
   
   const messagesRef = collection(db, "messages");
    

   useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdat")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setmessages(messages);
    });

    return () => unsuscribe();
  }, []);

      const handlesubmit = async (e) => {
        e.preventDefault() ;  //here you dont want the page to reload 
         if(newmessage==="")return;
 
         await addDoc(messagesRef, {
            text: newmessage,
            createdat: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
           
         });
         setnewmessage("")
    }

    return <div className="chat-app">

        <div className="header">
            <h1>Welcome here</h1>
        </div>
         
         <div>
            {
                messages.map((message)=>{
                    return <div className="message" key={message.id }>

                       <span className="user">{message.user}</span>
                       {message.text}
                    </div>
                })
            }
         </div>



        <form action="new-message-form" onSubmit={handlesubmit}>
            <input type="text" className="new-message-input"  placeholder="Type your message"
            onChange={(e)=>setnewmessage(e.target.value)}
            value = {newmessage}/>
            
            <button className="sendbutton" type="submit"> Send </button>
        </form>
    </div>
}