import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/login', { email })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="formContainer">
      <div>Sign up</div>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>sayinmehmet47@gmail.com</div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
