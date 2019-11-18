import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormInput from './FormInput';
import MessageElement from './MessageElement';
import styles from '../styles/messageFormStyles.module.css';

const chatsArrayKey = 'chatsArray';

export default function MessageForm(props) {
	const { chatId } = useParams();

	const chatContainerRef = React.createRef();
	let messagesCount = 0;

	const [submitButtonDisplayStyle, letSubmitButtonShow] = useState('none');
	const [inputValue, setInputValue] = useState('');
	const [messages, setMessages] = useState(messagesInit());

	useEffect(() => {
		scrollToBottom();
	});

	function handleChange(event) {
		const { value } = event.target;
		setInputValue(value);
		if (value !== '') {
			letSubmitButtonShow('inline-block');
		} else {
			letSubmitButtonShow('none');
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		letSubmitButtonShow('none');
		messagesCount += 1;

		if (inputValue === '') {
			return;
		}

		const messageObj = createMessageObj();
		setInputValue('');
		addMessage(messageObj);
		messageToLocal(messageObj);
	}

	function handleAttach() {}

	function scrollToBottom() {
		const chat = chatContainerRef.current;
		setTimeout(() => {
			chat.scrollTop = 9999;
		}, 0);
	}

	function messagesInit() {
		const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		const chatObj = storageChatArray[chatId];
		const messagesInitArray = [];
		for (; messagesCount < chatObj.messages.length; messagesCount += 1) {
			const messageElemProps = getMessageProps(chatObj.messages[messagesCount]);
			messagesInitArray.push(
				<MessageElement
					key={messageElemProps.key}
					indicator={messageElemProps.indicator}
					messageText={messageElemProps.messageText}
					messageTime={messageElemProps.messageTime}
					companionName={messageElemProps.companionName}
					position={messageElemProps.position}
				/>,
			);
		}
		return messagesInitArray;
	}

	function createMessageObj() {
		const messageObj = {
			messageText: inputValue,
			messageAuthor: 'Me',
			messageTime: new Date(),
		};
		return messageObj;
	}

	function getMessageProps(messageObj) {
		let position = 'right_messages';
		const indicator = 1;
		if (messageObj.messageAuthor !== 'Me') {
			position = 'left_messages';
		}
		const messageTime = new Date(messageObj.messageTime)
			.toTimeString()
			.slice(0, 5);
		const messageProps = {
			key: messagesCount,
			indicator,
			position,
			messageTime,
			messageText: messageObj.messageText,
		};
		return messageProps;
	}

	function addMessage(messageObj) {
		const messageElemProps = getMessageProps(messageObj);
		setMessages(
			messages.concat(
				<MessageElement
					key={messageElemProps.key}
					indicator={messageElemProps.indicator}
					messageText={messageElemProps.messageText}
					messageTime={messageElemProps.messageTime}
					companionName={messageElemProps.companionName}
					position={messageElemProps.position}
				/>,
			),
		);
		scrollToBottom();
	}

	function messageToLocal(messageObj) {
		const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		if (storageChatArray[chatId].messages.length === 0) {
			storageChatArray[chatId].messages = [];
		}
		storageChatArray[chatId].messages.push(messageObj);
		localStorage.setItem(chatsArrayKey, JSON.stringify(storageChatArray));
	}

	return (
		<div className={styles.message_form}>
			<form className={styles.form_chat} onSubmit={handleSubmit}>
				<div ref={chatContainerRef} className={styles.chat_container}>
					{messages}
				</div>
				<FormInput
					placeholder="Сообщение"
					value={inputValue}
					onChange={handleChange}
					submitButtonDisplayStyle={submitButtonDisplayStyle}
					attachFunc={handleAttach}
				/>
			</form>
		</div>
	);
}
