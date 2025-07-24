import React, { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import axios from "../../api/axios";
import PatientSidebar from "../Patient/Sidebar";
import DoctorSidebar from "../Doctor/Sidebar";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Chat = ({ currentUser, role }) => {
  const { darkMode } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  // const [image, setImage] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [showModal, setShowModal] = useState(false);
  const messagesEndRef = useRef(null);

  const SidebarComponent = role === "doctor" ? DoctorSidebar : PatientSidebar;

  useEffect(() => {
    axios.get("/chat/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    axios.get(`/chat/messages/${selectedUserId}`).then((res) => {
      setMessages(res.data);
    });
  }, [selectedUserId]);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /*const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };*/

  const sendMessage = async () => {
    if (!text.trim())
      return;

    const formData = new FormData();
    formData.append("receiver_id", selectedUserId);
    if (text) formData.append("message", text);
    // if (image) formData.append("file", image); 

    try {
      const response = await axios.post("/chat/messages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setMessages((prev) => [...prev, response.data]);
      setText("");
      // setImage(null);
    } catch (error) {
      console.error("Failed to send message:", error.response?.data || error.message);
    }
  };


  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="fixed left-0 top-0 h-full">
        <SidebarComponent onToggle={setSidebarWidth} />
      </div>

      <div
        className="flex-1 flex transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Chat List */}
        <div className={`w-1/3 border-r ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} overflow-y-auto`}>
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-xl font-semibold">Chats</h2>
          </div>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`p-4 cursor-pointer hover:bg-blue-100 ${selectedUserId === user.id ? "bg-blue-200" : ""
                  }`}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className={`w-2/3 p-6 flex flex-col space-y-4 ${darkMode ? "bg-gray-900" : ""}`}>
          {!selectedUserId ? (
            <div className="text-center text-gray-500 mt-10">
              <p>Select a user to start chatting</p>
              <p>Or click “New Chat” to begin</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                {users.find((u) => u.id === selectedUserId)?.name}
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map((msg, idx) => {
                  const isSender = msg.sender_id === currentUser.id;
                  return (
                    <div
                      key={idx}
                      className={`flex items-end ${isSender ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl relative text-sm shadow-md ${isSender
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                          }`}>
                        <div className="flex items-end justify-between gap-2">
                          <span className="break-words block">
                            {msg.message && <>{msg.message}</>}
                            {msg.image_url && (
                              <img src={msg.image_url} alt="chat media" className="rounded mt-1 max-w-xs" />
                            )}
                            {msg.file_path && (<a href={msg.file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block mt-1 underline text-blue-200 hover:text-blue-300" > View File
                            </a>)} </span>
                          <span className="text-[10px] text-gray-300 ml-2 whitespace-nowrap">
                            {new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex gap-2 pt-4">
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className={`flex-1 px-4 py-2 rounded-2xl text-sm shadow-sm focus:outline-none ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white border"
                  }`}
                  placeholder="Type your message..."
                />
                {/* <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm"/> */}
                <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-sm hover:bg-blue-700" >
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
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
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
