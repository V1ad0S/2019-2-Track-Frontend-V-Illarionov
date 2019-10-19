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

        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
      }
    
      .message-container {
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        min-height: 8vh;
        line-height: 4vh;
        max-width: 80%;
        min-width: 30%;
        flex-direction: column;
        border-radius: 1vh;
        margin-top: 1vh;
        margin-bottom: 1vh;

        animation-name: add-message-animation;
        animation-duration: 0.5s;
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
        border: calc(1vh + 3px) solid;
        border-color: transparent transparent #e2d2e6 #e2d2e6;
      }
    
      .left-messages {
        position: relative;
        justify-content: flex-start;
        align-items: flex-end;
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

      .flex-container {
        display: -webkit-box;      /* iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* Firefox 19 */
        display: -ms-flexbox;      /* IE 10 */
        display: -webkit-flex;     /* Chrome */
        display: inline-flex;             /* Opera 12.1, Firefox 20+ */
      }

      .flex-item {
        -webkit-box-flex: 1;      /* iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1;         /* Firefox 19- */
        -webkit-flex: 1;          /* Chrome */
        -ms-flex: 1;              /* IE 10 */
        flex: 1;                  /* Opera 12.1, Firefox 20+ */
      }

      @keyframes add-message-animation {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
      }
    </style>
    
    <form class="form-chat">
        <div class="chat-container flex-container"></div>
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
    const divFormatMessageContainer = document.createElement('message-container');

    divFormatMessageContainer.text = messageObj.messageText;
    divFormatMessageContainer.author = messageObj.messageAuthor;
    const date = new Date(messageObj.sendingTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10) ? (`0${hours}`) : hours;
    minutes = (minutes < 10) ? (`0${minutes}`) : minutes;
    divFormatMessageContainer.time = `${hours}:${minutes}`;

    divFormatMessageContainer.build();

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
