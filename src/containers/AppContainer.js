import React from 'react';
import AppHeader from '../components/AppHeader';
import ChatList from '../components/Chatlist';
import MessageForm from '../components/MessageForm';
import chatElemStyles from '../styles/chatElemStyles.module.css';
import '../styles/globalStyles.css';

const chatsArrayKey = 'chatsArray';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleChatOpen = this.handleChatOpen.bind(this);
		this.handleBackwardClicked = this.handleBackwardClicked.bind(this);
		this.state = {
			isChatOpen: 0,
			companionName: "Companion's name",
			messageForm: '',
			chatList: <ChatList isChatOpen={0} openChatFunc={this.handleChatOpen} />,
		};
		this.chatListStyle = { display: 'flex' };
		this.messageFormStyle = { display: 'none' };
	}

	handleChatOpen(event) {
		let { target } = event;
		while (target.className !== chatElemStyles.chat_elem) {
			target = target.parentElement;
			if (target === null) {
				return;
			}
		}
		const openedChatId = target.getAttribute('id');
		const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		if (storageChatArray !== null) {
			this.setState({
				companionName: storageChatArray[openedChatId].companion,
			});
		}

		this.setState({ isChatOpen: 1 });
		this.setState({
			messageForm: (
				<MessageForm
					isChatOpen={1}
					chatId={openedChatId}
					chatsArrayKey="chatsArray"
				/>
			),
		});
		this.setState({ chatList: '' });
	}

	handleBackwardClicked(event) {
		this.setState({ companionName: "Companion's name" });
		this.setState({ isChatOpen: 0 });
		this.setState({
			chatList: <ChatList isChatOpen={0} openChatFunc={this.handleChatOpen} />,
		});
		this.setState({ messageForm: '' });
	}

	render() {
		return (
			<div className="main-window">
				<AppHeader
					isChatOpen={this.state.isChatOpen}
					companionName={this.state.companionName}
					backwardFunc={this.handleBackwardClicked}
				/>
				{this.state.chatList}
				{this.state.messageForm}
			</div>
		);
	}
}
