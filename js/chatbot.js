/* ============================================================
   chatbot.js – Rendrox AI Helper Chatbot Widget
   ============================================================ */

function initChatbot() {
  const container = document.getElementById('chatbot-container');
  if (!container) return;

  const toggleBtn = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot-panel');
  const messagesEl = document.getElementById('chatbot-messages');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const closeBtn = document.getElementById('chatbot-close');

  if (!panel || !messagesEl || !inputEl || !sendBtn) return;

  // Knowledge base
  const knowledge = {
    greetings: ['hi','hello','hey','good morning','good evening','good afternoon','yo',"what's up"],
    farewells: ['bye','goodbye','see you','cya','later','exit','quit'],
    thanks: ['thanks','thank you','ty','appreciate it','thx']
  };

  function getGreetingResponse() {
    const r = ['Hello! How can I help you today? 😊','Hi there! What can I assist you with?','Hey! I\'m here to help. What\'s on your mind?','Hello! Feel free to ask me anything!'];
    return r[Math.floor(Math.random()*r.length)];
  }
  function getFarewellResponse() {
    const r = ['Goodbye! Feel free to come back anytime. 👋','See you later! Have a great day! 😊','Take care! I\'m always here if you need help.','Bye! Don\'t hesitate to reach out again.'];
    return r[Math.floor(Math.random()*r.length)];
  }
  function getThanksResponse() {
    const r = ['You\'re welcome! Happy to help. 😊','Anytime! Let me know if you need anything else.','Glad I could help!','My pleasure! Feel free to ask more questions.'];
    return r[Math.floor(Math.random()*r.length)];
  }

  function getRendroxResponse(q) {
    q = q.toLowerCase();
    // Services
    if (q.includes('automation testing') || (q.includes('testing') && q.includes('automation'))) {
      return 'Rendrox AI provides comprehensive Automation Testing services covering Web UI, API, Cloud Firewall, Functional, Regression, Smoke, and Integration testing using Selenium, Playwright, Pytest, and modern frameworks.';
    }
    if (q.includes('api testing') || (q.includes('api') && q.includes('test'))) {
      return 'We specialize in API Testing & Validation — REST API automation, endpoint security checks, authentication testing, performance validation, and integration testing for enterprise systems.';
    }
    if (q.includes('cloud firewall') || (q.includes('firewall') && q.includes('test'))) {
      return 'Our Cloud Firewall Testing validates security policies, authentication mechanisms, access controls, and network rules to ensure enterprise compliance and robust threat protection.';
    }
    if (q.includes('chatbot') || q.includes('ai agent') || q.includes('ai assistant')) {
      return 'We build intelligent AI Chatbots and Autonomous AI Agents using OpenAI, LangChain, LangGraph, RAG (Retrieval-Augmented Generation), Vector Databases, and workflow automation for 24/7 customer support and business operations.';
    }
    if ((q.includes('full stack') || q.includes('mern')) && (q.includes('dev') || q.includes('web') || q.includes('app'))) {
      return 'Rendrox AI offers Full Stack MERN Development — building scalable applications with MongoDB, Express.js, React.js, and Node.js. We create modern, secure, responsive, high-performance platforms for startups and enterprises.';
    }
    if (q.includes('process automation') || (q.includes('rpa') || q.includes('uipath') || q.includes('automation anywhere'))) {
      return 'We provide Enterprise Process Automation using UiPath & Automation Anywhere — unattended/attended bots for Finance, AR, Order Management, Supply Chain, Invoice Processing, ERP Integrations, and Enterprise Workflow Automation.';
    }
    if (q.includes('security') || q.includes('security testing') || q.includes('cloud testing')) {
      return 'Our Security & Cloud Validation services include Cloud Firewall Testing, API Security Validation, Authentication Testing, Performance Testing, and Enterprise Security Verification to ensure reliability and compliance.';
    }
    if (q.includes('mern') || q.includes('react') || q.includes('node') || q.includes('mongodb') || q.includes('express')) {
      return 'Rendrox AI builds Full Stack MERN applications — MongoDB, Express.js, React.js, Node.js. We develop modern, responsive, and scalable platforms for startups, enterprises, and SaaS products.';
    }
    // Coding help
    if (q.includes('html')) return 'HTML (HyperText Markup Language) structures web pages using tags. It defines headings, paragraphs, links, images, and more. Want an example?';
    if (q.includes('css')) return 'CSS styles HTML elements — layout, colors, fonts, animations, and responsiveness. It makes websites visually appealing!';
    if (q.includes('javascript')||q.includes('js')) return 'JavaScript is a dynamic programming language that adds interactivity to websites — from simple validations to full web apps.';
    if (q.includes('python')) return 'Python is a versatile, beginner-friendly language used for web dev, data science, AI, automation, and more.';
    if (q.includes('react')) return 'React is a JS library for building UIs with reusable components and a virtual DOM for fast rendering. Maintained by Meta.';
    if (q.includes('api')) return 'An API (Application Programming Interface) lets different software systems communicate. REST APIs use HTTP requests for CRUD operations.';
    if (q.includes('selenium')) return 'Selenium is a popular open-source tool for automating web browsers. It supports multiple languages (Java, Python, JS) and is widely used for web UI testing.';
    if (q.includes('playwright')) return 'Playwright is a modern browser automation framework by Microsoft. It supports Chromium, Firefox, and WebKit with a single API for reliable end-to-end testing.';
    if (q.includes('pytest')) return 'Pytest is a powerful Python testing framework. It\'s simple, scalable, and supports fixtures, parameterization, plugins, and parallel execution.';
    if (q.includes('langchain') || q.includes('rag')) return 'LangChain is a framework for building LLM-powered applications. RAG (Retrieval-Augmented Generation) combines retrieval systems with LLMs for accurate, context-aware responses.';
    if (q.includes('database')||q.includes('sql')) return 'Databases organize data. SQL databases (MySQL, PostgreSQL) use structured tables; NoSQL (MongoDB) uses flexible documents.';
    if (q.includes('array')||q.includes('list')) return 'Arrays/lists store multiple values in one variable. Use indexes, loops, and methods like .push(), .map(), .filter().';
    if (q.includes('variable')) return 'Variables store data values — strings, numbers, objects. Declared with let, const, var (JS) or by assignment (Python).';
    if (q.includes('debug')||q.includes('error')||q.includes('fix')) return 'Debugging tip: Read the error message carefully — it points to the issue. Use console.log()/print() liberally. Break problems into smaller parts.';
    return null;
  }

  function getGeneralResponse(q) {
    q = q.toLowerCase();
    if (q.includes('time')||q.includes('date')) {
      const now = new Date();
      return 'The current time is ' + now.toLocaleTimeString() + ' and today\'s date is ' + now.toLocaleDateString() + '. 📅';
    }
    if (q.includes('weather')) return 'I don\'t have live weather data, but check weather.com or a weather app! ⛅';
    if ((q.includes('name')&&(q.includes('your')||q.includes('you')))) return 'I\'m Rendrox AI Helper! You can call me RendBot! 🤖';
    if (q.includes('how are you')) return 'I\'m doing great, thanks for asking! Ready to help you. How are you? 😊';
    if (q.includes('joke')||q.includes('funny')) {
      const j = ['Why do programmers prefer dark mode? Because light attracts bugs! 🐛','What do you call a bear with no teeth? A gummy bear! 🐻','Why did the scarecrow win an award? Outstanding in his field! 🌾','Why don\'t scientists trust atoms? They make up everything! ⚛️'];
      return j[Math.floor(Math.random()*j.length)];
    }
    if (q.includes('yourself')||q.includes('who are you')) return 'I\'m an AI Helper chatbot built into the Rendrox AI site. I can answer questions about our services (Automation Testing, AI Chatbots, MERN Dev, RPA, Cloud Security), coding questions, tell jokes, and help with general queries!';
    if (q.includes('what can you do')||q.includes('help')||q.includes('capabilities')) {
      return 'I can:\n🤖 Answer about Rendrox AI services (Testing, AI, RPA, MERN, Security)\n💻 Answer coding questions (HTML, CSS, JS, Python, React, Selenium, etc.)\n💬 Have friendly conversations\n😄 Tell jokes\n📅 Tell date/time\n🔧 Give debugging tips\n\nAsk me anything!';
    }
    if (q.includes('services')||q.includes('offer')||q.includes('provide')) {
      return 'Rendrox AI offers:\n🔬 Automation Testing (Web UI, API, Cloud Firewall)\n🤖 AI Chatbots & AI Agents\n🚀 Enterprise Process Automation (UiPath, AA)\n💻 Full Stack MERN Development\n🔒 Security & Cloud Validation\n\nWhich service interests you?';
    }
    if (q.includes('hello')||q.includes('hi')) return getGreetingResponse();
    return null;
  }

  function getBotResponse(msg) {
    const lower = msg.toLowerCase().trim();
    for (const g of knowledge.greetings) {
      if (lower===g||lower.startsWith(g+' ')||lower.startsWith(g+',')) return getGreetingResponse();
    }
    for (const f of knowledge.farewells) {
      if (lower===f||lower.startsWith(f+' ')||lower.startsWith(f+',')) return getFarewellResponse();
    }
    for (const t of knowledge.thanks) {
      if (lower.includes(t)) return getThanksResponse();
    }
    const rendrox = getRendroxResponse(msg);
    if (rendrox) return rendrox;
    const general = getGeneralResponse(msg);
    if (general) return general;
    const fallbacks = [
      'That\'s interesting! I\'m still learning — could you rephrase or ask something else? 🤔',
      'I\'m not sure I fully understand. Tell me more about what you\'re looking for! 😊',
      'Great question! I can help with our services, coding, tech, jokes, or just chat. What would you like to explore?',
      'I\'m still expanding my knowledge! Try asking about our services, programming, ask for a joke, or just say hi! 🌟',
      'Hmm, let me think... Feel free to ask about Automation Testing, AI Chatbots, MERN Development, RPA, or anything tech-related!'
    ];
    return fallbacks[Math.floor(Math.random()*fallbacks.length)];
  }

  function addMessage(text, sender) {
    const el = document.createElement('div');
    el.className = 'chatbot-msg chatbot-msg-' + sender;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Toggle panel
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('chatbot-open');
      toggleBtn.style.display = isOpen ? 'none' : 'flex';
      if (isOpen) setTimeout(() => inputEl.focus(), 300);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('chatbot-open');
      if (toggleBtn) toggleBtn.style.display = 'flex';
    });
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    inputEl.value = '';
    sendBtn.disabled = true;

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'chatbot-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    scrollToBottom();

    const delay = 300 + Math.random() * 900;
    await new Promise(r => setTimeout(r, delay));

    if (typing.parentNode) typing.remove();
    const response = getBotResponse(text);
    addMessage(response, 'bot');
    sendBtn.disabled = false;
    inputEl.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !sendBtn.disabled) sendMessage();
  });

  // Add initial bot message after a brief delay
  setTimeout(() => {
    if (messagesEl.children.length === 0) {
      addMessage('👋 Welcome to Rendrox AI! I\'m your AI Helper. Ask me about our services, coding, or anything else!', 'bot');
    }
  }, 500);
}