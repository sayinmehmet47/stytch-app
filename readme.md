Vite + React + TypeScript Application
This application is a simple authentication system built with Vite, React, and TypeScript on the client side, and Express.js on the server side. It uses the Stytch library for user authentication.

Client
The client is a single-page application that includes three routes:

/: The home page, which includes a button to test authentication.
/login: The login page, where users can enter their email to receive a magic link for authentication.
/authenticate: The authentication page, which is accessed through the magic link sent to the user's email.
The client uses Axios for HTTP requests and universal-cookie for managing cookies.

Server
The server is an Express.js application that includes the following endpoints:

GET /: Returns a "Hello, world!" message.
POST /login: Accepts an email address and sends a magic link to that email for authentication.
POST /authenticate: Accepts a login token and returns a session token.
The server uses the Stytch library for sending magic links and authenticating users.

Running the Application
To run the client, navigate to the client directory and run npm run dev. This will start the Vite development server on port 3000.

To run the server, navigate to the server directory and run npm run dev. This will start the Express.js server on port 5000.

Building the Application
To build the client for production, navigate to the client directory and run npm run build. This will compile the TypeScript code and bundle the application with Vite.

The server does not need to be built; it can be run directly with Node.js.

Linting
Both the client and server include ESLint for linting. To run the linter, use the npm run lint command in the respective directory.

Dependencies
The client's main dependencies are React, TypeScript, Vite, Axios, and universal-cookie. The server's main dependencies are Express.js, Stytch, and cors.

Note
This application is a simple demonstration of user authentication with Stytch. It is not intended for production use without further development and security considerations.
