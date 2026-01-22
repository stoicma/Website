(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiEndpoint: '/api/chat',
    modalDelay: 2000, // 2 seconds delay before showing modal
    storageKey: 'ai-chatbot-dismissed',
    cooldownHours: 24,
  };

  // State
  let conversationHistory = [];
  let isProcessing = false;

  // DOM Elements (will be set after DOM loads)
  let elements = {};

  // Initialize chatbot
  function init() {
    // Get all required DOM elements
    elements = {
      overlay: document.getElementById('ai-chatbot-overlay'),
      modal: document.getElementById('ai-chatbot-modal'),
      widget: document.getElementById('ai-chatbot-widget'),
      messages: document.getElementById('chatbot-modal-messages'),
      input: document.getElementById('chatbot-modal-input'),
      sendBtn: document.getElementById('chatbot-modal-send'),
      closeBtn: document.getElementById('chatbot-modal-close'),
      widgetBtn: document.getElementById('chatbot-widget-button'),
    };

    // Verify all elements exist
    const missingElements = Object.keys(elements).filter(key => !elements[key]);
    if (missingElements.length > 0) {
      console.error('Chatbot: Missing required elements:', missingElements);
      return;
    }

    // Set up event listeners
    setupEventListeners();

    // Check if modal should be shown
    checkAndShowModal();
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Send message on button click
    elements.sendBtn.addEventListener('click', handleSendMessage);

    // Send message on Enter key (but allow Shift+Enter for new line)
    elements.input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });

    // Close modal
    elements.closeBtn.addEventListener('click', closeModal);

    // Close modal on overlay click (but not on modal click)
    elements.overlay.addEventListener('click', function(e) {
      if (e.target === elements.overlay) {
        closeModal();
      }
    });

    // Open modal from widget
    elements.widgetBtn.addEventListener('click', openModal);

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !elements.overlay.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // Check if modal should be shown on page load
  function checkAndShowModal() {
    const dismissed = localStorage.getItem(CONFIG.storageKey);

    if (!dismissed) {
      // Show modal after delay
      setTimeout(function() {
        openModal();
      }, CONFIG.modalDelay);
    } else {
      // Check if cooldown has expired
      const dismissedTime = parseInt(dismissed, 10);
      const now = Date.now();
      const cooldownMs = CONFIG.cooldownHours * 60 * 60 * 1000;

      if (now - dismissedTime > cooldownMs) {
        // Cooldown expired, show modal
        localStorage.removeItem(CONFIG.storageKey);
        setTimeout(function() {
          openModal();
        }, CONFIG.modalDelay);
      } else {
        // Still in cooldown, show widget
        showWidget();
      }
    }
  }

  // Open modal
  function openModal() {
    elements.overlay.classList.remove('hidden');
    elements.widget.classList.add('hidden');
    elements.input.focus();
  }

  // Close modal
  function closeModal() {
    elements.overlay.classList.add('hidden');
    showWidget();

    // Set dismissed timestamp
    localStorage.setItem(CONFIG.storageKey, Date.now().toString());
  }

  // Show widget
  function showWidget() {
    elements.widget.classList.remove('hidden');
  }

  // Handle sending a message
  function handleSendMessage() {
    const message = elements.input.value.trim();

    if (!message || isProcessing) {
      return;
    }

    // Add user message to UI
    addMessage(message, 'user');

    // Clear input
    elements.input.value = '';

    // Disable input while processing
    setProcessingState(true);

    // Show typing indicator
    showTypingIndicator();

    // Send message to API
    sendMessageToAPI(message)
      .then(function(response) {
        hideTypingIndicator();
        addMessage(response.message, 'bot');

        // Update conversation history
        conversationHistory.push(
          { role: 'user', content: message },
          { role: 'assistant', content: response.message }
        );
      })
      .catch(function(error) {
        hideTypingIndicator();
        console.error('Chatbot error:', error);
        addErrorMessage('Sorry, I encountered an error. Please try again or contact marko.stokic@proton.me directly.');
      })
      .finally(function() {
        setProcessingState(false);
      });
  }

  // Send message to API
  function sendMessageToAPI(message) {
    return fetch(CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        conversationHistory: conversationHistory,
      }),
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('API request failed: ' + response.status);
      }
      return response.json();
    });
  }

  // Add message to chat
  function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type + '-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Use textContent for security (prevents XSS)
    // Convert URLs to clickable links safely
    const textElements = linkifyText(text);
    textElements.forEach(function(el) {
      contentDiv.appendChild(el);
    });

    messageDiv.appendChild(contentDiv);
    elements.messages.appendChild(messageDiv);

    // Scroll to bottom
    scrollToBottom();
  }

  // Add error message
  function addErrorMessage(text) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = text;

    elements.messages.appendChild(errorDiv);
    scrollToBottom();
  }

  // Show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      typingDiv.appendChild(dot);
    }

    elements.messages.appendChild(typingDiv);
    scrollToBottom();
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Set processing state
  function setProcessingState(processing) {
    isProcessing = processing;
    elements.input.disabled = processing;
    elements.sendBtn.disabled = processing;
  }

  // Scroll messages to bottom
  function scrollToBottom() {
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  // Convert URLs in text to clickable links (safe DOM manipulation)
  function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    const domElements = [];

    parts.forEach(function(part) {
      if (part.match(urlRegex)) {
        // Create link element
        const link = document.createElement('a');
        link.href = part;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = part;
        domElements.push(link);
      } else if (part) {
        // Create text node
        const textNode = document.createTextNode(part);
        domElements.push(textNode);
      }
    });

    return domElements;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
