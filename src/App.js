import React, { useEffect, useRef } from 'react';
import './App.css';
import { useState } from 'react';
import { format } from 'date-fns';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { serverTimestamp,addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7G2h0vsx46cp-fn-F9M-Tgq4MjgYEUKU",
  authDomain: "chat-app---fireship.firebaseapp.com",
  projectId: "chat-app---fireship",
  storageBucket: "chat-app---fireship.firebasestorage.app",
  messagingSenderId: "679096871755",
  appId: "1:679096871755:web:0fc9d0a317b9e30aef16ce",
  measurementId: "G-ME8VDP1889"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        {/* <h1>⚛️🔥💬</h1> */}
        <h1>SIGMA CHAT</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return auth.currentUser && <button className='sign-out' onClick={() => signOut(auth)}>Sign Out</button>;
}

function ChatRoom() {
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("createdAt","desc"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async(e) =>
  {
    e.preventDefault();
    if(formValue !== "")
    {
      const {uid,photoURL} = auth.currentUser;
      const messageValue = formValue;
      setFormValue('');
      await addDoc(messagesRef, {
        text: messageValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
      
    }

  };
  return (
    <>
      <div className='chat-container' ref={chatContainerRef}>
        {/* {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)} */}
        {messages && messages.length > 0 && [...messages].reverse().map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
      </div>
      {/* <span ref={dummy}></span> */}

      <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" />
          <button type="submit">🕊️</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  let imgURL = photoURL ? photoURL : 'https://img.icons8.com/?size=100&id=tYFbpXDdXGWa&format=png&color=000000';

  // Format timestamp (handle null case)
  const time = createdAt ? format(createdAt.toDate(), "HH:mm (dd/MM/yyyy)") : "Sending...";
  return (
    <div className={`message ${messageClass}`}>
        <img src = {imgURL} alt ='user' className='profile-img'/>
        <p>{text}</p>
        <small>{time}</small>
    </div>
  )
}

export default App;
