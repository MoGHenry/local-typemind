// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
    
    // Add to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Sent message (${message.length} chars)`;
    
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
    
    // Add error to activity history
    const historyTable = document.getElementById('activity-history').getElementsByTagName('tbody')[0];
    const newRow = historyTable.insertRow();
    const timeCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    
    const now = new Date();
    timeCell.textContent = now.toLocaleTimeString();
    actionCell.textContent = `Error: ${error.message}`;
  }
}
// Initialize variables
let apiKey = null;
let apiProvider = 'deepseek';
let chatHistory = [];

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('api-provider');
const saveKeyBtn = document.getElementById('save-key');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Event Listeners
saveKeyBtn.addEventListener('click', saveApiKey);
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Save API key
function saveApiKey() {
  apiKey = apiKeyInput.value.trim();
  apiProvider = providerSelect.value;
  
  if (!apiKey) {
    alert('Please enter a valid API key');
    return;
  }
  
  // Clear input and show success
  apiKeyInput.value = '';
  addMessage('system', 'API key saved successfully');
}

// Send message
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;
  
  if (!apiKey) {
    alert('Please save your API key first');
    return;
  }
  
  // Add user message to chat
  addMessage('user', message);
  messageInput.value = '';
  
  try {
    const response = await fetchChatResponse(message);
    addMessage('assistant', response);
  } catch (error) {
    addMessage('error', 'Failed to get response: ' + error.message);
  }
}

// Fetch chat response from API
async function fetchChatResponse(message) {
  const endpoint = apiProvider === 'deepseek' ? 
    'https://api.deepseek.com/v1/chat/completions' :
    'https://api.openai.com/v1/chat/completions';
    
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: apiProvider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo',
      messages: [...chatHistory, {role: 'user', content: message}]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Add message to chat window
function addMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  
  const contentElement = document.createElement('div');
  contentElement.classList.add('content');
  contentElement.textContent = content;
  
  messageElement.appendChild(contentElement);
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Add to chat history
  if (role !== 'system' && role !== 'error') {
    chatHistory.push({role, content});
  }
}
