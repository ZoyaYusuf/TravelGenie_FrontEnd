import { useState } from 'react'; 
import ChatWindow from './ChatWindow';
import SideBar from './Sidebar';
import { MyContext } from './myContext';
import {v1 as uuidv1} from 'uuid';
import "./AiBot.css"

export default function AiBot(){
    const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
          <SideBar></SideBar>
          <ChatWindow></ChatWindow>
        </MyContext.Provider>
    </div>
  )
}