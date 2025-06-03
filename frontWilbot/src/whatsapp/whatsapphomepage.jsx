import React, { useState } from "react";
import { FaUserCircle, FaCog, FaSearch, FaUser, FaBriefcase, FaUserTie, FaUserAlt } from "react-icons/fa";
import "./WhatsAppHomePage.css";

const chatList = [
  { id: 1, name: "Rajesha", message: "Hey there!", time: "12:45", avatar: <FaUserCircle /> },
  { id: 2, name: "Joshua", message: "Meeting at 4?", time: "11:15", avatar: <FaUserCircle /> },
  { id: 3, name: "Rashad", message: "Thanks for the update.", time: "09:30", avatar: <FaUserCircle /> },
  { id: 4, name: "WilAgent", message: "", time: "", avatar: <FaUserCircle /> },
  { id: 5, name: "Malume", message: "I'll call you later.", time: "Yesterday", avatar: <FaUserCircle /> },
];


export default function WhatsAppHomePage() {
  const [activeChatId, setActiveChatId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatList.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="whatsapp-container">
      {/* Sidebar */}
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

      {/* Chat Window */}
      <main className="chat-window">
        <div className="welcome">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Logo"
            className="welcome-image"
          />
          <h2>WhatsApp Web</h2>
          <p>Send and receive messages without keeping your phone online.</p>
        </div>
      </main>
    </div>
  );
}
