## Project Structure

ExplainAI is a client-server application:
- **Client**: React application built with Vite and TypeScript
- **Server**: Hono-based API server running on Bun

## Build/Configuration Instructions
The root package.json makes use of [bun workspaces](https://bun.sh/docs/install/workspaces) to manage the client and server directories.

#### Setup

```bash
bun install
```
This will install both the client and server dependencies.

#### Development

```bash
bun run dev
```
Uses the workspace configuration to run the client and server concurrently.

### Server

The server is a Hono-based API server running on Bun.