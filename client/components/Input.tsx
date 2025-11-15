'use client'
import { ChatMessageType } from "@/types";
import { useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { FaCloudUploadAlt } from "react-icons/fa";

interface MessageInputProps {
  setChat: (message: any) => void;
  user?: any;
  socket: any;
}

const MessageInput = ({ setChat, user, socket }: MessageInputProps) => {
  const uploadInput = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleImageUpload = (e: any) => {
    console.log("handling file")
    const file = e.target.files[0]
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        const msg = { content: base64Image, type: "image", user : user.current };
        setChat((prev: any) => [...prev, msg])
        socket.emit("send_message", msg)
        uploadInput.current!.value = "";
      };
      reader.readAsDataURL(file);
    }
  }

  const sendMessage = () => {
    if (inputValue) {
      const newMessage = {
        content: inputValue,
        user: user.current,


        type: 'text'
      };

      if (setChat) {
        setChat(
          (prev: any) => [...prev, newMessage]
        );
      }

      socket.emit("send_message", newMessage);



      setInputValue("");



    } else {


      uploadInput.current?.click();

    }




  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  const userTyping = (e: any) => {
    setInputValue(e.target.value);
  }

  return (
    <div className='w-full h-full flex items-center gap-2 p-2  justify-center rounded-md  border border-gray-300 my-5'>
      <input
        type="text"
        value={inputValue}
        placeholder='Type your message...'
        className='w-full bg-transparent outline-none'
        onChange={(e) => { userTyping(e) }}
        onKeyPress={handleKeyPress}
      />
    <input
      type="file"


      className=' hidden'

      ref={uploadInput}
      onChange={(e) => handleImageUpload(e)}
    />

  {inputValue
    ? <VscSend className="text-[29px] cursor-pointer hover:text-blue-500 transition-colors" onClick={sendMessage} />
    : <FaCloudUploadAlt className="text-[29px] cursor-pointer hover:text-blue-500 transition-colors" onClick={sendMessage} />
  }
    </div>
  )
}

export default MessageInput