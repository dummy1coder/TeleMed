export function getCurrentUser() {
  try {
    const userJson = localStorage.getItem("currentUser");
    const role = localStorage.getItem("role");

    if (!userJson || !role) return null;

    const user = JSON.parse(userJson);
    
    return { ...user, role: role.toLowerCase() };
  } catch (err) {
    console.error("Error parsing user:", err);
    return null;
  }
}

