const messagesArrayKey = 'messagesArray';

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
        min-width: 20%;
        display: inline-flex;
        flex-direction: column;
        border-radius: 1vh;
        margin-top: 1vh;
        margin-bottom: 1vh;
      }
    
      .message-text {
        color: black;
        font-size: 2vh;
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
    
      .message-time {
        user-select: none;
        color: #777;
        font-size: 2vh;
        align-self: flex-end;
        line-height: 3vh;
        margin-right: 1vh;
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
        margin-left: 2vh;
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
    </form>
`;
/*  <form-input name="message-text" placeholder="Cообщение"></form-input>  */
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
    this.myRender();

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
    this.$submit_button.style.display = 'inline-block';
    if (this.$input.value === '') {
      this.$submit_button.style.display = 'none';
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
