These notes cover the implementation of **Fetching Documents** from Appwrite. This includes using the `listDocuments` method, applying **Queries** to filter data by the logged-in user, and using the `useEffect` hook to keep the global state in sync with the user's authentication status.

---

## **1. Implementing `fetchBooks` in Context**

To retrieve documents, we use the `databases.listDocuments` method. While Appwrite’s document-level permissions protect the data, adding a client-side **Query** is best practice for retrieving only the relevant subset of records.

**File Path:** `./contexts/BooksContext.jsx`

- **`Query.equal`**: Filters the collection. We tell Appwrite: "Only give me documents where the `userId` field matches the current `user.$id`."
- **`response.documents`**: Appwrite returns an object containing metadata; the actual array of records is stored in the `.documents` property.

```jsx
import { Query } from "react-native-appwrite";
import { databases } from "../lib/appwrite";

// ... inside BooksProvider
async function fetchBooks() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [
      // Only fetch books belonging to the current user
      Query.equal("userId", user.$id),
    ]);

    // Update global state with the fetched array
    setBooks(response.documents);
    console.log("Fetched Books:", response.documents);
  } catch (error) {
    console.log("Fetch Books Error:", error.message);
  }
}
```

---

## **2. Syncing Books with the User Lifecycle**

We don't want to call `fetchBooks` manually every time. Instead, we use a `useEffect` hook within the provider to automatically manage the data based on the `user` state.

**File Path:** `./contexts/BooksContext.jsx`

- **Dependency Array `[user]`**: This hook triggers whenever the user logs in or logs out.
- **Cleanup**: When a user logs out (`user == null`), we manually reset the `books` state to an empty array to ensure no data from the previous session lingers in memory.

```jsx
useEffect(() => {
  if (user) {
    // User logged in: Fetch their library
    fetchBooks();
  } else {
    // User logged out: Wipe the local library state
    setBooks([]);
  }
}, [user]); // Re-run whenever auth status changes
```

---

## **3. Understanding the Query Logic**

The `Query` class provides several methods (equal, notEqual, lessThan, etc.). Using `Query.equal` ensures that the network response only contains the data needed for the current screen, reducing data usage and processing time.

| Argument           | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| **`databaseId`**   | Tells Appwrite which database to look in.            |
| **`collectionId`** | Tells Appwrite which "table" (books) to access.      |
| **`[Queries]`**    | An optional array to filter, sort, or limit results. |

---

## **4. Verification Strategy**

Since the UI isn't listing the books yet, you can verify the fetch is working by checking the **Debug Console**:

1. **Login**: You should see an array of objects logged to the console.
2. **Object Structure**: Each object should contain `$id`, `title`, `author`, `description`, and `userId`.
3. **Logout**: The `useEffect` will trigger the `else` block, clearing the state.

---

## **5. Logic Flow Recap**

| Sequence            | Location           | Action                                                          |
| ------------------- | ------------------ | --------------------------------------------------------------- |
| **1. App Load**     | `BooksContext.jsx` | `useEffect` detects a `user` exists (if session is persistent). |
| **2. Request**      | `BooksContext.jsx` | `fetchBooks()` calls `listDocuments` with a `userId` filter.    |
| **3. Database**     | Appwrite Server    | Filters documents and checks permissions.                       |
| **4. State Update** | `BooksContext.jsx` | `setBooks` updates the global array with the results.           |
| **5. Session End**  | `BooksContext.jsx` | User logs out; `useEffect` wipes the `books` array.             |

### **Key Takeaway**

Nesting the data-fetching logic within a `useEffect` that listens to the `user` state creates a **Reactive Data Stream**. Your UI will automatically populate with the correct books the moment the user is authenticated, without needing extra code in your screen components.

---

---

```jsx
 // ..CoDe

const DATABASE_ID = "67cdd007459723"
const COLLECTION_ID = "67cd00307157221e"

export const BooksContext = createContext()

export function BooksProvider({children}) {
  const [books, setBooks] = useState([])
  const { user } = useUser()

  async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal('userId', user.$id)
        ]
      )

      setBooks(response.documents)
      console.log(response.documents)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function fetchBookById(id) {
   // ..CoDe
  }

  async function createBook(data) {
   // ..CoDe
  }

  async function deleteBook(id) {
   // ..CoDe
  }

  useEffect(() => {

    if (user) {
      ***fetchBooks***()
    } else {
      setBooks([])
    }

  }, [user])

  return (
      // ..CoDe
}
```

![image.png](<images/image%20(4).png>)
