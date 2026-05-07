This final section covers the implementation of **Document Deletion** in Appwrite and synchronizing that change with your UI using **Real-time Subscriptions**. This ensures that when a book is deleted, it is instantly removed from the global list without a page refresh.

---

## **1. Implementing `deleteBook` in Context**

The `databases.deleteDocument` method permanently removes a record from your collection.

**File Path:** `./contexts/BooksContext.jsx`

```jsx
// ... inside BooksProvider
async function deleteBook(id) {
  try {
    await databases.deleteDocument(
      databaseId,
      collectionId,
      id, // The unique ID of the book to remove
    );
  } catch (error) {
    console.log("Delete Error:", error.message);
    throw error;
  }
}
```

---

## **2. Adding the Delete UI**

On the details page, we add a button to trigger the deletion. We use a standard `Text` component inside the button to keep the text white regardless of the theme.

**File Path:** `./app/(dashboard)/books/[id].jsx`

```jsx
const { deleteBook } = useBooks();
const router = useRouter();

const handleDelete = async () => {
  try {
    await deleteBook(id); // 1. Delete from Appwrite
    setBook(null); // 2. Clear local detail state
    router.replace("/books"); // 3. Redirect to the list
  } catch (err) {
    console.log(err);
  }
};

// ... inside the template
<ThemedButton onPress={handleDelete} style={styles.deleteBtn}>
  <Text style={{ color: "#fff", textAlign: "center" }}>Delete Book</Text>
</ThemedButton>;
```

---

## **3. Syncing the UI with Real-time "Delete" Events**

When a book is deleted from the database, the global `books` array in your context becomes "stale" (it still contains the deleted book). We update our existing real-time listener to handle `delete` events.

**File Path:** `./contexts/BooksContext.jsx`

- **`payload`**: In a delete event, the payload contains the data of the document that was just removed.
- **`.filter()`**: We use this to return a new array that excludes the book matching the deleted ID.

```jsx
// ... inside the subscribe callback in useEffect
unsubscribe = client.subscribe(channel, (response) => {
  const { payload, events } = response;

  if (events[0].includes("create")) {
    setBooks((prev) => [...prev, payload]);
  }

  if (events[0].includes("delete")) {
    setBooks((prevBooks) => {
      // Filter out the book that matches the ID of the deleted payload
      return prevBooks.filter((book) => book.$id !== payload.$id);
    });
  }
});
```

---

## **4. Styling the Delete Button**

Typically, delete buttons are styled with a "Warning" or "Danger" color to alert the user of a destructive action.

**File Path:** `./app/(dashboard)/books/[id].jsx`

```jsx
const styles = StyleSheet.create({
  // ...
  deleteBtn: {
    marginTop: 40,
    backgroundColor: Colors.warning, // The red/pink danger color
    width: 200,
    alignSelf: "center",
  },
});
```

---

## **5. Logic Flow Recap**

| **Sequence**      | **Actor**       | **Action**                                                                    |
| ----------------- | --------------- | ----------------------------------------------------------------------------- |
| **1. Trigger**    | User            | Clicks "Delete Book" on the Details page.                                     |
| **2. API Call**   | `BooksContext`  | `deleteDocument` removes the record from Appwrite.                            |
| **3. Broadcast**  | Appwrite Server | Server notifies all active listeners that a `delete` event occurred.          |
| **4. Filter**     | `BooksContext`  | The real-time listener runs `.filter()` to remove the book from global state. |
| **5. Navigation** | `[id].jsx`      | The user is redirected back to the `/books` list.                             |
| **6. Sync**       | UI              | The list re-renders instantly without the deleted book.                       |

### **Key Takeaway**

The combination of **Route Guards**, **Themed Components**, and **Real-time Subscriptions** creates a "Native" feel. By handling the `delete` event within the context's filter logic, you ensure that even if the user navigates back to the list manually, the data is already up to date.
