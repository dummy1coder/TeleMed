import React from "react";
import AuthPage from "../../components/Shared/AuthPage";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthPage registerMode={true} />
    </div>
  );
}
