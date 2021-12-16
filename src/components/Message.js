import React from 'react';
import FlashMessage from 'react-flash-message';
import '../styles/Message.css';

function Message(props) {
    return (
        <div className='message'>
            <FlashMessage duration={5000}>
                <strong>
                    {props.message}
                </strong>
            </FlashMessage>
        </div>
    )
}

export default Message;