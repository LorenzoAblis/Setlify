import { login } from "../controllers/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await login("lorenzo.ablis123@gmail.com", "password");
    if (res.success) {
      navigate("/");
    } else {
      console.error("Login failed:", res.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
