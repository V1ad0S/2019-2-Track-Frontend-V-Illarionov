const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    
        Hello World!
`;

class ChatsList extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('chats-list', ChatsList);
