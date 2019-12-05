import React, { useState } from 'react';
import ChatElement from './ChatElement';
import styles from '../styles/chatListStyles.module.scss';

import { ReactComponent as CreateSvg } from '../images/createchat_button.svg';

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
			lastmessageText = lastmessageObj.messageContent;
			lastmessageTime = new Date(lastmessageObj.messageTime).toTimeString().slice(0, 5);
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
			<button type="button" className={styles.create_chat} onClick={handleCreateChat}>
				<CreateSvg className={styles.create_chat_img} />
			</button>
		</div>
	);
}
