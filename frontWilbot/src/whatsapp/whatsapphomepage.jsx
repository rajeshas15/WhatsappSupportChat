import React, { useState } from "react";
import { FaUserCircle, FaCog, FaSearch, FaUser, FaBriefcase, FaUserTie, FaUserAlt } from "react-icons/fa";
import "./WhatsAppHomePage.css";

const chatList = [
  { id: 1, name: "WilAgent", message: "", time: "", avatar: <FaUserCircle /> },
  { id: 2, name: "Rajesha", message: "Hey there!", time: "12:45", avatar: <FaUserCircle /> },
  { id: 3, name: "Joshua", message: "Meeting at 4?", time: "11:15", avatar: <FaUserCircle /> },
  { id: 4, name: "Rashad", message: "Thanks for the update.", time: "09:30", avatar: <FaUserCircle /> },
  { id: 5, name: "Malume", message: "I'll call you later.", time: "Yesterday", avatar: <FaUserCircle /> },
];


export default function WhatsAppHomePage() {
  const [activeChatId, setActiveChatId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistories, setChatHistories] = useState({});
  const [isTyping, setIsTyping] = useState(false);


  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat = chatList.find(chat => chat.id === activeChatId);


  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat) return;

    const sessionId = `usersession${activeChatId}`;

    const userMessage = {
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMessage]
    }));

    setMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputValue: message,
          inputType: "chat",
          outputType: "chat",
          sessionId: sessionId
        }),
      });

      const statusCode = res.status;
      const data = await res.json();
      let botText = data?.message;

      if (!botText || statusCode === 504) {
        botText = "There was a temporary issue processing your request. Please retry shortly.";
      }

      const botMessage = {
        sender: "bot",
        text: botText,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistories(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), botMessage]
      }));
    } catch (error) {
      console.error("Failed to send message:", error);

      const fallbackMessage = {
        sender: "bot",
        text: "There was a temporary issue processing your request. Please retry shortly.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistories(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), fallbackMessage]
      }));
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="whatsapp-container">

      <aside className="sidebar">
        <header className="sidebar-header">
          <div className="logo">WhatsApp</div>
          <div className="icons">
            <FaUserCircle title="Profile" />
            <FaCog title="Settings" />
          </div>
        </header>

        <div className="search-bar">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search chats"
            />
          </div>
        </div>

        <section className="chat-list" role="list">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${activeChatId === chat.id ? "active-chat" : ""}`}
                onClick={() => setActiveChatId(chat.id)}
                role="listitem"
                tabIndex={0}
                aria-label={`Chat with ${chat.name}`}
              >
                <div className="chat-avatar">{chat.avatar}</div>
                <div className="chat-details">
                  <div className="chat-header">
                    <span className="chat-name">{chat.name}</span>
                    <span className="chat-time">{chat.time}</span>
                  </div>
                  <div className="chat-message">{chat.message}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-chats">No chats found</div>
          )}
        </section>
      </aside>

      <main className="chat-window">
        {activeChat ? (
          <div className="chat-content">
            <header className="chat-header">
              <div className="chat-avatar">{activeChat.avatar}</div>
              <div className="chat-info">
                <h3>{activeChat.name}</h3>
              </div>
              <div className="chat-icons">
                <FaSearch title="Search in chat" className="chat-search-icon" style={{ cursor: "pointer", fontSize: "1.2em" }} />
              </div>
            </header>
            <div className="chat-body">
              {(chatHistories[activeChatId] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${msg.sender === "user" ? "sent" : "received"}`}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble received typing-indicator">
                  Typing...
                </div>
              )}
            </div>

            <footer className="chat-footer">
              <input
                type="text"
                placeholder="Type a message"
                className="chat-input"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button className="send-button" onClick={handleSendMessage}>Send</button>
            </footer>
          </div>
        ) : (
          <div className="welcome">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp Logo"
              className="welcome-image"
            />
            <h2>WhatsApp Web</h2>
            <p>Send and receive messages without keeping your phone online.</p>
          </div>
        )}
      </main>

    </div>
  );
} 