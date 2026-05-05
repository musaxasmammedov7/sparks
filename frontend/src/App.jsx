import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <Dashboard user={user} />
          <Chatbot />
        </>
      )}
    </div>
  );
}

export default App;
