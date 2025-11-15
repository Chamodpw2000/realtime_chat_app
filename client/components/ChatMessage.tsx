import type { ChatMessageType } from '@/types'




const ChatMessage = ({content,own}: ChatMessageType) => {
  return (
    <div className={`text-xs w-full  flex    ${own ? 'justify-end' : 'justify-start'}`}>

        <div className={`w-fit max-w-2xl wrap-break-word ${own ? 'bg-blue-100' : 'bg-gray-200'} p-2 rounded-lg`}>
                  {content}
        </div>

    </div>
  )
}

export default ChatMessage