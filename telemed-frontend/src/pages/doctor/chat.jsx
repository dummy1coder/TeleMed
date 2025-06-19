import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import axios from "../../api/axios";
import Sidebar from "../../components/Doctor/Sidebar";

const Chat = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/chat-users");
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch messages for selected user
  useEffect(() => {
    if (!selectedUserId) return;
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${selectedUserId}`);
        setMessages(response.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, [selectedUserId]);

  // Real-time Pusher listener
  useEffect(() => {
    const pusher = new Pusher("7918f1e1822686fa51ec", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chat");

    channel.bind("message", (data) => {
      if (
        data.user_id === selectedUserId ||
        data.receiver_id === selectedUserId
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [selectedUserId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Send a message
  const sendMessage = async () => {
    if (!text.trim()) return;

    await axios.post("/api/messages", {
      username: currentUser.name,
      message: text,
      receiver_id: selectedUserId,
    });

    setText("");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full">
        <Sidebar onToggle={setSidebarWidth} />
      </div>

      {/* Main Chat Container */}
      <div
        className="flex-1 flex transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* User List */}
        <div className="w-1/3 border-r overflow-y-auto bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-xl font-semibold">Chats</h2>
            <button
              onClick={() => {
                setSelectedUserId(null);
                setShowModal(true);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              New Chat
            </button>
          </div>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`p-4 cursor-pointer hover:bg-blue-100 ${
                  selectedUserId === user.id ? "bg-blue-200" : ""
                }`}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="w-2/3 p-6 flex flex-col space-y-4">
          {!selectedUserId ? (
            <div className="space-y-4 text-center text-gray-500">
              <p>Select a patient to start chatting</p>
              <p>Or click "New Chat" to begin a new conversation</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Chat with {users.find((u) => u.id === selectedUserId)?.name}
              </h2>

              <div className="flex-1 overflow-y-auto space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 max-w-sm rounded-lg relative text-sm ${
                      msg.user_id === currentUser.id
                        ? "bg-blue-500 text-white self-end ml-auto"
                        : "bg-gray-300 text-black self-start mr-auto"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="absolute bottom-1 right-2 text-[10px] text-gray-200">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-l"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 rounded-r"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for New Chat */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Start New Chat</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {users
                .filter((u) => u.id !== currentUser.id)
                .map((user) => (
                  <li
                    key={user.id}
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setShowModal(false);
                    }}
                    className="cursor-pointer p-2 border hover:bg-blue-100 rounded"
                  >
                    {user.name}
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full text-center bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
