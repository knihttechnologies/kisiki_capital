import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
function Message({ text, subject, reply, status, isVerifiedChat }) {
    const [chatMsg, setChatMsg] = useState('');
    if(isVerifiedChat !== 'yes') return setChatMsg('No messages at this time')
  return (
    <div>
        {chatMsg && <p className="p-5 font-medium">{chatMsg}</p>}
        <p className="font-medium p-4 text-black dark:text-white">{subject}</p>
        <p className="font-medium p-4 text-black dark:text-white">{text}</p>
    </div>
  );
}

export default Message;