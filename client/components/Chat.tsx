import React, { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { ChatMessageType } from '@/types';
import MessageInput from './Input';
interface ChatProps {
 setChat: (chat: any) => void;
  user?: any;
  chat?: ChatMessageType[];
  socket : any;
}
const Chat = ({ setChat , user, chat, socket}: ChatProps) => {


  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (

    <>
    <div className='border border-black m-5 rounded-xl h-[calc(100vh-200px)] max-w-3xl  w-full p-5 overflow-y-auto gap-y-2 flex flex-col'> 
{chat?.map((msg, index) => {
 msg = {...msg, own: msg?.user?.id === user.current?.id};
  return <ChatMessage key={index} content={msg.content} own={msg.own} type={msg.type} />;
})}
      <div ref={messagesEndRef} />
      
      </div>

      <div className='max-w-3xl w-full  px-5'>
        <MessageInput setChat={setChat} user={user} socket={socket} />
        
      </div>



      </>
  )
}

export default Chat
