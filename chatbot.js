// Chatbot functionality
class Chatbot {
    constructor() {
        this.chatbotContainer = document.querySelector('.chatbot-container');
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.chat-input button');
        this.chatbotHeader = document.querySelector('.chatbot-header');
        this.chatbot = document.getElementById('chatbot');
        this.isOpen = false;
        this.apiKey = 'AIzaSyD7Qb6lgYu4e8vf3IuhhQ2pEj5UxrSX4pk';
        this.conversationHistory = [];
        this.userName = '';

        this.systemPrompt = `You are Gen Fit, a professional fitness coach. Your role is to help users with their fitness journey by providing:
- Personalized workout advice
- Nutrition tips
- Exercise form guidance
- Progress tracking suggestions
- Motivation and encouragement
- Answering fitness-related questions
- Providing modifications for exercises
- Explaining fitness concepts in simple terms

Always be professional, encouraging, and safety-conscious. If you don't know something, say so rather than making up information.`;

        this.initialize();
    }

    initialize() {
        // Show chatbot only after name is submitted
        const submitNameBtn = document.getElementById('submitName');
        if (submitNameBtn) {
            submitNameBtn.addEventListener('click', () => {
                const nameInput = document.getElementById('userName');
                if (nameInput && nameInput.value.trim()) {
                    this.userName = nameInput.value.trim();
                    this.chatbot.style.display = 'block';
                }
            });
        }

        // Toggle chatbot visibility
        this.chatbotHeader.addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Send message on button click
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Add system prompt to conversation history
        this.conversationHistory.push({
            role: 'system',
            parts: [{ text: this.systemPrompt }]
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        this.chatbotContainer.classList.toggle('active');
        // Update chevron icon
        const chevron = this.chatbotHeader.querySelector('i');
        chevron.classList.toggle('fa-chevron-down');
        chevron.classList.toggle('fa-chevron-up');
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show loading state
        const loadingMessage = this.addMessage('Thinking...', 'bot');
        
        try {
            const response = await this.getGeminiResponse(message);
            // Remove loading message
            loadingMessage.remove();
            // Add actual response
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            loadingMessage.remove();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    formatResponse(text) {
        // Format headers
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format bullet points
        text = text.replace(/\* (.*?)(?=\n|$)/g, '• $1');
        
        // Add emoji indicators for different sections
        text = text.replace(/Warm-up/g, '🔥 Warm-up');
        text = text.replace(/Strength Training/g, '💪 Strength Training');
        text = text.replace(/Cardio/g, '🏃‍♂️ Cardio');
        text = text.replace(/Cool-down/g, '🧘‍♂️ Cool-down');
        text = text.replace(/Sample Weekly Schedule/g, '📅 Sample Weekly Schedule');
        text = text.replace(/Actionable Advice/g, '💡 Actionable Advice');
        
        // Add styling for days of the week
        text = text.replace(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday):/g, '<strong>$1:</strong>');
        
        // Format sections
        const sections = text.split('\n\n');
        const formattedSections = sections.map(section => {
            if (section.includes('💪') || section.includes('🔥') || section.includes('🏃‍♂️') || 
                section.includes('🧘‍♂️') || section.includes('📅') || section.includes('💡')) {
                return `<div class="section">${section}</div>`;
            }
            return section;
        });
        
        return formattedSections.join('\n\n');
    }

    async getGeminiResponse(message) {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${this.systemPrompt}\n\nUser's name: ${this.userName}\n\nMessage: ${message}\n\nPlease respond as a professional fitness coach, using the user's name occasionally to make it more personal. Format your response with clear sections using ** for headers and * for bullet points. Keep responses concise but informative, and always include actionable advice.`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0] || !data.candidates[0].content.parts[0].text) {
                throw new Error('Invalid API response format');
            }

            let responseText = data.candidates[0].content.parts[0].text;
            
            // Format the response
            responseText = this.formatResponse(responseText);
            
            // Add motivational phrase
            const motivationalPhrases = [
                "Let's crush those fitness goals! 💪",
                "You've got this! 🎯",
                "Stay consistent and the results will follow! 📈",
                "Remember, progress takes time and dedication! 🌱",
                "Keep pushing your limits! 🚀",
                "Every workout counts! 💫",
                "Stay focused on your journey! 🎯",
                "Your hard work will pay off! ⭐",
                "Consistency is key to success! 🔑",
                "Believe in yourself and your abilities! 🌟"
            ];

            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            responseText = `${responseText}\n\n${randomPhrase}`;

            return responseText;
        } catch (error) {
            console.error('Error getting Gemini response:', error);
            return "I'm having trouble connecting right now. Please try again in a few moments. Remember, consistency is key to your fitness journey! 💪";
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        // Add timestamp
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestampSpan = document.createElement('span');
        timestampSpan.classList.add('message-timestamp');
        timestampSpan.textContent = timestamp;
        
        // Add message content with formatting
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // Replace newlines with <br> and preserve HTML formatting
        const formattedText = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        
        contentDiv.innerHTML = formattedText;
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timestampSpan);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        return messageDiv;
    }

    setApiKey(key) {
        this.apiKey = key;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
}); 