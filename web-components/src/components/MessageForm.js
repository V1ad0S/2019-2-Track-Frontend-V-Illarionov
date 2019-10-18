const indicateArray = ['', '', ''];
indicateArray[0] = '';
indicateArray[1] = `
    <svg class="tick" x="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 448.8 448.8" style="fill: currentColor;" xml:space="preserve">
        <polygon points="142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55"/>
    </svg>
`;
indicateArray[2] = `
    <svg class="double-tick" x ="0px" y="0px" width="2vh" height="2vh" viewBox="0 0 594.149 594.149" style="fill: currentColor;" xml:space="preserve">
        <path d="M448.8,161.925l-35.7-35.7l-160.65,160.65l35.7,35.7L448.8,161.925z M555.899,126.225l-267.75,270.3l-107.1-107.1
        l-35.7,35.7l142.8,142.8l306-306L555.899,126.225z M0,325.125l142.8,142.8l35.7-35.7l-142.8-142.8L0,325.125z"/>
    </svg>
`;

const template = document.createElement('template');
template.innerHTML = `
    <style>
      form-input {
        height: 6vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    
      .form-chat {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    
      .chat-container {
        height: 85vh;
        display: flex;
        flex-direction: column;
        background-color: #EEE;
        overflow-y: scroll;
      }
    
      .message-container {
        line-height: 4vh;
        max-width: 80%;
        min-width: 30%;
        display: inline-flex;
        flex-direction: column;
        border-radius: 1vh;
        margin-top: 1vh;
        margin-bottom: 1vh;

        animation-name: add-message-animation;
        animation-duration: 0.5s;
      }
    
      .message-text {
        color: black;
        font-size: calc(2vh + 10px);
        letter-spacing: 0.07em;
        word-wrap: break-word;
        word-break: break-word;
        padding-left: 0.5em;
        padding-right: 0.5em;
        padding-top: 0.02em;
        display: flex;
        align-self: flex-start;
        align-items: center;
      }
    
      .message-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
      }

      .message-time {
        user-select: none;
        color: #777;
        font-size: 2vh;
        align-self: flex-end;
        line-height: 3vh;
        margin-right: 1vh;
      }

      .mes-indicator {
        height: 3vh;
        margin-right: 1vh;
        color: #8E24AA;
      }
    
      .right-messages {
        position: relative;
        justify-content: flex-end;
        align-items: flex-end;
        align-self: flex-end;
        background-color: #8E24AA25;
        margin-right: 2vh;
      }
    
      .right-messages::before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        right: -2vh;
        bottom: 1vh;
        border: 1vh solid;
        border-color: transparent transparent #e2d2e6 #e2d2e6;
      }
    
      .left-messages {
        position: relative;
        justify-content: flex-start;
        align-items: flex-start;
        align-self: flex-start;
        background-color: #FAFAFA;
        margin-left: 2vh;
      }
      
      .left-messages::before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: -2vh;
        bottom: 1vh;
        border: 1vh solid;
        border-color: transparent #fff #fff transparent;
      }
      
      input[type=submit] {
        visibility: collapse;
      }

      @keyframes add-message-animation {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
      }
    </style>
    
    <form class="form-chat">
        <div class="chat-container"></div>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this.shadowRoot.querySelector('form');
    this.$form.appendChild(document.createElement('form-input'));
    this.$input = this.$form.querySelector('form-input');
    this.$input.setAttribute('name', 'message-text');
    this.$input.setAttribute('placeholder', 'Сообщение');
    this.$chatContainer = this.shadowRoot.querySelector('.chat-container');
    this.$attach_button = this.$input.$attach_button;
    this.$submit_button = this.$input.$submit_button;

    this.$idChat = 0;
    this.$chatsArrayKey = 'chatsArray';

    this.$attach_button.addEventListener('click', this.onAttachClicked.bind(this));
    this.$submit_button.addEventListener('click', this.onSubmitClicked.bind(this));
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
    this.$form.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onSubmitClicked() {
    this.$form.dispatchEvent(new Event('submit'));
    this.$submit_button.style.display = 'none';
    this.$input.$input.focus();
  }

  onAttachClicked() {
    //  It's only test
    this.$input.$input.focus();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.$input.value === '') {
      return;
    }
    const messageObj = {};
    messageObj.messageText = this.$input.value;
    messageObj.messageAuthor = 'Me';
    messageObj.sendingTime = new Date();
    this.$input.value = '';
    this.addMessage(messageObj);
    this.messageToLocal(messageObj);
  }

  onKeyPress(event) {
    this.onKeyUp();
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  onKeyUp() {
    this.$submit_button.style.display = 'inline-block';
    if (this.$input.value === '') {
      this.$submit_button.style.display = 'none';
    }
  }

  addMessage(messageObj) {
    const divFormatMessageContainer = document.createElement('div');
    const divFormatMessageText = document.createElement('div');
    const divFormatMessageInfo = document.createElement('div');
    const divFormatMessageTime = document.createElement('span');
    const divFormatIndicator = document.createElement('div');

    if (messageObj.messageAuthor === 'Me') {
      divFormatMessageContainer.className = 'right-messages message-container';
      const index = 1;
      divFormatIndicator.innerHTML = indicateArray[index];
    } else {
      divFormatMessageContainer.className = 'left-messages message-container';
    }

    divFormatMessageText.className = 'message-text';
    divFormatMessageText.innerText = messageObj.messageText;

    divFormatMessageInfo.className = 'message-info';
    divFormatIndicator.className = 'mes-indicator';
    divFormatMessageTime.className = 'message-time';
    const date = new Date(messageObj.sendingTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10) ? (`0${hours}`) : hours;
    minutes = (minutes < 10) ? (`0${minutes}`) : minutes;
    divFormatMessageTime.innerText = `${hours}:${minutes}`;

    divFormatMessageInfo.appendChild(divFormatMessageTime);
    divFormatMessageInfo.appendChild(divFormatIndicator);
    divFormatMessageContainer.appendChild(divFormatMessageText);
    divFormatMessageContainer.appendChild(divFormatMessageInfo);
    this.$chatContainer.appendChild(divFormatMessageContainer);
    this.$chatContainer.scrollTop = 9999;
  }

  messageToLocal(messageObj) {
    const storageChatArray = JSON.parse(localStorage.getItem(this.$chatsArrayKey));
    if (storageChatArray[this.$idChat].messages.length === 0) {
      storageChatArray[this.$idChat].messages = [];
    }
    storageChatArray[this.$idChat].messages.push(messageObj);
    localStorage.setItem(this.$chatsArrayKey, JSON.stringify(storageChatArray));
  }

  messagesRender() {
    const storageChatArray = JSON.parse(localStorage.getItem(this.$chatsArrayKey));
    const chatObj = storageChatArray[this.$idChat];

    for (let i = 0; i < chatObj.messages.length; i += 1) {
      this.addMessage(chatObj.messages[i]);
    }
  }
}

customElements.define('message-form', MessageForm);
