const template = document.createElement('template');
template.innerHTML = `
    <style>
      .chat-header {
        height: 100%;
        width: 100%;
        display: none;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .chatlist-header {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      button {
        height: 6vh;
        width: 6vh;
        color: #FFFC;
        background-color: #8E24AA;
        display: inline-block;
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 100%;
        transition: 0.2s;
        margin: 3%;
      }
      button:focus, button:hover { color: #FFFF; }
      button:active { background: #FFF5; }
      
      .button-img {
        height: 3vh;
        width: 3vh;
        fill: currentColor;
      }
      
      .header {
        line-height: 5vh;
        font-weight: 600;
        margin-left: -40%;
        font-size: 4vh;
        color: #FFF;
      }
      
      .companion {
        height: 100%;
        flex-grow: 15;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      
      .companion-image {
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 2vh;
      }
      
      .companion-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
      }
      
      .companion_name {
        max-width: 40vw;
        overflow-x: hidden;
        line-height: 4vh;
        font-weight: bold;
        font-size: 3vh;
        color: white;
      }
      
      .companion_status {
        font-size: 2vh;
        font-weight: 200;
        color: #D1A7DD;
        align-self: center;
      }
      
      .companion_logo {
        fill: currentColor;
      }
    </style>
    
    <div class="chatlist-header">
        <button class="button-menu">
            <svg class="button-img" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 width="408px" height="408px" viewBox="0 0 408 408" xml:space="preserve">
                <rect y="102" width="408" height="40"/>
                <rect y="204" width="408" height="40"/>
                <rect y="306" width="408" height="40"/>
            </svg></button>
        <span class="header">Messenger</span>
        <button class="button-search-chatlist">
            <svg class="button-img" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 56.966 56.966" xml:space="preserve">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                    s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg></button>
    </div>
    <div class="chat-header">
        <button class="button-backward">
            <svg class="button-img" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="408px" height="408px" viewBox="0 0 408 408" xml:space="preserve">
                <path d="M408,178.5H96.9L239.7,35.7L204,0L0,204l204,204l35.7-35.7L96.9,229.5H408V178.5z"/>
            </svg></button>
        <div class="companion">
            <div class="companion-image">
                <svg version="1.1" class="companion_logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 55 55" width="7vh" height="7vh" fill="white" xml:space="preserve">
                    <path d="M55,27.5C55,12.337,42.663,0,27.5,0S0,12.337,0,27.5c0,8.009,3.444,15.228,8.926,20.258l-0.026,0.023l0.892,0.752
                        c0.058,0.049,0.121,0.089,0.179,0.137c0.474,0.393,0.965,0.766,1.465,1.127c0.162,0.117,0.324,0.234,0.489,0.348
                        c0.534,0.368,1.082,0.717,1.642,1.048c0.122,0.072,0.245,0.142,0.368,0.212c0.613,0.349,1.239,0.678,1.88,0.98
                        c0.047,0.022,0.095,0.042,0.142,0.064c2.089,0.971,4.319,1.684,6.651,2.105c0.061,0.011,0.122,0.022,0.184,0.033
                        c0.724,0.125,1.456,0.225,2.197,0.292c0.09,0.008,0.18,0.013,0.271,0.021C25.998,54.961,26.744,55,27.5,55
                        c0.749,0,1.488-0.039,2.222-0.098c0.093-0.008,0.186-0.013,0.279-0.021c0.735-0.067,1.461-0.164,2.178-0.287
                        c0.062-0.011,0.125-0.022,0.187-0.034c2.297-0.412,4.495-1.109,6.557-2.055c0.076-0.035,0.153-0.068,0.229-0.104
                        c0.617-0.29,1.22-0.603,1.811-0.936c0.147-0.083,0.293-0.167,0.439-0.253c0.538-0.317,1.067-0.648,1.581-1
                        c0.185-0.126,0.366-0.259,0.549-0.391c0.439-0.316,0.87-0.642,1.289-0.983c0.093-0.075,0.193-0.14,0.284-0.217l0.915-0.764
                        l-0.027-0.023C51.523,42.802,55,35.55,55,27.5z M2,27.5C2,13.439,13.439,2,27.5,2S53,13.439,53,27.5
                        c0,7.577-3.325,14.389-8.589,19.063c-0.294-0.203-0.59-0.385-0.893-0.537l-8.467-4.233c-0.76-0.38-1.232-1.144-1.232-1.993v-2.957
                        c0.196-0.242,0.403-0.516,0.617-0.817c1.096-1.548,1.975-3.27,2.616-5.123c1.267-0.602,2.085-1.864,2.085-3.289v-3.545
                        c0-0.867-0.318-1.708-0.887-2.369v-4.667c0.052-0.52,0.236-3.448-1.883-5.864C34.524,9.065,31.541,8,27.5,8
                        s-7.024,1.065-8.867,3.168c-2.119,2.416-1.935,5.346-1.883,5.864v4.667c-0.568,0.661-0.887,1.502-0.887,2.369v3.545
                        c0,1.101,0.494,2.128,1.34,2.821c0.81,3.173,2.477,5.575,3.093,6.389v2.894c0,0.816-0.445,1.566-1.162,1.958l-7.907,4.313
                        c-0.252,0.137-0.502,0.297-0.752,0.476C5.276,41.792,2,35.022,2,27.5z"/>
                </svg>
            </div>
            <div class="companion-info">
                <span class="companion_name">Дженнифер</span>
                <span class="companion_status">была 2 часа назад</span>
            </div></div>
        <button class="button-search-chat">
            <svg class="button-img" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 56.966 56.966" xml:space="preserve">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                    s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg></button>
        <button class="button-settings">
            <svg class="button-img" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 512 512" xml:space="preserve">
                <circle cx="256" cy="256" r="64"/>
                <circle cx="256" cy="448" r="64"/>
                <circle cx="256" cy="64" r="64"/>
            </svg></button>
    </div>
`;

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.$chats_list = document.querySelector('chats-list');
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$chat_header = this.shadowRoot.querySelector('.chat-header');
    this.$chatlist_header = this.shadowRoot.querySelector('.chatlist-header');

    this.$button_menu = this.$chatlist_header.querySelector('.button-menu');
    this.$header = this.$chatlist_header.querySelector('.header');

    this.$button_backward = this.$chat_header.querySelector('.button-backward');
    this.$button_search = this.$chat_header.querySelector('.button-search-chat');
    this.$button_settings = this.$chat_header.querySelector('.button-settings');
    this.$companion = this.$chat_header.querySelector('.companion');

    this.$button_backward.addEventListener('click', this.onBackwardClicked.bind(this));
  }

  onBackwardClicked() {
    this.$chatlist_header.style.display = 'flex';
    this.$chat_header.style.display = 'none';

    this.$message_form.style.display = 'none';
    this.$chats_list.style.display = 'inline-block';
  }
}

customElements.define('app-header', AppHeader);
