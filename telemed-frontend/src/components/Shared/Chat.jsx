import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import axios from "../../api/axios";
import PatientSidebar from "../Patient/Sidebar";
import DoctorSidebar from "../Doctor/Sidebar";

const Chat = ({ currentUser, role }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/chat/users");
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
        const response = await axios.get(`/messages/${selectedUserId}`);
        setMessages(response.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  // Setup Pusher
  useEffect(() => {
    if (!currentUser?.id) return;

    const pusher = new Pusher("7918f1e1822686fa51ec", {
      cluster: "ap2",
      encrypted: true,
      authEndpoint: "http://localhost:8000/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      },
    });

    const channel = pusher.subscribe(`private-chat.${currentUser.id}`);
    channel.bind("message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [currentUser?.id]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post("/messages", {
        message: text,
        receiver_id: selectedUserId,
      });
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Determine sidebar based on role
  const SidebarComponent = role === "doctor" ? DoctorSidebar : PatientSidebar;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="fixed left-0 top-0 h-full">
        <SidebarComponent onToggle={setSidebarWidth} />
      </div>

      <div
        className="flex-1 flex transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Chat List */}
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
              <p>Select a user to start chatting</p>
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
                      msg.sender_id === currentUser.id
                        ? "bg-blue-500 text-white self-end ml-auto"
                        : "bg-gray-300 text-black self-start mr-auto"
                    }`}
                  >
                    <p className="font-semibold">{msg.sender_name}</p>
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

              <div className="flex pt-2">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Start New Chat</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {users.map((user) => (
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
 