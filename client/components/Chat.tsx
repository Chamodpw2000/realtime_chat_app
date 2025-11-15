import React, { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { ChatMessageType } from '@/types';
import MessageInput from './Input';

const Chat = () => {

  const [messages , setMessages] = useState<ChatMessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (

    <>
    <div className='border border-black m-5 rounded-xl h-[calc(100vh-200px)] max-w-3xl  w-full p-5 overflow-y-auto gap-y-2 flex flex-col'> 
      {messages.map((msg, index) => (
        <ChatMessage key={index} content={msg.content} own={msg.own} />
      ))}
      <div ref={messagesEndRef} />
      
      </div>

      <div className='max-w-3xl w-full  px-5'>
        <MessageInput setMessages={setMessages} />
      </div>

      

      </>
  )
}

export default Chat
