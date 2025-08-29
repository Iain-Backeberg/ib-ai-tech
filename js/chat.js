(function() {
  const API_URL = "https://backend-785579985879.africa-south1.run.app/chat";
  let messagesContainer;
  let conversation = [];
  let inputEl;
let introRow = null;

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
function addInitialMessage() {
    const row = document.createElement("div");
    row.className = "message-row";
    row.style.display = "flex";
    row.style.flexDirection = "column";
    row.style.justifyContent = "center";
    row.style.alignItems = "center";

    const text = document.createElement("p");
    text.textContent = "What bespoke AI solution can IBAI provide for you today?";
    text.style.color = "#393939";
    text.style.margin = 0;
    text.style.fontSize = "20px";

    row.appendChild(text);
    messagesContainer.appendChild(row);
    scrollToBottom();
	     introRow = row; // store reference

}
  function createMessageRow(side, labelText, contentElement) {
    const row = document.createElement("div");
    row.className = "message-row";

    const avatar = document.createElement("span");
    avatar.style.fontSize = "24px";
    avatar.style.lineHeight = "40px";
    avatar.style.display = "inline-block";
    avatar.style.marginRight = "8px";
    avatar.style.textAlign = "center";

    if (side === "user") {
      avatar.textContent = "👤";
      avatar.style.color = "#cccccc";
    } else {
      const img = document.createElement("img");
      img.src = "https://www.ib-ai.tech/images/chatpage-logo.png";
      img.style.width = "24px";
      img.style.height = "40px";
      avatar.appendChild(img);
    }

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";

    const label = document.createElement("div");
    label.className = side === "user" ? "user-label" : "bot-label";
    label.textContent = labelText;

    wrapper.appendChild(label);
    wrapper.appendChild(contentElement);

    row.appendChild(avatar);
    row.appendChild(wrapper);

    messagesContainer.appendChild(row);
    scrollToBottom();

    return wrapper;
  }

  function addUserMessage(text) {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.color = "#393939";
    return createMessageRow("user", "You", p);
  }

  function addBotThinking() {
    const box = document.createElement("div");
    box.className = "thinking-box";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.gap = "8px";

    // Brain icon
    const brain = document.createElement("span");
    brain.textContent = "🧠";
    brain.style.fontSize = "24px";

    // Thinking text
    const thinkingText = document.createElement("span");
    thinkingText.textContent = "Thinking...";
    thinkingText.style.fontSize = "16px";
    thinkingText.style.color = "#555";

    // Bouncing dots
    const dots = document.createElement("span");
    dots.className = "bouncing-dots";
    dots.innerHTML = "<span></span><span></span><span></span>";

    box.appendChild(brain);
    box.appendChild(thinkingText);
    box.appendChild(dots);

    // Always label as "IBAI Consultant"
    return createMessageRow("bot", "IBAI Consultant", box);
  }

  function replaceThinkingWithAnswer(wrapper, answer) {
    // Keep the first child (label) intact
    const label = wrapper.querySelector('.bot-label'); 
    
    // Remove everything except the label
    wrapper.innerHTML = "";
    if (label) wrapper.appendChild(label);

    const p = document.createElement("p");
    p.style.color = "#393939";

    let i = 0;
    function typeTick() {
        if (i < answer.length) {
            p.textContent += answer.charAt(i++);
            scrollToBottom();
            setTimeout(typeTick, 40); // WhatsApp-style typing speed
        }
    }

    wrapper.appendChild(p);
    typeTick();
}

  async function sendMessage(message) {
    if (!message.trim() || !inputEl) return;

    inputEl.value = "";
	      // Remove intro message if it exists
    if (introRow) {
        introRow.remove();
        introRow = null;
    }
    addUserMessage(message);
    conversation.push({ role: "user", content: message });

    const botWrapper = addBotThinking();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: conversation })
      });
      const data = await res.json();
      conversation.push({ role: "assistant", content: data.reply });
      replaceThinkingWithAnswer(botWrapper, data.reply || "Sorry, something went wrong.");
    } catch (err) {
      replaceThinkingWithAnswer(botWrapper, "Unable to reach server.");
      console.error(err);
    }
  }

  function initChat() {
    messagesContainer = document.getElementById("messages-container");
    inputEl = document.getElementById("chat-input");
    addInitialMessage();  // <-- intro message

    if (inputEl) {
      inputEl.value = "";
      inputEl.onkeydown = async function(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          await sendMessage(inputEl.value);
        }
      };
    }
  }

  window.addEventListener("DOMContentLoaded", initChat);
  window.initChat = initChat;
})();
