import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookie = new Cookie();

function Auth() {
  const [loading, setLoading] = useState(true);
  const token = new URLSearchParams(window.location.search).get('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('http://localhost:5000/authenticate', {
        login_token: token,
      })
      .then((response) => {
        cookie.set('sessionToken', response.data.session_token);
        navigate('/');
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
        // Handle the error as appropriate for your application
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Auth</div>;
}

export default Auth;
