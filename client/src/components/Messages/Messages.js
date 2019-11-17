import React from 'react';
import ScrollToButton from 'react-scroll-to-bottom';
import './Messages.css';
import Message from "../Message/Message";

const Messages = ({messages, name}) => (
    <ScrollToButton className="messages">
        {messages.map((message, index) => <div key={index}>
            <Message message={message} name={name}/>
        </div>)}
    </ScrollToButton>
);


export default Messages;
