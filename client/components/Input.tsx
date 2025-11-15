'use client'
import { ChatMessageType } from "@/types";
import { useState } from "react";
import { VscSend } from "react-icons/vsc";

interface MessageInputProps {
  setMessages?: (message: any) => void;
}

const MessageInput = ({ setMessages }: MessageInputProps) => {

  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      content: inputValue,
      own: true,
    };

    if (setMessages) {
      setMessages(
        (prev:any) => [...prev, newMessage]
      );
    }

    setInputValue("");
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  return (
  <div className='w-full h-full flex items-center gap-2 p-2  justify-center rounded-md  border border-gray-300 my-5'>
  <input 
    type="text" 
    value={inputValue} 
    placeholder='Type your message...' 
    className='w-full bg-transparent outline-none' 
    onChange={(e)=> {setInputValue(e.target.value)}}
    onKeyPress={handleKeyPress}
  />
  <VscSend className="text-[29px] cursor-pointer hover:text-blue-500 transition-colors" onClick={sendMessage} />

 

  </div>
  )
}

export default MessageInput