Here is your content converted into a professional, well-structured `README.md` file.

---

# 14. Global State with React Context & Custom Hooks

As an application grows, passing user data (like an email or login status) from the top-level layout down through every single page becomes messy—a problem known as **"Prop Drilling."** React Context solves this by creating a global "broadcast" of data that any component can tune into, acting as a centralized "cloud" of data that any component can tap into instantly.

---

## 1. Creating the Context

First, we create the "bucket" that will hold our user data and the functions to change it.

**File:** `./context/userContext.jsx`

### Core Concepts:

- `createContext()`: Initializes the context object.
- **UserProvider**: A component that wraps your app and "provides" the data to everything inside it.
- **children prop**: Represents all the components (pages, buttons, etc.) nested inside the provider.

```jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Initial state is null (logged out)

  const login = async (email, password) => {
    /* logic soon */
  };
  const register = async (email, password) => {
    /* logic soon */
  };
  const logout = async () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
```

---

## 2. Wrapping the App

To make this data available everywhere, we wrap our **Root Layout** with the `UserProvider`. Since every page in Expo Router goes through `_layout.jsx`, they all gain access automatically.

**File:** `./app/_layout.jsx`

```jsx
import { Stack } from "expo-router";
import { UserProvider } from "../context/userContext";

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack>
        {/* All navigation screens inside here now have access to UserContext */}
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
```

---

## 3. Creating a Custom Hook: `useUser`

Instead of manually importing `useContext` and the `UserContext` object in every single file, we create a **Custom Hook**. This is a cleaner, more professional way to access global data and includes built-in error handling.

**File:** `./hooks/useUser.js`

```javascript
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUser = () => {
  const context = useContext(UserContext);

  // Safety check: Ensure the hook is used within the Provider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
```

---

## 4. Consuming Data in Components

Now, any component—whether it's a deeply nested profile page or the login screen—can grab the user state in one line of code.

**Example in `login.jsx`:**

```jsx
import { useUser } from "../../hooks/useUser";

const Login = () => {
  // Destructure exactly what you need from the hook
  const { user, login } = useUser();

  console.log("Current User:", user); // Outputs: null (if not logged in)

  return (
    // Your UI here
  );
}
```

![Alt Text](images/image.png)

---

## 💡 Key Takeaways

- **Centralized Logic:** Authentication logic (logging in/out) stays in the context file, keeping UI components thin and focused on display.
- **Single Source of Truth:** If the user logs in, the user object updates in the context, and every page using `useUser` updates automatically.
- **The Provider Pattern:** By wrapping the root layout, you ensure that navigation and UI components stay perfectly in sync with the user's status.

---

## 🚀 Summary of Workflow

1.  **Define Context:** Create the data container using `createContext`.
2.  **Create Provider:** Manage the `useState` and return the `.Provider` component.
3.  **Create Hook:** Build a shortcut function (`useUser`) for easy access.
4.  **Inject Provider:** Wrap the root layout so every screen is "covered."
5.  **Consume:** Use the hook in individual pages to read/write global state.
