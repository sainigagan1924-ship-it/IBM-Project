(function () {
  'use strict';

  const STORAGE_KEY_DRAFTS = 'chat-ui-drafts';
  const STORAGE_KEY_AUTH = 'chat-ui-auth';
  const VALID_PASSWORD = 'chat2025';

  const loginScreenElement = document.getElementById('login-overlay');
  const loginFormElement = document.getElementById('login-form');
  const loginPasswordInput = document.getElementById('login-password');
  const loginErrorMessage = document.getElementById('login-error');
  const loginSubmitButton = document.getElementById('login-btn');
  const mainApplicationElement = document.getElementById('app');
  const callScreenElement = document.getElementById('call-overlay');
  const callCloseButton = document.getElementById('call-close');
  const callTypeLabelElement = document.getElementById('call-type-label');
  const callAvatarImage = document.getElementById('call-avatar');
  const callParticipantName = document.getElementById('call-name');
  const callConnectionStatus = document.getElementById('call-status');
  const callDurationTimer = document.getElementById('call-timer');
  const callRemoteView = document.getElementById('call-remote');
  const callLocalVideoContainer = document.getElementById('call-local');
  const callLocalVideoElement = document.getElementById('call-local-video');
  const callMuteButton = document.getElementById('call-mute');
  const callSpeakerButton = document.getElementById('call-speaker');
  const callCameraButton = document.getElementById('call-camera');
  const callEndButton = document.getElementById('call-end');
  const messagesListElement = document.getElementById('messages');
  const messageInputField = document.getElementById('message-input');
  const sendMessageButton = document.getElementById('send-btn');
  const chatSearchInput = document.getElementById('chat-search');
  const conversationListItems = document.querySelectorAll('.conversation-list-item[data-chat-id]');
  const quickReplyOptions = document.querySelectorAll('.quick-reply-option');
  const typingIndicatorElement = document.getElementById('typing-indicator');
  const slashCommandHint = document.getElementById('slash-hint');
  const conversationHeaderUserName = document.querySelector('.conversation-header-user-name');
  const conversationHeaderUserImage = document.querySelector('.conversation-header-user img');
  const conversationsListPanel = document.getElementById('chat-list');
  const conversationAreaPanel = document.getElementById('chat-area');
  const mainSidebarElement = document.getElementById('sidebar');
  const sidebarBackdropOverlay = document.getElementById('sidebar-overlay');
  const menuToggleButton = document.getElementById('menu-toggle');
  const backToListButton = document.getElementById('back-to-list');
  const searchInChatButton = document.querySelector('.button-search-in-chat');
  const videoCallButton = document.querySelector('.button-video-call');
  const voiceCallButton = document.querySelector('.button-voice-call');
  const attachFileButton = document.getElementById('btn-attach');
  const emojiPickerButton = document.getElementById('btn-emoji');
  const navHomeButton = document.getElementById('nav-home');
  let activeConversationId = 'gagan';
  let typingIndicatorTimeout = null;
  let callDurationInterval = null;
  let callDurationSeconds = 0;
  let isVideoCall = false;
  let localVideoStream = null;
  let isMicrophoneMuted = false;
  let isSpeakerOn = true;
  let isCameraOn = true;

  function checkIfUserIsLoggedIn() {
    try {
      return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setUserLoggedIn(isLoggedIn) {
    try {
      if (isLoggedIn) sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      else sessionStorage.removeItem(STORAGE_KEY_AUTH);
    } catch (e) {}
  }

  function showMainApplication() {
    if (loginScreenElement) {
      loginScreenElement.classList.add('hidden');
      setTimeout(function () {
        loginScreenElement.style.display = 'none';
      }, 500);
    }
    if (mainApplicationElement) {
      mainApplicationElement.classList.remove('is-hidden');
      mainApplicationElement.style.display = 'flex';
    }
  }

  function initializeAuthentication() {
    if (checkIfUserIsLoggedIn()) {
      if (loginScreenElement) loginScreenElement.style.display = 'none';
      if (mainApplicationElement) mainApplicationElement.classList.remove('is-hidden');
      initializeChat();
      return;
    }
    if (mainApplicationElement) mainApplicationElement.classList.add('is-hidden');
    if (loginScreenElement) loginScreenElement.style.display = 'flex';
    if (loginFormElement) {
      loginFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        var enteredPassword = loginPasswordInput ? loginPasswordInput.value : '';
        if (loginErrorMessage) loginErrorMessage.textContent = '';
        if (loginFormElement.classList.contains('error')) loginFormElement.classList.remove('error');
        if (!enteredPassword.trim()) {
          if (loginErrorMessage) loginErrorMessage.textContent = 'Please enter your password.';
          if (loginFormElement) loginFormElement.classList.add('error');
          return;
        }
        if (enteredPassword !== VALID_PASSWORD) {
          if (loginErrorMessage) loginErrorMessage.textContent = 'Incorrect password. Try again.';
          if (loginFormElement) loginFormElement.classList.add('error');
          if (loginSubmitButton) loginSubmitButton.classList.remove('loading');
          return;
        }
        if (loginSubmitButton) loginSubmitButton.classList.add('loading');
        setUserLoggedIn(true);
        setTimeout(function () {
          if (loginSubmitButton) loginSubmitButton.classList.remove('loading');
          showMainApplication();
          initializeChat();
        }, 600);
      });
    }
  }

  function initializeChat() {
    if (messageInputField) {
      messageInputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          sendNewMessage();
        }
      });
      messageInputField.addEventListener('input', onMessageInputChange);
      messageInputField.addEventListener('blur', function () {
        saveDraftForConversation(activeConversationId, this.value);
      });
    }
    if (sendMessageButton) sendMessageButton.addEventListener('click', sendNewMessage);
    if (chatSearchInput) {
      chatSearchInput.addEventListener('input', function () {
        var searchQuery = this.value.trim().toLowerCase();
        conversationListItems.forEach(function (item) {
          var contactName = (item.dataset.name || '').toLowerCase();
          item.classList.toggle('is-hidden', !!searchQuery && !contactName.includes(searchQuery));
        });
      });
    }
    conversationListItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var conversationId = this.dataset.chatId;
        var contactName = this.dataset.name;
        var contactImage = this.querySelector('img');
        if (!conversationId) return;
        conversationListItems.forEach(function (i) { i.classList.remove('is-active'); });
        this.classList.add('is-active');
        activeConversationId = conversationId;
        if (conversationHeaderUserName) conversationHeaderUserName.textContent = contactName;
        if (conversationHeaderUserImage && contactImage) conversationHeaderUserImage.src = contactImage.src;
        loadDraftForConversation(conversationId);
        var unreadBadge = this.querySelector('.conversation-item-unread-count');
        if (unreadBadge) unreadBadge.remove();
        if (checkIfMobileScreen()) showConversationArea();
      });
    });
    quickReplyOptions.forEach(function (option) {
      option.addEventListener('click', function () {
        var quickReplyText = (this.dataset.quickText || this.textContent || '').trim();
        if (!quickReplyText) return;
        messageInputField.value = quickReplyText;
        messageInputField.focus();
        saveDraftForConversation(activeConversationId, quickReplyText);
      });
    });
    document.querySelectorAll('.sidebar-menu-item').forEach(function (item) {
      item.addEventListener('click', function () {
        document.querySelectorAll('.sidebar-menu-item').forEach(function (i) { i.classList.remove('is-active'); });
        this.classList.add('is-active');
        var navSection = this.dataset.nav;
        if (navSection === 'chats') showToastMessage('Chats');
        else if (navSection === 'focus') showToastMessage('Focus mode on');
        else if (navSection === 'reminders') showToastMessage('Reminders');
        else if (navSection === 'pinned') showToastMessage('Pinned chats');
        else if (navSection === 'trash') showToastMessage('Archive');
        else if (navSection === 'profile') showToastMessage('Profile');
        if (checkIfMobileScreen()) closeSidebarMenu();
      });
    });
    if (navHomeButton) {
      navHomeButton.addEventListener('click', function () {
        document.querySelectorAll('.sidebar-menu-item').forEach(function (i) { i.classList.remove('is-active'); });
        var chatsItem = document.querySelector('.sidebar-menu-item[data-nav="chats"]');
        if (chatsItem) chatsItem.classList.add('is-active');
        showToastMessage('Home');
        if (checkIfMobileScreen()) closeSidebarMenu();
      });
    }
    if (menuToggleButton) menuToggleButton.addEventListener('click', openSidebarMenu);
    if (sidebarBackdropOverlay) sidebarBackdropOverlay.addEventListener('click', closeSidebarMenu);
    if (backToListButton) backToListButton.addEventListener('click', showConversationsList);
    if (searchInChatButton) {
      searchInChatButton.addEventListener('click', function () {
        messageInputField.focus();
        showToastMessage('Search in chat');
      });
    }
    if (videoCallButton) {
      videoCallButton.addEventListener('click', function () {
        openCallScreen(true);
      });
    }
    if (voiceCallButton) {
      voiceCallButton.addEventListener('click', function () {
        openCallScreen(false);
      });
    }
    if (attachFileButton) attachFileButton.addEventListener('click', function () { showToastMessage('Attach a file'); });
    if (emojiPickerButton) emojiPickerButton.addEventListener('click', function () { showToastMessage('Emoji picker'); });
    loadDraftForConversation(activeConversationId);
    if (messagesListElement) messagesListElement.scrollTop = messagesListElement.scrollHeight;
  }

  function checkIfMobileScreen() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function showToastMessage(messageText) {
    var toastElement = document.createElement('div');
    toastElement.className = 'toast-message';
    toastElement.textContent = messageText;
    document.body.appendChild(toastElement);
    requestAnimationFrame(function () { toastElement.classList.add('show'); });
    setTimeout(function () {
      toastElement.classList.remove('show');
      setTimeout(function () { toastElement.remove(); }, 300);
    }, 2000);
  }

  function getAllDrafts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_DRAFTS) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveDraftForConversation(conversationId, draftText) {
    var allDrafts = getAllDrafts();
    if (draftText.trim()) allDrafts[conversationId] = draftText;
    else delete allDrafts[conversationId];
    localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(allDrafts));
  }

  function loadDraftForConversation(conversationId) {
    var allDrafts = getAllDrafts();
    messageInputField.value = allDrafts[conversationId] || '';
    messageInputField.focus();
  }

  function escapeHtmlString(text) {
    var tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
  }

  function addMessageToConversation(messageText, isSentByMe) {
    isSentByMe = isSentByMe !== false;
    var currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    var messageBubbleElement = document.createElement('div');
    messageBubbleElement.className = 'message-bubble ' + (isSentByMe ? 'message-bubble-sent' : 'message-bubble-received');
    messageBubbleElement.dataset.msgId = Date.now();
    messageBubbleElement.innerHTML = '<span class="message-bubble-text">' + escapeHtmlString(messageText) + '</span><span class="message-bubble-time">' + currentTime + '</span>';
    messagesListElement.appendChild(messageBubbleElement);
    messagesListElement.scrollTop = messagesListElement.scrollHeight;
  }

  function sendNewMessage() {
    var messageText = messageInputField.value.trim();
    if (!messageText) return;
    addMessageToConversation(messageText, true);
    messageInputField.value = '';
    saveDraftForConversation(activeConversationId, '');
    if (slashCommandHint) slashCommandHint.setAttribute('aria-hidden', 'true');
    setTimeout(function () {
      addMessageToConversation("Thanks, I'll get back to you soon.", false);
    }, 800);
  }

  function onMessageInputChange() {
    var inputValue = this.value;
    if (slashCommandHint) {
      if (inputValue.startsWith('/')) slashCommandHint.removeAttribute('aria-hidden');
      else slashCommandHint.setAttribute('aria-hidden', 'true');
    }
    saveDraftForConversation(activeConversationId, inputValue);
    clearTimeout(typingIndicatorTimeout);
    showTypingIndicator(true);
    typingIndicatorTimeout = setTimeout(function () { showTypingIndicator(false); }, 1500);
  }

  function showTypingIndicator(shouldShow) {
    if (typingIndicatorElement) typingIndicatorElement.setAttribute('aria-hidden', !shouldShow);
  }

  function openSidebarMenu() {
    if (mainSidebarElement) mainSidebarElement.classList.add('open');
    if (sidebarBackdropOverlay) {
      sidebarBackdropOverlay.classList.add('show');
      sidebarBackdropOverlay.setAttribute('aria-hidden', 'false');
    }
  }

  function closeSidebarMenu() {
    if (mainSidebarElement) mainSidebarElement.classList.remove('open');
    if (sidebarBackdropOverlay) {
      sidebarBackdropOverlay.classList.remove('show');
      sidebarBackdropOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  function showConversationsList() {
    if (conversationsListPanel) conversationsListPanel.classList.remove('hide-on-mobile');
    if (conversationAreaPanel) conversationAreaPanel.classList.remove('visible');
  }

  function showConversationArea() {
    if (conversationsListPanel) conversationsListPanel.classList.add('hide-on-mobile');
    if (conversationAreaPanel) conversationAreaPanel.classList.add('visible');
  }

  function openCallScreen(videoCall) {
    isVideoCall = videoCall;
    callDurationSeconds = 0;
    isMicrophoneMuted = false;
    isSpeakerOn = true;
    isCameraOn = videoCall;
    if (callTypeLabelElement) callTypeLabelElement.textContent = videoCall ? 'Video call' : 'Voice call';
    if (callParticipantName) callParticipantName.textContent = conversationHeaderUserName ? conversationHeaderUserName.textContent : 'Contact';
    if (callAvatarImage && conversationHeaderUserImage) callAvatarImage.src = conversationHeaderUserImage.src;
    if (callConnectionStatus) callConnectionStatus.textContent = 'Connecting…';
    if (callDurationTimer) callDurationTimer.textContent = '00:00';
    if (callScreenElement) {
      callScreenElement.classList.remove('video-mode');
      if (videoCall) callScreenElement.classList.add('video-mode');
      callScreenElement.setAttribute('aria-hidden', 'false');
      callScreenElement.classList.add('is-visible');
    }
    if (callCameraButton) {
      callCameraButton.style.display = videoCall ? 'flex' : 'none';
      callCameraButton.setAttribute('aria-hidden', !videoCall);
      callCameraButton.classList.toggle('off', !isCameraOn);
      var cameraIcon = callCameraButton.querySelector('i');
      if (cameraIcon) cameraIcon.className = isCameraOn ? 'bi bi-camera-video-fill' : 'bi bi-camera-video-off-fill';
    }
    if (callLocalVideoContainer) callLocalVideoContainer.setAttribute('aria-hidden', 'true');
    if (callMuteButton) {
      callMuteButton.classList.remove('active');
      callMuteButton.querySelector('i').className = 'bi bi-mic-fill';
    }
    if (callSpeakerButton) {
      callSpeakerButton.classList.remove('active');
      callSpeakerButton.querySelector('i').className = 'bi bi-speaker-fill';
    }
    setTimeout(function () {
      if (callConnectionStatus) callConnectionStatus.textContent = 'Connected';
      callDurationInterval = setInterval(function () {
        callDurationSeconds++;
        var minutes = Math.floor(callDurationSeconds / 60);
        var seconds = callDurationSeconds % 60;
        if (callDurationTimer) callDurationTimer.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }, 1000);
    }, 1500);
    if (videoCall && callLocalVideoElement) {
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
        localVideoStream = stream;
        callLocalVideoElement.srcObject = stream;
        if (callLocalVideoContainer) callLocalVideoContainer.setAttribute('aria-hidden', 'false');
      }).catch(function () {
        if (callLocalVideoContainer) callLocalVideoContainer.setAttribute('aria-hidden', 'true');
      });
    }
  }

  function closeCallScreen() {
    clearInterval(callDurationInterval);
    callDurationInterval = null;
    if (localVideoStream) {
      localVideoStream.getTracks().forEach(function (track) { track.stop(); });
      localVideoStream = null;
    }
    if (callLocalVideoElement && callLocalVideoElement.srcObject) {
      callLocalVideoElement.srcObject.getTracks().forEach(function (track) { track.stop(); });
      callLocalVideoElement.srcObject = null;
    }
    if (callScreenElement) {
      callScreenElement.classList.remove('is-visible');
      callScreenElement.setAttribute('aria-hidden', 'true');
    }
  }

  if (callCloseButton) callCloseButton.addEventListener('click', closeCallScreen);
  if (callEndButton) callEndButton.addEventListener('click', closeCallScreen);

  if (callMuteButton) {
    callMuteButton.addEventListener('click', function () {
      isMicrophoneMuted = !isMicrophoneMuted;
      this.classList.toggle('active', isMicrophoneMuted);
      this.querySelector('i').className = isMicrophoneMuted ? 'bi bi-mic-mute-fill' : 'bi bi-mic-fill';
    });
  }
  if (callSpeakerButton) {
    callSpeakerButton.addEventListener('click', function () {
      isSpeakerOn = !isSpeakerOn;
      this.classList.toggle('active', !isSpeakerOn);
      this.querySelector('i').className = isSpeakerOn ? 'bi bi-speaker-fill' : 'bi bi-speaker-mute-fill';
    });
  }
  if (callCameraButton) {
    callCameraButton.addEventListener('click', function () {
      if (!isVideoCall) return;
      isCameraOn = !isCameraOn;
      this.classList.toggle('off', !isCameraOn);
      this.querySelector('i').className = isCameraOn ? 'bi bi-camera-video-fill' : 'bi bi-camera-video-off-fill';
      if (callLocalVideoContainer) callLocalVideoContainer.setAttribute('aria-hidden', !isCameraOn);
      if (localVideoStream) {
        localVideoStream.getVideoTracks().forEach(function (track) { track.enabled = isCameraOn; });
      }
    });
  }

  initializeAuthentication();
})();
