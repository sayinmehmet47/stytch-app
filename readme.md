- First, the user's email address is sent to the backend. The backend then sends an email to Stytch, which in turn sends a magic link to the user's email address.

```jsx
const client = new stytch.Client({
  project_id: 'project-test-2901c788-fc6d-435a-9d0c-c13444601c89',
  secret: 'secret-test-UD3Y4GPVAt9e0QIGaZsyYJLjFjWc7hCMiRg=',
});

axios.post('http://localhost:5000/login', { email }).then((response) => {
  console.log(response);
});

app.post('/login', async (req, res) => {
  const { email } = req.body;

  const params = {
    email,
    login_magic_link_url: 'http://localhost:3000/authenticate',
    signup_magic_link_url: 'http://localhost:3000/authenticate',
  };
  try {
    const response = await client.magicLinks.email.loginOrCreate(params);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
```

- then we authenticate with the token we got , and send a requst with theat token and it turn back us a sessionToken.

```jsx
app.post('/authenticate', async (req, res) => {
  const { login_token } = req.body;

  try {
    const sessionToken = await client.magicLinks.authenticate({
      token: login_token,
      session_duration_minutes: 60,
    });
    res.send(sessionToken);
  } catch (error) {
    res.send(error);
  }
});
```

- We set the session token in the request header. For each subsequent request that requires authentication, we include this session token in the header as a 'session-cookie'. This allows the server to validate the session and ensure the user is authenticated.

```jsx
useEffect(() => {
    axios
      .post('http://localhost:5000/authenticate', {
        login_token: token,
      })
      .then((response) => {
        cookie.set('sessionToken', response.data.session_token);
        navigate('/');
      })

```

For routes that require authentication, we utilize middleware to verify the session. This is done by checking the 'session-cookie' in the request header, which was set during the authentication process.

```jsx
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionToken = req.headers.session_token as string;

  if (!sessionToken) {
    return res.status(400).send({ error: 'Session token is required' });
  }

  try {
    await client.sessions.authenticate({ session_token: sessionToken });
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

app.get('/test', authMiddleware, (req, res) => {
  res.send('You are authenticated');
});
```
