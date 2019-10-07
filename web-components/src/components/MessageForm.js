const messagesArrayKey = 'messagesArray';

const template = document.createElement('template');
template.innerHTML = `
        <style>
        form-input {
            display: flex;
            flex-direction: row;
        }
        
        .form-chat {
            display: flex;
            flex-direction: column;
        }
        
        .chat-container {
            height: calc(100vh - 102px);
            display: flex;
            flex-direction: column;
            background-color: #EEE;
            overflow-y: scroll;
        }

        .message-container {
            width: auto;
            max-width: 60%;
            min-width: 12%;
            display: inline-flex;
            flex-direction: column;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .message-text {
            color: black;
            font-size: 17px;
            letter-spacing: 0.05em;
            word-wrap: break-word;
            word-break: break-word;
            padding: 5px 10px;
            display: flex;
            align-self: flex-start;
            align-items: center;
        }

        .message-time {
            user-select: none;
            color: #777;
            font-size: 12px;
            align-self: flex-end;
            line-height: 15px;
            margin-right: 7px;
        }

        .right-messages {
            position: relative;
            justify-content: flex-end;
            align-items: flex-end;
            align-self: flex-end;
            background-color: #8E24AA25;
            margin-right: 15px;
            box-shadow: 0 1px 0;
        }
        
        .right-messages::before {
            content: ' ';
            position: absolute;
            width: 0;
            height: 0;
            right: -14px;
            bottom: 3px;
            border: 7px solid;
            border-color: transparent transparent #e2d2e6 #e2d2e6;
        }

        .left-messages {
            position: relative;
            justify-content: flex-start;
            align-items: flex-start;
            align-self: flex-start;
            background-color: #FAFAFA;
            margin-left: 20px;
            box-shadow: 0 1px 0;
        }

        
        .left-messages::before {
            content: ' ';
            position: absolute;
            width: 0;
            height: 0;
            left: -14px;
            bottom: 3px;
            border: 7px solid;
            border-color: transparent #fff #fff transparent;
        }
        
        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form class="form-chat">
        <div class="chat-container"></div>
        <form-input name="message-text" placeholder="Cообщение"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('form-input');
    this.$chatContainer = this.shadowRoot.querySelector('.chat-container');
    this.$button = this.$input.$button;
    this.myRender();

    this.$button.addEventListener('click', this.onSubmitClicked.bind(this));
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
    this.$form.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onSubmitClicked() {
    this.$form.dispatchEvent(new Event('submit'));
    this.$button.style.visibility = 'hidden';
    this.$button.style.marginLeft = '-35px';
    this.$input.$input.focus();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.$input.value === '') {
      return;
    }
    this.messageObj = {};
    this.messageObj.messageText = this.$input.value;
    this.messageObj.messageAuthor = 'Me';
    this.messageObj.sendingTime = new Date();
    this.addMessage(this.messageObj);
    this.$input.value = '';
    this.messageToLocal(this.messageObj);
  }

  onKeyPress(event) {
    this.onKeyUp();
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  onKeyUp() {
    this.$button.style.marginLeft = '5px';
    this.$button.style.visibility = 'inherit';
    if (this.$input.value === '') {
      this.$button.style.visibility = 'hidden';
      this.$button.style.marginLeft = '-35px';
    }
  }

  addMessage(messageObj) {
    const divFormatMessageContainer = document.createElement('div');
    const divFormatMessageText = document.createElement('div');
    const divFormatMessageTime = document.createElement('span');

    if (messageObj.messageAuthor === 'Me') {
      divFormatMessageContainer.className = 'right-messages message-container';
    } else {
      divFormatMessageContainer.className = 'left-messages message-container';
    }

    divFormatMessageText.className = 'message-text';
    divFormatMessageText.innerText = messageObj.messageText;

    divFormatMessageTime.className = 'message-time';
    const date = new Date(messageObj.sendingTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10) ? (`0${hours}`) : hours;
    minutes = (minutes < 10) ? (`0${minutes}`) : minutes;
    divFormatMessageTime.innerText = `${hours}:${minutes}`;

    divFormatMessageContainer.appendChild(divFormatMessageText);
    divFormatMessageContainer.appendChild(divFormatMessageTime);
    this.$chatContainer.appendChild(divFormatMessageContainer);
    this.$chatContainer.scrollTop = 9999;
  }

  messageToLocal(messageObj) {
    this.storageMessageArray = JSON.parse(localStorage.getItem(messagesArrayKey));
    if (this.storageMessageArray === null) {
      this.storageMessageArray = [];
    }
    this.storageMessageArray.push(messageObj);
    localStorage.setItem(messagesArrayKey, JSON.stringify(this.storageMessageArray));
  }

  myRender() {
    const storageMessageArray = JSON.parse(localStorage.getItem(messagesArrayKey));
    if (storageMessageArray === null) {
      return;
    }
    for (let i = 0; i < storageMessageArray.length; i += 1) {
      this.addMessage(storageMessageArray[i]);
    }
  }
}

customElements.define('message-form', MessageForm);
