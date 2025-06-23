export function getCurrentUser() {
  const userJson = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");

  if (!userJson || !role) return null;

  try {
    const user = JSON.parse(userJson);
    return { ...user, role };
  } catch (err) {
    console.error("Invalid user object in storage");
    return null;
  }
}
