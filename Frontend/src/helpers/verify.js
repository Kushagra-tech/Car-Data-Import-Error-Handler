const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await fetch("http://localhost:5001/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.token;
  } catch (error) {
    console.log("Error verifying token:", error);
    return false;
  }
};

export default verifyToken;

