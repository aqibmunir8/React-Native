These notes outline the setup of a **Books Context** to manage the global state for your reading list. Like the user context, this follows the **Provider Pattern**, making book data available throughout the entire application.

---

## **1. Creating the Books Context**

This file houses the state (an array of books) and the logic (CRUD operations) for interacting with Appwrite.

**File Path:** `./contexts/BooksContext.jsx`

- **`databaseId` & `collectionId`**: These are constants copied from your Appwrite Console. You must provide these to every Appwrite database method so it knows which "table" to use.
- **Initial State**: We use an empty array `[]` as the default value for books.

```jsx
import { createContext, useState } from "react";

// Replace with your actual IDs from Appwrite Console
const databaseId = "YOUR_DATABASE_ID";
const collectionId = "YOUR_COLLECTION_ID";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  // --- Placeholder Functions (Logic added in future lessons) ---
  async function fetchBooks() {
    try {
      /* Appwrite logic here */
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchBookById(id) {
    try {
      /* Appwrite logic here */
    } catch (err) {
      console.log(err);
    }
  }

  async function createBook(bookData) {
    try {
      /* Appwrite logic here */
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteBook(id) {
    try {
      /* Appwrite logic here */
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
```

---

## **2. Nesting Providers in the Root Layout**

Order matters when nesting Context Providers. Since the `BooksProvider` will eventually need to know which user is logged in (to filter books by `userId`), it must be placed **inside** the `UserProvider`.

**File Path:** `./app/_layout.jsx`

```jsx
import { UserProvider } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <BooksProvider>
        {/* Everything inside here can access BOTH User and Books data */}
        <Stack />
      </BooksProvider>
    </UserProvider>
  );
}
```

---

## **3. The Custom Hook: `useBooks`**

This hook makes consuming book data easy and prevents errors if the hook is accidentally used outside of a Provider.

**File Path:** `./hooks/useBooks.js`

```jsx
import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }

  return context;
}
```

---

## **4. CRUD Logic Overview**

| **Function**        | **Purpose**                          | **Input Required**                                  |
| ------------------- | ------------------------------------ | --------------------------------------------------- |
| **`fetchBooks`**    | Gets all books for the current user. | None (Uses global `userId`).                        |
| **`fetchBookById`** | Gets details for a single book.      | The unique `ID` of the document.                    |
| **`createBook`**    | Saves a new book record to Appwrite. | An object `{ title, author, description, userId }`. |
| **`deleteBook`**    | Removes a book from the database.    | The unique `ID` of the document.                    |

---

## **5. Logic Flow Recap**

| **Step**          | **Location**                | **Action**                                                           |
| ----------------- | --------------------------- | -------------------------------------------------------------------- |
| **1. Initialize** | `BooksContext.jsx`          | Define state and export the Provider.                                |
| **2. Provide**    | `_layout.jsx`               | Wrap the app in `BooksProvider` so state is globally accessible.     |
| **3. Access**     | `useBooks.js`               | Create a shortcut hook to tap into the "Books stream."               |
| **4. Implement**  | Screens (e.g., `Books.jsx`) | Use the `useBooks` hook to call `fetchBooks()` and display the data. |

### **Key Takeaway**

By nesting `BooksProvider` inside `UserProvider`, you create a **dependency chain**. This allows your book-fetching logic to automatically "see" the logged-in user's ID from the sibling context, ensuring that a user only ever sees their own library.
