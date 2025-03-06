# Technical Specification

## System Overview
This project is a React-based application designed to provide a color assistant feature. It allows users to interact with a chat interface to get color suggestions and manage a color palette. The system comprises frontend components, state management via React Context API, SCSS for styling, and utility functions for color manipulation and text adjustment. Local storage is used for persisting user settings.

### Main Components and Their Roles
- **Frontend Components:** React components such as `App.jsx`, `ChatModal.jsx`, `ChatSettingsModal.jsx`, and `ColorItem.jsx`.
- **State Management:** `AppContext.jsx` for global state management.
- **Styling:** SCSS modules for component-specific styles.
- **Utilities:** Custom functions for color manipulation (`ntc.js`, `adjustTextColor.js`) and text adjustment.
- **Local Storage:** Used for persisting user settings.
- **External Services:** `ChatService.js` for processing chat messages using rule-based logic or an external Large Language Model (LLM).

## Core Functionality
### Primary Features and Their Implementation
1. **Color Assistant Chat Interface (`ChatModal.jsx`)**
   - **Purpose:** Manages the chat interface for color suggestions.
   - **Core Functions:**
     - `handleSendMessage`: Processes user messages and updates the chat history.
     - `handleAddColors` and `handleRemoveColors`: Manage color selection and palette updates.
   - **Dependencies:** `useAppContext` for global state, `ChatService` for message processing.

2. **Color Palette Management (`Colors.jsx`, `ColorItem.jsx`)**
   - **Purpose:** Displays and manages the color palette.
   - **Core Functions:**
     - `reorder`: Handles drag-and-drop reordering of colors.
     - `initializeColors`: Initializes colors from URL, cookies, or random palettes.
   - **Dependencies:** `useAppContext` for global state, `react-beautiful-dnd` for drag-and-drop functionality.

3. **Settings Management (`ChatSettingsModal.jsx`)**
   - **Purpose:** Allows users to configure LLM usage and API settings.
   - **Core Functions:**
     - Manages local state and loading settings from local storage.
     - Handles saving settings to both global state and local storage.
   - **Dependencies:** `useAppContext` for global state, local storage for persisting settings.

4. **Color Picker (`ColorPicker.jsx`)**
   - **Purpose:** Provides a color picker interface.
   - **Core Functions:**
     - `commitColorChange`: Updates the global state with the new color.
   - **Dependencies:** `useAppContext` for global state, `react-color`'s `ChromePicker`.

5. **Share Modal (`ShareModal.jsx`)**
   - **Purpose:** Allows users to share their color palettes.
   - **Core Functions:**
     - Constructs the share URL by mapping color values and joining them.
   - **Dependencies:** `useAppContext` for global state, `getConfig` for environment-specific URLs.

### Complex Algorithms and Business Logic
- **Color Name Matching (`ntc.js`)**
  - **Function:** `ntc.name(color)`
  - **Purpose:** Matches input colors to the closest predefined color name.
  - **Complexity:** Converts input color to RGB and HSL, compares against a list of predefined colors using a distance formula.

- **New Color Calculation (`calculateNewColor.js`)**
  - **Function:** `default(colors, index)`
  - **Purpose:** Calculates a new color based on the provided array of colors and an index.
  - **Complexity:** Converts hex colors to RGB, averages RGB values, shifts colors by a random amount.

## Architecture
### Data Flow and Component Interaction
1. **Initialization:**
   - The `App.jsx` component initializes the application state by loading cookies and setting the initial state. It renders the `Header` and `Colors` components.
   - `AppContext.jsx` manages the global state, including `colors`, `palettes`, `chatHistory`, and settings.

2. **User Interaction:**
   - Users interact with the `ChatModal.jsx` to send messages and receive color suggestions.
   - The `ChatService.js` processes these messages using either rule-based logic or an external LLM.

3. **State Updates:**
   - State changes are managed via `useAppContext`, which provides a centralized way to update and access the global state.
   - Local storage is used to persist settings across sessions.

4. **Rendering and Display:**
   - Components like `Colors.jsx` and `ColorItem.jsx` display the color palette and allow for drag-and-drop reordering.
   - The `ShareModal.jsx` component allows users to generate and share URLs for their color palettes.

5. **Styling:**
   - SCSS modules provide component-specific styles, ensuring a consistent and visually appealing UI.

### End-to-End Data Flow
- **Input:** User interactions (chat messages, color selections).
- **Processing:** 
  - `ChatService.js` processes chat messages.
  - Utility functions (`ntc.js`, `calculateNewColor.js`) handle color manipulations.
- **State Management:** `AppContext.jsx` manages and updates the global state.
- **Output:** Updated UI components reflecting the current state (color palette, chat history, settings).