document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            // Save theme preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // Apply saved theme preference on load
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            // Default to light mode or remove dark mode if preference is not dark
            document.body.classList.remove('dark-mode');
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle aria-expanded for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Scroll-to-Top/Bottom Buttons
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');

    if (scrollToTopBtn && scrollToBottomBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) { // Show button after scrolling down 200px
                scrollToTopBtn.style.display = 'flex';
                scrollToBottomBtn.style.display = 'flex'; // Keep both visible when scrolling
            } else {
                scrollToTopBtn.style.display = 'none';
                scrollToBottomBtn.style.display = 'flex'; // Only show scroll down button at top
            }

            // Hide scroll-to-bottom if at the very bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { // 50px buffer
                scrollToBottomBtn.style.display = 'none';
            } else if (window.scrollY > 200) { // Ensure it reappears when scrolling up from bottom
                 scrollToBottomBtn.style.display = 'flex';
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollToBottomBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    // Dynamic Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const currentYearAboutSpan = document.getElementById('current-year-about'); // For about.html
    if (currentYearAboutSpan) {
        currentYearAboutSpan.textContent = new Date().getFullYear();
    }


    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPopup = document.getElementById('chatbotPopup');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotToggle && chatbotPopup && chatbotClose && chatbotInput && chatbotSend && chatbotMessages) {
        chatbotToggle.addEventListener('click', () => {
            chatbotPopup.classList.toggle('open');
            if (chatbotPopup.classList.contains('open')) {
                chatbotInput.focus(); // Focus input when opened
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotPopup.classList.remove('open');
        });

        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const messageText = chatbotInput.value.trim();
            if (messageText === '') return;

            // Display user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('message', 'user-message');
            userMessageDiv.textContent = messageText;
            chatbotMessages.appendChild(userMessageDiv);

            chatbotInput.value = ''; // Clear input
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom

            // Simulate bot response (you would integrate with a real AI service here)
            setTimeout(() => {
                const botResponseDiv = document.createElement('div');
                botResponseDiv.classList.add('message', 'bot-message');
                // Simple keyword-based responses for demonstration
                let botResponse = "I'm sorry, I don't understand that yet. Please ask about our products or services!";
                if (messageText.toLowerCase().includes('hello') || messageText.toLowerCase().includes('hi')) {
                    botResponse = "Hello! How can I help you find the right vehicle part?";
                } else if (messageText.toLowerCase().includes('parts') || messageText.toLowerCase().includes('catalogue')) {
                    botResponse = "You can explore our full range of parts in the 'Parts Catalogue' section.";
                } else if (messageText.toLowerCase().includes('contact')) {
                    botResponse = "You can find our contact details on the 'Contact Us' page, or call us directly.";
                } else if (messageText.toLowerCase().includes('quote')) {
                    botResponse = "For a custom quote, please visit our 'Get a Quote' page.";
                } else if (messageText.toLowerCase().includes('thank you') || messageText.toLowerCase().includes('thanks')) {
                    botResponse = "You're welcome! Let me know if you need anything else.";
                }

                botResponseDiv.textContent = botResponse;
                chatbotMessages.appendChild(botResponseDiv);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
            }, 1000);
        }
    }
});
