const chatData = {
            users: [
                {
                    id: 1,
                    name: "Krish Sharma",
                    avatar: "data:image/png;base64,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",
                    online: true,
                    lastMessage: "Hey! Did you check the new code review? 🚀",
                    time: "2m",
                    unread: 3,
                    messages: [
                        { type: "received", text: "Hey! Welcome to Cloud Coder Chat! 🎉", time: "10:30 AM" },
                        { type: "sent", text: "Thanks! This platform looks amazing! 😍", time: "10:32 AM" },
                        { type: "received", text: "I know right? I've been using it for all my coding collaborations. The interface is super clean!", time: "10:33 AM" },
                        { type: "sent", text: "Did you see the latest JavaScript features in ES2024?", time: "10:35 AM" },
                        { type: "received", text: "Yes! The pattern matching is going to be a game changer! 🚀", time: "10:36 AM" },
                        { type: "sent", text: "Absolutely! I'm also excited about the Records and Tuples proposal", time: "10:38 AM" },
                        { type: "received", text: "Hey! Did you check the new code review? 🚀", time: "10:45 AM" }
                    ]
                },
                {
                    id: 2,
                    name: "Gagan Saini",
                    avatar: "data:image/png;base64,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",
                    online: true,
                    lastMessage: "The API is ready for testing!",
                    time: "15m",
                    unread: 1,
                    messages: [
                        { type: "received", text: "Hey, I just finished the REST API endpoints 🔥", time: "9:00 AM" },
                        { type: "sent", text: "Nice! Which endpoints did you complete?", time: "9:05 AM" },
                        { type: "received", text: "All the CRUD operations for users and products", time: "9:07 AM" },
                        { type: "sent", text: "That's awesome! Did you add authentication?", time: "9:10 AM" },
                        { type: "received", text: "Yes, JWT tokens with refresh mechanism 🔐", time: "9:15 AM" },
                        { type: "sent", text: "Perfect! I'll start integrating with the frontend", time: "9:20 AM" },
                        { type: "received", text: "The API is ready for testing!", time: "9:30 AM" }
                    ]
                },
                {
                    id: 3,
                    name: "Uttkarsh",
                    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAAclBMVEUjHyC9vsD///8AAAC6u73BwsQkHiC3uLr4+PgaFRa7v8AWERLGx8n///0gHB0dGRqoqavn5+jx8fFEQkNcW1wLAACXl5nNzs8oJSafn6EqKSvd3d5JSEhvb3CJiIhQTk93d3c4NzhmZWcTChCBgYMxMDANQBeEAAAIpElEQVR4nM2dDZPiKBCGg0BIhAkx5mM0ajTq//+LF+LoODPGdBPI3lt1V1tbdcxz7JumaRo2CJwovP8i0XEcy7viWCdufoBjhWHYoUpKz9d1k+dt2+733b/avFlvC0rl/ws7DMIkLqhc58dyk6ZCCEJ4J0KIEGm6KY/5WtIiTsLxseZQZwIZrPdph9lz9qRf4jdyTkS6X+vzvzdIGMTn7a4tSaU4WfYir8VVRcp2tz3Hwb+c6ELujhuh+ADlL2auxOa4k8W/otWU7jeidwCMmCw7aLHZ00LPP8tJrE+X7ucPm+AV8NL8o8jlpOOZeaVuDkT1AHDehxQ5NFLOiKtpUwplQfqYaiXKhuogmOULTIrtAeraQXXWP2yLOaJcct4e+ZTZ/WYmx6t/X+g4T53gGverNJfaL69MDmyqG57E2SHxOcnJuSHcIa9BJs3Zl5NDub24pe2J1WXraZKL9cY9b2dlvll7Wa1pI7jVMjEqLhrqHDeJj47d+yx1jB0bWcuDP9xO/BA7jW9xUToKvkNSZeEwH4qD0uv8GvEycDXHob5uPM+vkdpsHRHreA5eQ+zGx9q7fx/EpYv0LdEW/mW90P8ZLx1sq+VBEcw2qOPkSlWdVLc5RVKrw+RVmu45gQMzwap6lUXRolMUZau6YgJDzPcT17xzA/PD7X9JkPrG+q0oqjkC2SRvQWi/b4rXAghsvFBli5daVQTsDC7WE1yRfMLzM6ZWr3E7fawUnHjzaf/hFRcOda+oo0Fe44wa7At+sU02Q7lT0HySmen9MBpCXoHnWO0sTaE/gQYmjA+491kZ1BZcfNqteOCMEsTb2QJMbBeNZQPcHzP21r5PxAJGzFljQZx8ptAIAeTtiIEj8hQfKcJiD015hsPZH61AAy6J2qMjhU6AuKyC8y4WNTRWJNgppuA9HNgQvSnA3x0yp5ANMNALUID4VgYkFsjvTgMnmCkMrVlWKhDxkh9QsVhDkx6G+OI64AV4xeNihyGWF1iIYBXKwUYRbIqJuiA8kWxBY3aqsbzwQMG38EBRHIExGLYm/1QGnAt1hMdiyoCbItQndxdwMpYMHNnOLTANZhaOQHiiPQOBJXRjL1Ax4q4VMMTzEvjZgWMaEegYYRRBgdM1LLLJPQdaWNjwfiyguyW+B01x+FlCd3LMBnixgCZAvPwE4IbJCeoIQuyAoaMTcQKE4jDOwbU/q6gGjmvd+DmgyB1SePHPNzAvIaGYwg++uR0wvBq6HAUOQ72twOP59jCpxovy4bmFl6+twtoCHNY6z7Xj+QTCwp4XDgIycSJT8HCel2YDnMqxwKZPAl5u95v8mP2+OI2ZWOYMcT7gM728TUk+tjoXe9QBuMcE/qbRikpxAJeEiZ0nagwvP4wBS3Dm0wNbbELhxXgCyInNIQHGErhtvhG8sN0Djx0g6BO4ZnkDrgZL7gMC7vLvwOlImIjXOGD0FCOC8A14ZNcRN/Bk+GtIHDBucNNdMwKcY0+IceVWnCHM8CMpcZwjByQeCto/5AEYXv7JLPpaPAAT8KEMviFhHLi1mATGQcQRtwDmrQdgwpTLg0UcsI0ljMaPbi0H9uFhI/E+q4gq3ILhH/ht+8EC0X6ABrYembFqAHlVWTQs3UcdAdbopfmmvnrImHqRH9fKHnd8adbY5OeXhDBNSlkUfXxEUWaalISteW/AXfLztgMIm17+FWOM911gVaW4TfPaL+DTe2BMl89baKtGu78yCfz7Hquz/z5WjMwW6T0w/FB8Fo0fknfb/P+PloBtvmz/NeWTloBCij5NCkOPD+6hacDjpapEptZXH5i5cHtrba07fTW4dr9pS70EFANR5dafsKRfM7LndlGzeJjVg1tCQ84MCkRB+4vVdAzX2fskPqvx3cSwgjbqyKCnVdUKtuNYVYrgZhpwZGAOZRC4YnRqfzEjUyHAKRLi2IuJCkP7mGfwLHcWBvQ+Aw4W+1ySvMolYaoVrAMadLAYJJBIbLJ1qxOZxzRDnAE6ug0CwOG4UFNwb8hqdF5Ah+PBrf1gZCRrMzxrNVanALYfmE79d8DMDa5R/RaZizXwAtjbFprBuwQ2ykw1c/CFB2gLjWlSGsQ1BWxs0f2dVsMfH2/BrXZ0qDcb12oJk2ID7QOMgm+gDDXa3dw7XI6y04CT1REOnGx/G6tfKr4KwY55Tdn4L/FySRCtjOHvZtGlJzvc9aKShWoWDfTubwHIWTB7pT/Ho8h23L8Nz/gTRLhetRUjG55/t5Qzu84IKHBP/OMHLrEt5aY+sfz2L/fJ+6XV858pumk/0Mnzg0gOF7d3xN+24An6OtLTxRM2C28X3h6usLh48nS1B3vzwU4fD+Kl1dWe/vLUDXgG/y7uX96N1+byVHi/nmbXiGSrvoHJ8nra7QKgQJ19T1cl7C8ABnKncGf1ToiZ9RVLc4kV39MzSR/mRM/6EmsXKQKPCc8A8EIFE+7ny2amEPytzOZ65bdoPq8nFlE+8XI+PcwLjM4hfiss0jl502LyA2w6tuzDthFx8ehITC1b3fFS1MnTOfF5ptWjOjt66kdeZyGu3L1vFwczEFeBy6eUqOW1I7gYdfpIaiwtr0BAJaTjpzu1LH3ylh4eO6S5t7wim7oeDxA3nj69yjxo5+GJ0fB89bJMp1foZVW0tIfkrUvPfL7VWQR2948GcUUwPd15pzCWR4fb6ProOpr9VVKcNo4mOdqcZnkfV9OrC19E4urVvc+KaWtzC+lZGWnd5JJAFbIVE846PkQ792PlidS71NIYUbrTMpnyrJqdYkoP+GPRrDrQWc3wQ5TmG0xxKKo2OfWSNwAVJpJec2BBK6ou+ZXO+Zr6a2kpadKUVfb7ucAn1Ciryiah0u2LshPUTTQtdpeUV7V5lPEBmq3quuLpZUcp/WqZC2f/1oZk/k4OSk9Nvj9eDr0ux33enLrfLFy/LuxQOpbyXHzpLN2b4D8YSrxiM8gfkgAAAABJRU5ErkJggg==",
                    online: false,
                    lastMessage: "Thanks for the help with React hooks!",
                    time: "1h",
                    unread: 0,
                    messages: [
                        { type: "sent", text: "Hey Emma, need help with something?", time: "Yesterday 3:00 PM" },
                        { type: "received", text: "Yes! I'm stuck with useEffect dependencies 😅", time: "Yesterday 3:05 PM" },
                        { type: "sent", text: "Ah, the classic infinite loop problem?", time: "Yesterday 3:07 PM" },
                        { type: "received", text: "Exactly! My component keeps re-rendering", time: "Yesterday 3:10 PM" },
                        { type: "sent", text: "Try using useCallback for your functions and useMemo for computed values", time: "Yesterday 3:15 PM" },
                        { type: "received", text: "OMG that worked! You're a lifesaver 🙌", time: "Yesterday 3:30 PM" },
                        { type: "received", text: "Thanks for the help with React hooks!", time: "Yesterday 4:00 PM" }
                    ]
                },
                {
                    id: 4,
                    name: "Nimesh",
                    avatar: "data:image/png;base64,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",
                    online: true,
                    lastMessage: "Let's pair program tomorrow? 💻",
                    time: "2h",
                    unread: 0,
                    messages: [
                        { type: "received", text: "Yo! Working on anything interesting?", time: "11:00 AM" },
                        { type: "sent", text: "Yeah, building a real-time collaboration feature", time: "11:10 AM" },
                        { type: "received", text: "Sounds cool! WebSockets or SSE?", time: "11:15 AM" },
                        { type: "sent", text: "WebSockets with Socket.io for the backend", time: "11:20 AM" },
                        { type: "received", text: "Nice choice! I've used that for a chat app before", time: "11:25 AM" },
                        { type: "sent", text: "Any tips you can share?", time: "11:30 AM" },
                        { type: "received", text: "Let's pair program tomorrow? 💻", time: "11:45 AM" }
                    ]
                },
                {
                    id: 5,
                    name: "Abhishek Thakur",
                    avatar: "data:image/png;base64,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",
                    online: false,
                    lastMessage: "The bug fix is deployed! ✅",
                    time: "3h",
                    unread: 0,
                    messages: [
                        { type: "received", text: "Found the memory leak in production! 🐛", time: "8:00 AM" },
                        { type: "sent", text: "Oh no! What was causing it?", time: "8:05 AM" },
                        { type: "received", text: "Event listeners not being cleaned up in useEffect", time: "8:10 AM" },
                        { type: "sent", text: "Classic React gotcha. Did you add the cleanup?", time: "8:15 AM" },
                        { type: "received", text: "Yep! And added ESLint rules to catch it in the future", time: "8:20 AM" },
                        { type: "sent", text: "Smart! Prevention is better than cure", time: "8:25 AM" },
                        { type: "received", text: "The bug fix is deployed! ✅", time: "8:30 AM" }
                    ]
                },
                {
                    id: 6,
                    name: "Aryan Gupta",
                    avatar: "data:image/png;base64,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",
                    online: true,
                    lastMessage: "Check out my new Python project!",
                    time: "5h",
                    unread: 0,
                    messages: [
                        { type: "received", text: "Started learning machine learning! 🤖", time: "Yesterday 2:00 PM" },
                        { type: "sent", text: "That's exciting! What framework are you using?", time: "Yesterday 2:10 PM" },
                        { type: "received", text: "TensorFlow and Keras for now", time: "Yesterday 2:15 PM" },
                        { type: "sent", text: "Great choices! What's your first project?", time: "Yesterday 2:20 PM" },
                        { type: "received", text: "Image classification for my portfolio", time: "Yesterday 2:30 PM" },
                        { type: "sent", text: "Can't wait to see the results!", time: "Yesterday 2:35 PM" },
                        { type: "received", text: "Check out my new Python project!", time: "Yesterday 3:00 PM" }
                    ]
                },
            ],
            currentUserId: 1
        };
        const chatList = document.getElementById('chatList');
        const messagesArea = document.getElementById('messagesArea');
        const headerAvatarImg = document.getElementById('headerAvatarImg');
        const headerAvatar = document.getElementById('headerAvatar');
        const headerName = document.getElementById('headerName');
        const headerStatus = document.getElementById('headerStatus');
        const messageInput = document.getElementById('messageInput');
        const messageForm = document.getElementById('messageForm');
        const searchInput = document.getElementById('searchInput');
        const welcomeOverlay = document.getElementById('welcomeOverlay');
        const startChatBtn = document.getElementById('startChatBtn');
        const actionToast = document.getElementById('actionToast');
        const toastMessage = document.getElementById('toastMessage');
        function showToast(message) {
            toastMessage.textContent = message;
            const toast = new bootstrap.Toast(actionToast);
            toast.show();
        }

        function getCurrentTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours}:${minutes} ${ampm}`;
        }

        function scrollToBottom() {
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
        function renderChatList(filter = '') {
            chatList.innerHTML = '';

            const filteredUsers = chatData.users.filter(user =>
                user.name.toLowerCase().includes(filter.toLowerCase()) ||
                user.lastMessage.toLowerCase().includes(filter.toLowerCase())
            );

            filteredUsers.forEach(user => {
                const isActive = user.id === chatData.currentUserId;
                const chatItem = document.createElement('div');
                chatItem.className = `chat-item ${isActive ? 'active' : ''}`;
                chatItem.dataset.chat = user.id;

                chatItem.innerHTML = `
                    <div class="avatar ${user.online ? 'online' : ''}">
                        <img src="${user.avatar}" alt="${user.name}">
                    </div>
                    <div class="chat-info">
                        <div class="chat-header">
                            <h6 class="name">${user.name}</h6>
                            <span class="time">${user.time}</span>
                        </div>
                        <p class="last-message">${user.lastMessage}</p>
                    </div>
                    ${user.unread > 0 ? `<span class="unread-badge">${user.unread}</span>` : ''}
                `;

                chatItem.addEventListener('click', () => selectChat(user.id));
                chatList.appendChild(chatItem);
            });
        }

        function renderMessages(userId) {
            const user = chatData.users.find(u => u.id === userId);
            if (!user) return;

            messagesArea.innerHTML = `
                <div class="date-separator">
                    <span>Today</span>
                </div>
            `;

            user.messages.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${msg.type}`;

                if (msg.type === 'received') {
                    messageDiv.innerHTML = `
                        <div class="message-avatar">
                            <img src="${user.avatar}" alt="${user.name}">
                        </div>
                        <div class="message-content">
                            <p>${msg.text}</p>
                            <span class="message-time">${msg.time}</span>
                        </div>
                    `;
                } else {
                    messageDiv.innerHTML = `
                        <div class="message-content">
                            <p>${msg.text}</p>
                            <span class="message-time">${msg.time}</span>
                        </div>
                    `;
                }

                messagesArea.appendChild(messageDiv);
            });

            scrollToBottom();
        }

        function renderHeader(userId) {
            const user = chatData.users.find(u => u.id === userId);
            if (!user) return;

            headerAvatarImg.src = user.avatar;
            headerAvatarImg.alt = user.name;
            headerAvatar.className = `avatar ${user.online ? 'online' : ''}`;
            headerName.textContent = user.name;
            headerStatus.textContent = user.online ? 'Active now' : 'Offline';
            headerStatus.className = `status ${user.online ? '' : 'offline'}`;
        }
        function selectChat(userId) {
            const user = chatData.users.find(u => u.id === userId);
            if (user) user.unread = 0;

            chatData.currentUserId = userId;
            renderChatList(searchInput.value);
            renderHeader(userId);
            renderMessages(userId);
            welcomeOverlay.classList.add('hidden');
        }
        function sendMessage(text) {
            if (!text.trim()) return;

            const user = chatData.users.find(u => u.id === chatData.currentUserId);
            if (!user) return;

            const newMessage = {
                type: 'sent',
                text: text.trim(),
                time: getCurrentTime()
            };

            user.messages.push(newMessage);
            user.lastMessage = text.trim();
            user.time = 'Just now';
            renderMessages(chatData.currentUserId);
            renderChatList(searchInput.value);
            messageInput.value = '';
            setTimeout(() => {
                simulateReply(user);
            }, 1500);
        }

        function simulateReply(user) {
            const replies = [
                "That's interesting! Tell me more 🤔",
                "I totally agree with you! 👍",
                "Let me think about that...",
                "Great point! I hadn't considered that",
                "Sounds good to me! 😊",
                "I'll check that out right away!",
                "Thanks for sharing! 🙌",
                "That makes a lot of sense",
                "Cool! Let's discuss more later",
                "Perfect! I'll get back to you soon"
            ];

            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const replyMessage = {
                type: 'received',
                text: randomReply,
                time: getCurrentTime()
            };

            user.messages.push(replyMessage);
            user.lastMessage = randomReply;
            user.time = 'Just now';
            if (chatData.currentUserId === user.id) {
                renderMessages(user.id);
            }
            renderChatList(searchInput.value);
        }
        startChatBtn.addEventListener('click', () => {
            welcomeOverlay.classList.add('hidden');
        });
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sendMessage(messageInput.value);
        });
        searchInput.addEventListener('input', (e) => {
            renderChatList(e.target.value);
        });
        document.getElementById('voiceCallBtn').addEventListener('click', () => {
            const user = chatData.users.find(u => u.id === chatData.currentUserId);
            showToast(`📞 Starting voice call with ${user.name}...`);
        });

        document.getElementById('videoCallBtn').addEventListener('click', () => {
            const user = chatData.users.find(u => u.id === chatData.currentUserId);
            showToast(`📹 Starting video call with ${user.name}...`);
        });

        document.getElementById('infoBtn').addEventListener('click', () => {
            const user = chatData.users.find(u => u.id === chatData.currentUserId);
            showToast(`ℹ️ ${user.name} - ${user.online ? 'Online' : 'Offline'}`);
        });

        document.getElementById('attachBtn').addEventListener('click', () => {
            showToast('📎 File attachment dialog opened');
        });

        document.getElementById('emojiBtn').addEventListener('click', () => {
            showToast('😊 Emoji picker opened');
        });

        document.getElementById('voiceBtn').addEventListener('click', () => {
            showToast('🎤 Recording voice message...');
        });

        document.getElementById('imageBtn').addEventListener('click', () => {
            showToast('🖼️ Image gallery opened');
        });
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(messageInput.value);
            }
        });
        function init() {
            renderChatList();
            renderHeader(chatData.currentUserId);
            renderMessages(chatData.currentUserId);
        }
        init();