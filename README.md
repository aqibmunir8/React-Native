These notes cover the implementation of **Route Guards**—a pattern used to protect specific screens from unauthorized access. By creating two reusable wrapper components, `<UserOnly>` and `<GuestOnly>`, you can control exactly who sees what.

---

## **1. Protecting Routes with `<UserOnly>`**

This component ensures that only logged-in users can see its children. If a user is not logged in, they are redirected to the login page.

**File Path:** `./components/auth/UserOnly.jsx`

- **`useRouter`**: Used to perform the redirection.
- **`replace`**: Unlike `push`, this replaces the current history entry so the user can't click "back" to a protected page after being kicked out.
- **Logic**: We only redirect if `authChecked` is **true** and `user` is **null**.

```jsx
import { useEffect } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If we've finished the check and there is no user, redirect to login
    if (authChecked && user === null) {
      router.replace("/login");
    }
  }, [user, authChecked]);

  // Show a loading state while checking OR if user is null (preventing flicker)
  if (!authChecked || !user) {
    return <Text>Loading...</Text>;
  }

  return children;
};

export default UserOnly;
```

---

## **2. Restricting Routes with `<GuestOnly>`**

This is the opposite logic. If a user is **already logged in**, they shouldn't be able to see the Login or Register pages.

**File Path:** `./components/auth/GuestOnly.jsx`

```jsx
const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If there IS a user, send them to the dashboard/profile
    if (authChecked && user) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  // Hide the Login/Register form while the check is happening or if user is found
  if (!authChecked || user) {
    return <Text>Loading...</Text>;
  }

  return children;
};
```

---

## **3. Applying Guards to Layouts**

Instead of wrapping every single screen, you wrap the **Layout** files of your route groups. This automatically protects every page within that group.

### **Protecting the Dashboard**

**File Path:** `./app/(dashboard)/_layout.jsx`

```jsx
import UserOnly from "../../components/auth/UserOnly";
import { Tabs } from "expo-router";

export default function DashboardLayout() {
  return (
    <UserOnly>
      <Tabs screenOptions={{ headerShown: false }}>{/* Tab screens... */}</Tabs>
    </UserOnly>
  );
}
```

### **Restricting the Auth Group**

**File Path:** `./app/(auth)/_layout.jsx`

```jsx
import GuestOnly from "../../components/auth/GuestOnly";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Login/Register screens... */}
      </Stack>
    </GuestOnly>
  );
}
```

---

## **4. The "Loading" Screen Fix**

When the app first opens, `user` is null. Without the `authChecked` flag and the `if` checks, the app would redirect a logged-in user to the Login page for a split second before the Appwrite session is confirmed.

- **`authChecked == false`**: We show a "Loading" placeholder.
- **`authChecked == true`**: We know for certain if the user is a guest or authenticated.

---

## **5. Logic Comparison**

| Component         | Target Group      | Redirect Trigger           | Target Destination |
| ----------------- | ----------------- | -------------------------- | ------------------ |
| **`<UserOnly>`**  | Logged-in Users   | `!user` (No session found) | `/login`           |
| **`<GuestOnly>`** | Logged-out Guests | `user` (Session exists)    | `/profile`         |

### **Key Takeaway**

By using `router.replace()`, you create a much cleaner UX. If a user logs out while on the Profile page, the `useEffect` in `<UserOnly>` detects the `user` state changing to `null` and instantly boots them back to the login screen.
