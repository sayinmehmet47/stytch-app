- First we send the mail address to backend and in backend it send a mail to stytch. and stytch send us mail to our mailbox

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

- we set the token in header .then in each our request that need to be authenticate we set the session-cookie in the header

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

in a root need to be auth we check it on middleware using that cookie

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
