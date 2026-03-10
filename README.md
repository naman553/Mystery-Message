# Mystery Message

**Mystery Message** is a web application built using Next.js and TypeScript that allows users to send messages anonymously to other users.

## Features

- Send messages anonymously.
- User authentication and authorization.
- Built with Next.js, TypeScript, and MongoDB for the database.

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Next.js API routes, MongoDB
- **Authentication**: NextAuth.js
- **Other Dependencies**: Axios, bcryptjs, React Hook Form, Zod, OpenAI

## Installation

1. __Clone the repository:__
   ```bash
   git clone https://github.com/dhruv-jani/MysteryMessage.git

2. __Install dependencies:__
    ```bash
    npm install
    ```

3. __Create a .env file in the root directory and add the following environment variables:__

    **MONGODB_URI**: Your MongoDB connection string.   
    **RESEND_API_KEY**: API key for sending emails using Resend.
    **NEXTAUTH_SECRET**: A secret key used by NextAuth.js for signing and encryption.  
    **OPENAI_API_KEY**: Your OpenAI API key for integrating AI functionalities.

## .env File

The following environment variables need to be set in your `.env` file:

```env
MONGODB_URI=<your-mongodb-uri>
RESEND_API_KEY=<your-resend-api-key>
NEXTAUTH_SECRET=<your-nextauth-secret>
OPENAI_API_KEY=<your-openai-api-key>
```
    
## Run the development server:
    npm run dev
