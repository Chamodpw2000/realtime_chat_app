import React, { useState } from 'react';

interface SignUpProps {
  user: any;
  socket: any;
  input: string;
  setInput: (input: string) => void;
  onLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ user, socket, input, setInput, onLogin }) => {


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    user.current = {name: input, id: socket.id};

    
    socket.emit("user_joined", { user: input.trim() , id: socket.id });
    onLogin(); // This triggers a state update in parent to show chat UI
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your name"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className={`bg-blue-500 text-white py-2 rounded font-semibold transition-colors ${!input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
