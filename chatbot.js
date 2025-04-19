// Chatbot functionality
class Chatbot {
    constructor() {
        this.chatbotContainer = document.querySelector('.chatbot-container');
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.chat-input button');
        this.chatbotHeader = document.querySelector('.chatbot-header');
        this.isOpen = false;
        this.apiKey = 'AIzaSyD7Qb6lgYu4e8vf3IuhhQ2pEj5UxrSX4pk'; // Set API key directly
        this.conversationHistory = [];
        this.systemPrompt = `You are a fitness assistant named Gen Fit. Your role is to help users with their fitness journey by providing:
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
                            text: `You are a professional fitness coach. Respond to the following message with a motivational, encouraging, and professional tone. Use fitness-specific terminology and provide actionable advice. Keep responses concise but informative. Here's the message: ${message}`
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

            // Add fitness coach style to the response
            let responseText = data.candidates[0].content.parts[0].text;
            
            // Add motivational phrases and fitness-specific language
            const motivationalPhrases = [
                "Let's crush those fitness goals!",
                "You've got this!",
                "Stay consistent and the results will follow!",
                "Remember, progress takes time and dedication!",
                "Keep pushing your limits!",
                "Every workout counts!",
                "Stay focused on your journey!",
                "Your hard work will pay off!",
                "Consistency is key to success!",
                "Believe in yourself and your abilities!"
            ];

            // Add a random motivational phrase to the response
            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            responseText = `${responseText}\n\n${randomPhrase}`;

            return responseText;
        } catch (error) {
            console.error('Error getting Gemini response:', error);
            return "I'm having trouble connecting to the fitness coaching service right now. Please try again in a few moments. Remember, consistency is key to your fitness journey!";
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
        
        // Add message content
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = text;
        
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