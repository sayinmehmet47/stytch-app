import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookie from 'universal-cookie';

function Home() {
  const cookie = new Cookie();

  const handleAuthTest = async () => {
    const sessionToken = cookie.get('sessionToken');

    axios
      .get('http://localhost:5000/test', {
        headers: {
          session_token: sessionToken,
        },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleAuthTest}>Test auth</button>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
