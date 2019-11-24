import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormInput from './FormInput';
import MessageElement from './MessageElement';
import styles from '../styles/messageFormStyles.module.scss';

const chatsArrayKey = 'chatsArray';

export default function MessageForm(props) {
	const { chatId } = useParams();

	const [submitButtonDisplayStyle, letSubmitButtonShow] = useState('none');
	const [inputValue, setInputValue] = useState('');
	const [messages, setMessages] = useState(messagesInit());

	function handleImage(event, files = event.target.files) {
		if (files.length) {
			const data = new FormData();
			const src = [];
			for (let i = 0; i < files.length; i += 1) {
				src[i] = window.URL.createObjectURL(files[i]);
				data.append('image', files[i]);
			}
			const messageObj = createMessageObj(src, 'img');
			addMessage(messageObj);
			fetch('https://tt-front.now.sh/upload', {
				method: 'POST',
				body: data,
			});
		}
	}

	function handleRecordStart() {
		function recordAudio(stream) {
			const mediaRecorder = new MediaRecorder(stream);

			const buttonStart = document.getElementById('start');
			const buttonStop = document.getElementById('stop');

			buttonStop.style.display = 'block';
			buttonStart.style.display = 'none';

			mediaRecorder.start();

			let chunks = [];

			mediaRecorder.addEventListener('dataavailable', (event) => {
				chunks.push(event.data);
			});

			mediaRecorder.addEventListener('stop', () => {
				const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
				chunks = [];
				const audioURL = URL.createObjectURL(blob);
				addMessage(createMessageObj(audioURL, 'audio'));
			});

			buttonStop.addEventListener(
				'click',
				() => {
					mediaRecorder.stop();
					buttonStop.style.display = 'none';
					buttonStart.style.display = 'block';
				},
				{ once: true },
			);
		}

		async function getMedia() {
			let stream = null;

			try {
				const constraints = { audio: true };
				stream = await navigator.mediaDevices.getUserMedia(constraints);
				recordAudio(stream);
			} catch (error) {
				console.log(error.message);
			}
		}

		getMedia();
	}

	function preventAndStop(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}

	function drop(event) {
		preventAndStop(event);
		const { files } = event.dataTransfer;
		handleImage(event, files);
	}

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

		if (inputValue === '') {
			return;
		}

		const messageObj = createMessageObj(inputValue);
		setInputValue('');
		addMessage(messageObj);
		messageToLocal(messageObj);
	}

	function handleAttachGeo() {
		if ('geolocation' in navigator) {
			const geoSuccess = (position) => {
				const { latitude } = position.coords;
				const { longitude } = position.coords;
				const pos = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
				const messageObj = createMessageObj(pos);
				addMessage(messageObj);
				messageToLocal(messageObj);
			};

			const geoError = (error) => {
				console.log(error.message);
			};

			const geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000,
			};

			navigator.geolocation.getCurrentPosition(
				geoSuccess,
				geoError,
				geoOptions,
			);
		} else {
			alert('Your browser does not support geolocation!');
		}
	}

	function messagesInit() {
		const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		const chatObj = storageChatArray[chatId];
		const messagesInitArray = [];

		for (let i = 0; i < chatObj.messages.length; i += 1) {
			messagesInitArray.push(buildMessage(chatObj.messages[i], i));
		}

		return messagesInitArray;
	}

	function createMessageObj(messageContent, contentType = 'text') {
		const messageObj = {
			contentType,
			messageContent,
			messageAuthor: 'Me',
			messageTime: new Date(),
		};
		return messageObj;
	}

	function buildMessage(messageObj, key = messages.length) {
		let position = 'right_messages';
		if (messageObj.messageAuthor !== 'Me') {
			position = 'left_messages';
		}

		const indicator = 1;

		const messageTime = new Date(messageObj.messageTime)
			.toTimeString()
			.slice(0, 5);

		const resultMessage = (
			<MessageElement
				key={key}
				indicator={indicator}
				contentType={messageObj.contentType}
				messageContent={messageObj.messageContent}
				messageTime={messageTime}
				position={position}
			/>
		);

		return resultMessage;
	}

	function addMessage(messageObj) {
		setMessages(messages.concat(buildMessage(messageObj)));
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
				<div
					className={styles.chat_container}
					onDragEnter={preventAndStop}
					onDragOver={preventAndStop}
					onDrop={drop}
				>
					{messages}
				</div>
				<FormInput
					placeholder="Сообщение"
					value={inputValue}
					onChange={handleChange}
					submitButtonDisplayStyle={submitButtonDisplayStyle}
					attachFunc={handleAttachGeo}
					handleImage={handleImage}
					handleRecordStart={handleRecordStart}
				/>
			</form>
		</div>
	);
}
