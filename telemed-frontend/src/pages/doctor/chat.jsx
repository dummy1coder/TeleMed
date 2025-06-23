import React from "react";
import Chat from "../../components/Shared/Chat";
import { getCurrentUser } from "../../utils/auth";

export default function DoctorChat() {
  const currentUser = getCurrentUser();

  if (!currentUser) return <div>Loading chat...</div>;

  return <Chat currentUser={currentUser} role="doctor" />;
}
