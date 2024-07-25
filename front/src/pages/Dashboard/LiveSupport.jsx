import axios from 'axios'
import React, {useState, useEffect} from 'react'
import ChatCard from '../../components/Chat/ChatCard';
import Message from '../../components/Chat/Message';
import { jwtDecode } from 'jwt-decode';
import AdminDefaultLayout from '../../layout/AdminDefaultLayout';

const LiveSupport = () => {
    // const loggedInUser = JSON.parse(localStorage.getItem("person")) || false;
    // if(!loggedInUser) return <p className="p-10">No Chat available</p> //<Navigate to="/auth" state={{ from: location }} replace />
    // const foundUser = jwtDecode(loggedInUser);
    // const data = foundUser.userSession
    // const role = foundUser.userSession?.user_role?.role_name
    const userId = null//data?.user_id
    const [messages, setMessages] = useState([]);
    const [errMsg, setErrMsg] = useState([]);
    const [newMessage, setNewMessage] = useState({
        querysubject: '',
        querymessage: '',
        queryreply: '',
        querystatus: '', 
        isVerifiedChat: ''
    });

    useEffect(() => {
    // Fetch messages from the server (replace with your backend endpoint)
    axios.get(`/api/users/onechat/${userId}`)
        .then(response => setMessages(response.data.chat))
        .catch(error => console.error('Error fetching messages:', error));
    }, []);

    const handleSendMessage = () => {
    // Send the new message to the server (replace with your backend endpoint)
    axios.post('/api/users/registerchat', { querysubject: newMessage.querysubject, querymessage: newMessage.querymessage, queryreply: newMessage.queryreply, querystatus: newMessage.querystatus, isVerifiedChat: newMessage.isVerifiedChat })
        .then(response => {
            setMessages([...messages, response.data.objectToSend.newChat]);
            setNewMessage('');
        })
        .catch(error => {
            setErrMsg(error.response.data.message)
            console.error('Error sending message:', error.response.data.message)
        });
    };
  return (
    <AdminDefaultLayout>
    <div className="p-5">
        {/* <ChatCard/> */}
        {errMsg && <p className="mb-5 font-medium">{errMsg}</p>}
        <h1 className="mt-10 font-bold text-xl text-center text-warning dark:text-warning ">Chat with Live Support</h1>
        <div className="p-10 bg-white mt-5 items-center rounded-md">
            <div className="flex flex-rowflex-wrap gap-40">
                <div className="float-left h-15 mt-4 w-50 flex flex-row flex wrap shadow-xl">
                   <p className="p-4 text-black dark:text-white"> Reply</p>
                </div>
                {messages?.map(message => (
                    <div className="float-right mt-20 w-50 flex flex-row flex wrap shadow-xl">
                        
                            <Message key={message?.query_id} text={message?.query_message} />
                        
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSendMessage} className="flex flex-col flex-wrap mt-20">
                    <textarea cols="6" rows="2" className="w-full peer bg-transparent rounded-md border-2 focus:border-slate-800 border-slate-400 text-white p-5"></textarea>
                    <div className="flex flex-row flex-wrap gap-5 justify-center">
                        <button className="text-white dark:text-white h-10 w-50 mt-10 bg-primary rounded-md">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </AdminDefaultLayout>
  )
}

export default LiveSupport