# ChatApp: Real-Time Chat Application

## Introduction

ChatApp is a real-time chat application built with [React](https://reactjs.org/), [Node.js](https://nodejs.org/), and [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) technology. It features user authentication, one-on-one messaging, and group chats.

## Features

- **User Authentication**: Secure login and registration system.
- **Real-Time Messaging**: Instantly send and receive messages using WebSockets.
- **Group Chats**: Create group chats with multiple users.
- **Message Persistence**: Messages are stored and retrieved from a database.
- **Token Refresh**: Secure handling of authentication tokens with refresh capability.
- **Responsive Design**: Compatible with desktop and mobile devices.

## Technology Stack

- **Frontend**: React, and Tailwind for styling.
- **Backend**: Node.js with Express, WebSocket for real-time communication, and MongoDB as the database.
- **Authentication**: JWT for secure token-based authentication.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/your-username/chatapp.git
   ```

2. Install dependencies for the server:
   ```bash
   cd chatapp
   npm install
   ```
3. Install dependencies for the client:
   ```bash
    cd client
    npm install
   ```
4.

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Server
    participant DB

    Note over User,Client: User Registration
    User->>Client: Fill out registration form
    Client->>Server: Send registration data
    Server->>DB: Store user data
    DB-->>Server: Confirm save
    Server-->>Client: Registration response
    Client-->>User: Display response

    Note over User,Client: User Login
    User->>Client: Enter credentials
    Client->>Server: Send login credentials
    Server->>DB: Validate credentials
    DB-->>Server: Validation result
    alt Credentials valid
        Server->>Server: Generate Access & Refresh Token
        Server-->>Client: Tokens
        Client-->>User: Display login success
        Note over Client,Server: Establish WebSocket Connection
        Client->>Server: WebSocket request with Access Token
        Server->>Server: Validate Access Token
        alt Access Token valid
            Server-->>Client: WebSocket connection established
            Client-->>User: Connection established
        else Access Token invalid/expired
            Client->>Server: Request new Access Token using Refresh Token
            alt Refresh Token valid
                Server->>Server: Generate new Access Token
                Server-->>Client: New Access Token
                Client->>Server: Retry WebSocket connection
            else Refresh Token invalid/expired
                Server-->>Client: Authentication error
                Client-->>User: Prompt re-login
            end
        end
    else Credentials invalid
        Server-->>Client: Error message
        Client-->>User: Display error
    end

    Note over User,Client: Logout/Disconnection
    User->>Client: Logout/Disconnect
    Client->>Server: Close connection request
    Server-->>Client: Confirm disconnection
    Client->>User: Logout success
    Client->>Server: Invalidate Refresh Token

```
