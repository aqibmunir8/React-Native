These notes explain how to implement **Dynamic Routing** in React Native using Expo Router. This allows you to create a single template (the details page) that changes its content based on which item (book) the user selects.

---

## **1. Creating a Dynamic Route**

To make a route dynamic, you use **square brackets** in the filename. This tells Expo Router that this part of the URL is a variable.

**File Structure:**

- **Path**: `app/(dashboard)/books/[id].jsx`
- **URL Result**: `/books/123`, `/books/abc`, etc.

---

## **2. Linking to the Dynamic Page**

To navigate to the details page, use the `router.push` method. You must construct the path string to include the specific ID of the item being pressed.

**File Path:** `./app/(dashboard)/books.jsx`

```jsx
import { useRouter } from "expo-router";

const Books = () => {
  const router = useRouter();
  const { books } = useBooks();

  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/books/${item.$id}`)} // Navigate with ID
        >
          {/* Card UI */}
        </Pressable>
      )}
    />
  );
};
```

---

## **3. Extracting the ID with `useLocalSearchParams`**

Once the user lands on the details page, you need to "grab" the ID from the URL so you can use it to fetch data. Expo Router provides a specific hook for this.

**File Path:** `./app/(dashboard)/books/[id].jsx`

```jsx
import { useLocalSearchParams } from "expo-router";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

const BookDetails = () => {
  // Destructure 'id' (this matches the [id].jsx filename)
  const { id } = useLocalSearchParams();

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText title={true}>Book Details</ThemedText>
      <ThemedText>Viewing Book ID: {id}</ThemedText>
    </ThemedView>
  );
};

export default BookDetails;
```

---

## **4. Hiding the Route from the Tab Bar**

By default, Expo Router might try to add your new dynamic page as a button in the bottom Tab Bar. Since a details page should only be reached by clicking a book (and not a tab), you must hide it.

**File Path:** `./app/(dashboard)/_layout.jsx`

```jsx
<Tabs>
  {/* Standard Tabs */}
  <Tabs.Screen name="books" options={{ title: "Books" }} />

  {/* Hide the Dynamic Details Route */}
  <Tabs.Screen
    name="books/[id]"
    options={{
      href: null, // Setting href to null removes it from the Tab Bar
    }}
  />
</Tabs>
```

---

## **5. Logic Flow Recap**

| **Sequence**    | **Actor**              | **Action**                                                        |
| --------------- | ---------------------- | ----------------------------------------------------------------- |
| **1. Trigger**  | User                   | Taps a book card on the list screen.                              |
| **2. Navigate** | `router.push`          | App moves to `/books/XYZ`, where XYZ is the Appwrite document ID. |
| **3. Capture**  | `useLocalSearchParams` | The details page extracts `"XYZ"` from the URL.                   |
| **4. Setup**    | UI                     | The component renders a "Safe" themed view and displays the ID.   |

### **Key Takeaway**

Dynamic routing is the foundation of "Master-Detail" interfaces. By using **`[id].jsx`**, you avoid creating 50 different files for 50 different books; instead, you create one **smart template** that knows how to identify itself.

---

---

<br>

---

---

![image.png](images/1000481249.jpg)

#### then

![image.png](images/1000481249.jpg)

#### then

![image.png](images/1000481246.gif)
