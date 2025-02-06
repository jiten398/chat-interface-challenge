# Project Documentation

This document outlines the setup instructions, architecture overview, implementation decisions, testing approach, and component documentation for the AI Chat Interface project.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Architecture Overview](#architecture-overview)
- [Implementation Decisions](#implementation-decisions)
- [Testing Approach](#testing-approach)
- [Component Documentation](#component-documentation)
- [API Documentation](#api-documentation)

---

## Setup Instructions

To set up and run the project locally, follow the instructions below:

1. **Clone Repository**

   Clone the repository to your local machine using Git.

   ```bash
   git clone https://github.com/jiten398/chat-interface-challenge


2. **Navigate to the Project Directory**

   After cloning, navigate to the project directory.

   ```bash
   cd chat-interface-challenge
   ```

3. **Install Dependencies**

   Use `npm` or `yarn` to install the necessary dependencies.

   ```bash
   npm install
   ```

4. **Start the Application**

   Start the application in development mode using the following command:

   ```bash
   npm run dev
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000).

5. **Running with Docker (Optional)**

   If you prefer using Docker, you can follow these steps to run the app inside a container.

   - Build and start the Docker container:

     ```bash
     docker-compose up
     ```

   - Access the application by navigating to [http://localhost:3000](http://localhost:3000).

---

## Architecture Overview

This project follows a modular architecture with clearly defined responsibilities for each component and service.

### Core Components

- **Chat Interface Components**
  - **ChatContainer**: This is the main wrapper for the chat interface, containing the message thread, input area, and settings panel.
  - **MessageThread**: This component displays the list of `MessageBubble` components, showing the chat history.
  - **MessageBubble**: Represents individual messages (either from the user or the AI) with text and timestamp.
  - **InputArea**: Handles the input for text and speech messages, as well as rendering quick reply suggestions.
  
- **Settings & Utilities**
  - **SettingsPanel**: This modal component allows users to adjust the theme and language preferences.
  - **ThemeToggle**: Allows users to switch between light and dark themes.
  - **LanguageSelector**: Provides language selection options.
  - **ErrorBoundary**: Catches errors and prevents the entire app from crashing.
  - **LoadingIndicator**: Displays a loading state when the app is processing data.

### State Management

- **React Context & Reducer**: 
  - State is managed through `ChatContext` and `ChatReducer`, enabling the tracking of messages, processing states, settings, and error handling.

- **Custom Hooks**: 
  - `useSpeechRecognition` hook abstracts the browser's Speech Recognition API logic, providing a simple interface for speech-to-text functionality.

### API Integration

- **Mock API**: The app interacts with a mock backend API to process messages and receive AI-generated responses.
  
- **Services Layer**: 
  - The service layer contains functions like `sendMessageToApi` to communicate with the backend API for sending and receiving messages.

---

## Implementation Decisions

Several key implementation decisions were made to ensure the maintainability, scalability, and efficiency of the project:

1. **State Management with Context and Reducers**
   - **Why**: React Context combined with a reducer is used to handle the global application state in a predictable manner. This decision ensures that the state management is centralized and easy to maintain across the app.

2. **Speech Recognition Integration**
   - **Why**: The browser’s native Speech Recognition API is used for voice input. It is fast and It integrates seamlessly into the app via a custom hook (`useSpeechRecognition`) to manage compatibility and provide visual feedback during speech recognition.

3. **Modular and Reusable Components**
   - **Why**: Each component is designed to be modular and focused on a single responsibility (e.g., `MessageBubble` for rendering messages, `InputArea` for handling input). This approach promotes reusability and easy testing.

4. **TypeScript for Type Safety**
   - **Why**: TypeScript is used throughout the project to ensure type safety and reduce runtime errors. It helps catch issues at compile time and enhances the developer experience by providing autocompletion and error checking.

5. **Error Handling and UI Feedback**
   - **Why**: An `ErrorBoundary` component is used to catch JavaScript errors anywhere in the app and display a fallback UI. Loading indicators are also used to provide feedback when the app is processing.
6. **Real API Integration (Mistral)**
   - **Why**: A real API from Mistral is integrated into the project to process messages and generate AI-based responses. This improves the app’s functionality by replacing the mock API with a real, more powerful backend that delivers more realistic and intelligent responses from the AI. The integration of Mistral ensures that the application has a more accurate and dynamic AI conversational model.
7. **UI Feature to Differentiate and Copy Code Blocks**
    - **Why**: A new UI feature was added to distinguish code blocks from regular text. This feature provides users with the ability to easily identify code snippets and copy them to the clipboard. The code blocks are styled differently from the regular text, improving the user experience when interacting with the AI-generated responses. This addition ensures that code is not only visually distinct but also functional with the copy-to-clipboard functionality, enabling easier interaction with code samples.

---

## Testing Approach

The testing approach for this project includes the following layers:

1. **Unit Tests**
   - Each individual component and hook is tested to ensure it behaves as expected. This includes testing logic inside hooks like `useSpeechRecognition` and UI rendering in components like `MessageBubble`.

2. **Integration Tests**
   - Integration tests ensure that multiple components work together as expected. For example, when a user sends a message, it should be displayed in the `MessageThread` component after being processed by the backend API.

3. **Accessibility Testing**
   - The app is tested for accessibility using tools like Axe or Lighthouse to ensure proper ARIA roles and keyboard navigation. Ensuring that the app is usable by all users is a priority.

4. **End-to-End Testing (Optional)**
   - Future improvements may include E2E tests using tools like Cypress to simulate full user interactions and validate the entire chat flow from message input to AI response.

5. **Testing Guidelines**
   - Tests should be written using [Jest](https://jestjs.io/) for unit and integration tests and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for rendering and interaction tests.

---

## Component Documentation

Here is a list of the key components used in this project and their responsibilities:

- **ChatContainer**: The main wrapper that contains the entire chat interface, including the message thread, input area, and settings panel.
- **MessageThread**: Displays a list of `MessageBubble` components, rendering both user and AI messages.
- **MessageBubble**: A single message component that displays the message content, timestamp, and message type (user or AI).
- **InputArea**: Contains the input field for text, a button to start speech recognition, and the quick reply suggestions.
- **SettingsPanel**: A modal dialog where users can change settings such as theme and language.
- **ThemeToggle**: A toggle button that switches between light and dark themes.
- **LanguageSelector**: A dropdown for selecting the chat language.
- **ErrorBoundary**: Catches JavaScript errors in child components and displays a fallback UI.
- **LoadingIndicator**: Displays a loading spinner while the app is processing data or waiting for API responses.

---

## API Documentation

### `sendMessageToApi`

**Purpose**:  
Sends a message to the API and retrieves an AI-generated response.

**Request Interface**:

```typescript
interface ApiRequest {
  content: string;
  source: "text" | "speech";
}
```

**Response Interface**:

```typescript
interface ApiResponse {
  id: string;
  content: string;
  timestamp: string;
  type: "ai";
}
```

**Usage**:
- The `sendMessageToApi` function sends a POST request to the API with the user's message and the source type (either "text" or "speech").
- The response is expected to be an AI-generated message with an ID, timestamp, and content.

---

This documentation serves as a comprehensive guide for setting up, understanding, and extending the AI Chat Interface project. If you have any questions or need further clarification, feel free to reach out!

---

