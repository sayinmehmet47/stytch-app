import express, { NextFunction, Response, Request } from 'express';
import stytch from 'stytch';

var cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const client = new stytch.Client({
  project_id: 'project-test-2901c788-fc6d-435a-9d0c-c13444601c89',
  secret: 'secret-test-UD3Y4GPVAt9e0QIGaZsyYJLjFjWc7hCMiRg=',
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
