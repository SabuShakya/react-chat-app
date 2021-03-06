import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import Infobar from "../Infobar/Inforbar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);

        socket.emit('join', {name, room}, () => {});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
            // setUserId(message.currentUserId); // yo garda kina mildaena?
            setUserId(socket.id);// yo garda milxa
        })
    }, [messages]);

    // function for sending messages
    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', {message, userId}, () => setMessage(''))
        }
    };

    console.log("message sent", message);
    console.log("messages", messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar
                    roomName={room}/>
                <Messages
                    messages={messages}
                    name={name}/>
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
