const template = document.createElement('template');
template.innerHTML = `
    <style></style>
    <button class="test">TEST</button>
`;

class ChatsList extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$test_button = this.shadowRoot.querySelector('.test');

    this.$app_header = document.querySelector('app-header');
    this.$message_form = document.querySelector('message-form');
    this.$chats_list = document.querySelector('chats-list');
    this.$chat_header = this.$app_header.$chat_header;
    this.$chatlist_header = this.$app_header.$chatlist_header;

    this.$test_button.addEventListener('click', this.onTestClicked.bind(this));
  }

  onTestClicked() {
    this.$chats_list.style.display = 'none';
    this.$message_form.style.display = 'flex';
    this.$chatlist_header.style.display = 'none';
    this.$chat_header.style.display = 'flex';
  }

  /*  chatObj = {
        companion: "name",
        messages: array of messageObj,
        indicator: [0, 1, 2],
      }
  */


  addNewChat(chatObj) {
    const divFormatChatContainer = document.createElement('div');
    const divFormatCompanionImg = document.createElement('div');
    const divFormatCompanionName = document.createElement('h3');
    const divFormatLastMessageText = document.createElement('div');
    const divFormatLastMessageTime = document.createElement('span');
    const divFormatIndicator = document.createElement('div');

    this.$shadowRoot.appendChild(divFormatChatContainer);
  }
}

customElements.define('chats-list', ChatsList);
