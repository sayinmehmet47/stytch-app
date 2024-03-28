# How authentication works

- Initially, we send the email address to the backend. The backend then sends a request to Stytch, which in turn sends an email to our mailbox.

```jsx
axios.post('<http://localhost:5000/login>', { email }).then((response) => {
  console.log(response);
});

app.post('/login', async (req, res) => {
  const { email } = req.body;

  const params = {
    email,
    login_magic_link_url: '<http://localhost:3000/authenticate>',
    signup_magic_link_url: '<http://localhost:3000/authenticate>',
  };
  try {
    const response = await client.magicLinks.email.loginOrCreate(params);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});
```

- Next, we authenticate with the token we received and send a request with that token. This returns a sessionToken.

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

- We then set the token in the header. For each request that needs to be authenticated, we set the session-cookie in the header.

```jsx
useEffect(() => {
    axios
      .post('<http://localhost:5000/authenticate>', {
        login_token: token,
      })
      .then((response) => {
        cookie.set('sessionToken', response.data.session_token);
        navigate('/');
      })

```

- In a route that requires authentication, we check it using middleware and that cookie.
