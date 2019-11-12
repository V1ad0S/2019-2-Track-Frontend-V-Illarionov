import React, { useState } from 'react';
import ChatElement from './ChatElement';
import styles from '../styles/chatListStyles.module.css';

const chatsArrayKey = 'chatsArray';

export default function ChatList(props) {
	let chatCount = 0;
	const [chats, setChats] = useState(chatsInit());
	const chatlistRef = React.createRef();

	function getChatProps(chatObj) {
		let lastmessageText = '';
		let lastmessageTime = '';

		let indicator = 0;

		if (chatObj.messages.length !== 0) {
			indicator = 1;
			const lastmessageObj = chatObj.messages[chatObj.messages.length - 1];
			lastmessageText = lastmessageObj.messageText;
			lastmessageTime = new Date(lastmessageObj.messageTime)
				.toTimeString()
				.slice(0, 5);
		}

		const chatElemProps = {
			key: chatCount,
			id: chatCount,
			indicator,
			lastmessageText,
			lastmessageTime,
			companionName: chatObj.companion,
		};

		return chatElemProps;
	}

	function scrollToBottom() {
		const chatlist = chatlistRef.current;
		setTimeout(() => {
			chatlist.scrollTop = 9999;
		}, 0);
	}

	function chatsInit() {
		const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		if (storageChatArray !== null) {
			const chatsInitArray = [];
			for (; chatCount < storageChatArray.length; chatCount += 1) {
				const chatElemProps = getChatProps(storageChatArray[chatCount]);
				chatsInitArray.push(
					<ChatElement
						key={chatElemProps.key}
						id={chatElemProps.id}
						indicator={chatElemProps.indicator}
						lastmessageText={chatElemProps.lastmessageText}
						lastmessageTime={chatElemProps.lastmessageTime}
						companionName={chatElemProps.companionName}
						onClickFunc={chatElemProps.onClickFunc}
					/>,
				);
			}
			return chatsInitArray;
		}
		return [];
	}

	function createChatObj() {
		const chatObj = {
			id: chatCount,
			companion: 'Name',
			messages: [],
		};
		return chatObj;
	}

	function handleCreateChat() {
		const chatObj = createChatObj();
		addChat(chatObj);
		chatToLocal(chatObj);
		chatCount += 1;
		scrollToBottom();
	}

	function addChat(chatObj) {
		const chatElemProps = getChatProps(chatObj);
		setChats(
			chats.concat(
				<ChatElement
					key={chatElemProps.key}
					id={chatElemProps.id}
					indicator={chatElemProps.indicator}
					lastmessageText={chatElemProps.lastmessageText}
					lastmessageTime={chatElemProps.lastmessageTime}
					companionName={chatElemProps.companionName}
				/>,
			),
		);
	}

	function chatToLocal(chatObj) {
		let storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		if (storageChatArray === null) {
			storageChatArray = [];
		}
		storageChatArray.push(chatObj);
		localStorage.setItem(chatsArrayKey, JSON.stringify(storageChatArray));
	}

	return (
		<div ref={chatlistRef} className={styles.chats_list}>
			{chats}
			<button
				type="button"
				className={styles.create_chat}
				onClick={handleCreateChat}
			>
				<svg
					className={styles.create_chat_img}
					x="0px"
					y="0px"
					width="528.899px"
					height="528.899px"
					viewBox="0 0 528.899 528.899"
					style={{ fill: 'currentColor' }}
				>
					<path
						d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
						c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
						C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
						L27.473,390.597L0.3,512.69z"
					/>
				</svg>
			</button>
		</div>
	);
}
