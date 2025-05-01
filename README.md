# ExplainAI

ExplainAI is a chat application that leverages Google's Gemini AI to provide intelligent responses to user queries. Use it to explain documents, images, social media posts, culture refrences, and more.

The application consists of a React frontend and a Hono-based API server running on Bun.

All api endpoints are documented in the OpenAPI spec, located in src/server/spec.yaml

## Project Overview

ExplainAI allows users to:
- Create new chat conversations
- Send messages to the AI
- Receive streaming responses in real-time
- View chat history and previous conversations

The application uses a client-server architecture:
- **Client**: React application built with Vite, TypeScript, and Tailwind CSS
- **Server**: Hono-based API server running on Bun
    - Includes an OPENAPI spec file in the src/server directory
    - Rate limiting is not yet implemented.
- Database: Postgresql database with Users, Chats, and Messages tables.
    - Considering migrating to JSONB for most data

**NOTE**: this is still in the development phase. The backend only contains basic security implementations. This should not be used publicly.

# Currently implemented features:
- GoogleAI client library integration
    - Considering replacing with OpenAI SDK, since they offer gemini along with other models
    - There's a branch with context cache implementation, but it's not finished nor integrated for testing
    - No rate limiting implemented. Use at your own risk or implement your own for now.
- Postgres database for backend
    - Not included in this repository. I've begun working on a docker file to automatically set it up along with the server to be added to the repo.
    - Uses a Users -> Chats -> Messages relationship with respective foreign keys.
- OpenAPI specification
    - Contains all current API endpoints to date. Located in src/server/spec.yaml
    - Only includes documentation for 200 status responses.
- Backend API
    - Up to date with spec. Authenticates every call. Applies session cookies to requests missing them, linking the browser to the database for chat history/user data
    - Includes written cors for local testing
    - Streams responses ai responses for reduced latency
- Frontend
    - Handles calls to the backend
    - Incrementally streams responses word-by-word at a fixed speed

- - -   

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/) runtime (optional)
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash  
   git clone https://github.com/yourusername/explainai.git   cd explainai   ```  
2. Set up environment variables:
    - Create a `.env` file in the root directory
    - Create a `.env` file in the `src/server` directory with your Google Gemini API key

3. Install dependencies:  
   The root package.json makes use of [bun workspaces](https://bun.sh/docs/install/workspaces) to manage the client and server directories.

   ```bash  
   # Install all dependencies at once  
   bun install  
   ```  
## Development

### Running Both Client and Server

```bash  
# Run both client and server concurrently  
bun run dev  
```  

### Client

```bash  
# Navigate to client directory  
cd src/client  
  
# Start development server  
npm run dev  
```  

The client will be available at http://localhost:5173

### Server

```bash  
# Navigate to server directory  
cd src/server  
  
# Start development server with hot reloading  
bun run dev  
```  

The server will be available at http://localhost:3000

## Building for Production

### Client

```bash  
# Navigate to client directory  
cd src/client  
  
# Build for production  
bun run build  
```  

The build output will be in the `src/client/dist` directory.

### Server

The server can be started in production mode using:

```bash  
# Navigate to server directory  
cd src/server  
  
# Start server  
bun run src/index.ts  
```  

## Testing Information

### Testing

The client uses Buns' test runner and React Testing Library for testing.

```bash  
  
# Run tests once  
bun test  
  
# Run tests in watch mode  
npm run test:watch  
```  
## Project Structure

```  
explainai/  
├── src/  
│   ├── client/             # React frontend  
│   │   ├── src/            # Source code  
│   │   ├── public/         # Static assets  
│   │   └── ...  
│   └── server/             # Hono API server  
│       ├── src/            # Source code  
│       │   ├── auth/       # Authentication  
│       │   ├── database/   # Database queries  
│       │   ├── gemini/     # Gemini AI integration  
│       │   ├── types/      # TypeScript types  
│       │   └── __tests__/  # Tests  
│       └── ...  
└── ...  
```  

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Bun runtime, testing, and bundling (Node alternative for speed)
- Hono web framework  (modern Express alternative)
- Google Gemini AI

## Additional Development Information
### Code Style

- Use TypeScript for all code
- Follow ESLint rules for code style
- Use functional components with hooks for React
- Use async/await for asynchronous code
- Keep components small and focused on a single responsibility
- Use proper typing for all variables and functions  