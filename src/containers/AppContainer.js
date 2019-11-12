import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatList from '../components/Chatlist';
import MessageForm from '../components/MessageForm';
import chatElemStyles from '../styles/chatElemStyles.module.css';
import '../styles/globalStyles.css';
import ChatHeader from '../components/ChatHeader';
import ChatListHeader from '../components/ChatListHeader';

const chatsArrayKey = 'chatsArray';

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleChatOpen = this.handleChatOpen.bind(this);
		this.handleBackwardClicked = this.handleBackwardClicked.bind(this);
		this.state = {
			openedChatId: 0,
			companionName: "Companion's name",
		};
	}

	handleChatOpen(event) {
		let { target } = event;
		while (target.className !== chatElemStyles.chat_elem) {
			target = target.parentElement;
			if (target === null) {
				return;
			}
		}
		const openedChatId = +target.getAttribute('id');
		this.setState({ openedChatId });

		const storageChatArray = JSON.parse(localStorage.getItem(chatsArrayKey));
		if (storageChatArray !== null) {
			this.setState({
				companionName: storageChatArray[openedChatId].companion,
			});
		}
	}

	handleBackwardClicked(event) {
		this.setState({ companionName: "Companion's name" });
	}

	render() {
		return (
			<div className="main-window">
				<Router>
					<Switch>
						<Route exact path="/chat">
							<ChatHeader
								companionName={this.state.companionName}
								backwardFunc={this.handleBackwardClicked}
							/>
							<MessageForm
								chatsArrayKey={chatsArrayKey}
								chatId={this.state.openedChatId}
							/>
						</Route>
						<Route exact path="/">
							<ChatListHeader />
							<ChatList openChatFunc={this.handleChatOpen} />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}
