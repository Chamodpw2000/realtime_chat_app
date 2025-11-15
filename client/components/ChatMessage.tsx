import type { ChatMessageType } from '@/types'




const ChatMessage = ({content,own,type}: ChatMessageType) => {
  return (
    <div className={`text-xs w-full  flex    ${ type=="system" ? 'justify-center' : own ? 'justify-end' : 'justify-start'}`}>

        <div className={`w-fit max-w-2xl wrap-break-word ${own ? 'bg-blue-100' : 'bg-gray-200'} p-2 rounded-lg`}>
                  {type==="text" || type==="system" ? content : type==="image" ? <img src={content} alt="uploaded image" className='max-w-sm rounded-md' /> : "Unsupported message type"}
        </div>

    </div>
  )
}

export default ChatMessage