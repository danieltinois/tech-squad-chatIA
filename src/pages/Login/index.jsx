import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Aqui você adicionará a lógica para enviar os dados para o back-end
    // Após a autenticação, redireciona para a página de chat
    navigate("/chat");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-form">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="my-3">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
