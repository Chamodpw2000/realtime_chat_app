import React, { useState } from 'react'

interface SignUpProps {
  user:any;
  socket: any;
}

const SignUp = ({ user, socket }: SignUpProps) => {
  const [input , setInput] = useState("");
  return (
    <div>SignUp</div>
  )
}

export default SignUp