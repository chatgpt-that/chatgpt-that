

// Parent node on document.body
const conversationElement = createElement(
  'div',
  {
    "position": "fixed",
    "bottom": "72px",
    "left": `${window.innerWidth / 2 + 225}px`,
    "width": "450px",
    "border-radius": "8px",
    "padding": "32px 20px 32px 32px",
    "border": "none",
    "color": "#FFF",
    "opacity": "0",
    "background-color": "#2F2F2F",
    "z-index": "9999999999999999999999",
    "box-sizing": "border-box",
    "transition": "all 250ms",
  },
  'chatgpt-that-conversation-element',
  [],
  '',
  true
);

const conversationHistoryElement = createElement(
  'div',
  {
    "position": "relative",
    "display": "flex",
    "flex-direction": "column",
    "gap": "0.5rem",
    "color": "#FFF",
    "max-height": "350px",
    "overflow-y": "scroll",
    "padding-right": "16px",
  },
  'chatgpt-that-conversation-history-element',
  [],
  '',
  false
);

const clearConversationElement = createElement(
  'div',
  {
    "position": "absolute",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "width": "48px",
    "height": "48px",
    "bottom": "0",
    "right": "-56px",
    "border-radius": "8px",
    "background": "#424242",
    "cursor": "pointer",
    "transition": "all 250ms",
  },
  'chatgpt-that-clear-conversation-element',
  ['active-scale'],
  clearIcon(20, 20),
  false,
);

// Add elements to DOM.
conversationElement.appendChild(conversationHistoryElement);
conversationElement.appendChild(clearConversationElement);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UTILS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const createConversationMessageElement = (identity: 'user' | 'assistant', message: string, error?: boolean) => {
  const isUserIdentity = identity === 'user';
  return (
    createElement(
      'div',
      {
        "position": "relative",
        "width": "100%",
        "color": error ? '#FF2424' : isUserIdentity ? '#407BFF' : 'whitesmoke',
        "font-weight": isUserIdentity ? '600' : '400',
        "font-size": "1.8ch",
        "margin-bottom": isUserIdentity ? '0' : '1rem'
      },
      '',
      [],
      message[0].toUpperCase() + message.slice(1),
      false
    )
  );
};

const createConversationSnippetElement = (snippetId: string, snippetUrl: string) => createElement(
  'div',
  {
    "display": "flex",
    "flex-direction": "column",
    "background": "#424242",
    "border-radius": "8px",
    "padding": "0 1.5rem 0 1.5rem",
    "box-sizing": "border-box",
    "margin-bottom": "1rem",
  },
  'chatgpt-that-snippet-element',
  [],
  `
    <div style="position: relative; width: 100%; height: 48px; display: flex; justify-items: space-between; align-items: center; gap: 1rem;">
      <div id="toggle-${snippetId}" class="hover-cursor-pointer" style="width: 16px; height: 16px; display: flex; justify-content: center; align-items: center;">${arrowRightIcon(16,16)}</div>
      <div style="flex-grow: 1; font-size: 1.8ch;">Snippet</div>
      <a href="${snippetUrl}" download="snippet.png" target="__blank">${downloadIcon(16, 16)}</a>
    </div>
    <img id="img-${snippetId}" src="${snippetUrl}" style="display: none; width: 100%; padding-bottom: 1rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.1)" />
  `,
  false,
);

const hideConversation = () => {
  conversationElement.style.opacity = '0';
  conversationElement.style.bottom = '250px';
  setTimeout(() => {
    conversationElement.style.bottom = '72px';
    conversationElement.style.left = `${window.innerWidth / 2 + 225}px`;
  }, 250);
};

const showConversationError = (errorMessage: string) => {
  conversationElement.style.opacity = '1';
  conversationElement.style.left = `${window.innerWidth / 2 - 225}px`;
  const errorMessageElement = createConversationMessageElement('assistant', errorMessage, true);
  conversationHistoryElement.appendChild(errorMessageElement);
  conversationHistoryElement.scrollTop = conversationHistoryElement.scrollHeight;
};

const showConversation = (conversation: IConversationMessage[]) => {
  if (conversation.length === 0) return;
  conversationHistoryElement.innerHTML = '';
  conversationElement.style.opacity = '1';
  conversationElement.style.left = `${window.innerWidth / 2 - 225}px`;
  conversation.forEach((conversationMessage, index) => {
    const conversationMessageElement = createConversationMessageElement(conversationMessage.identity, conversationMessage.message);
    conversationHistoryElement.appendChild(conversationMessageElement);
    if (!conversationMessage.snippet) return;
    const conversationSnippetId = `chatgpt-that-snippet-element-${index}`;
    const conversationSnippetElement = createConversationSnippetElement(conversationSnippetId, conversationMessage.snippet);
    conversationHistoryElement.appendChild(conversationSnippetElement);
    // Toggle "open/close" snippet
    document.getElementById(`toggle-${conversationSnippetId}`)?.addEventListener('click', (clickEvent) => {
      const snippetOpened = document.getElementById(`toggle-${conversationSnippetId}`)!.style.color === 'orange';
      document.getElementById(`toggle-${conversationSnippetId}`)!.innerHTML = snippetOpened ? arrowRightIcon(16,16) : arrowDownIcon(16,16);
      document.getElementById(`toggle-${conversationSnippetId}`)!.style.color = snippetOpened ? 'not-orange' : 'orange';
      if (!document.getElementById(`img-${conversationSnippetId}`)) return;
      document.getElementById(`img-${conversationSnippetId}`)!.style.display = snippetOpened ? 'none' : 'block';
    });
  });
  conversationHistoryElement.scrollTop = conversationHistoryElement.scrollHeight;
};
