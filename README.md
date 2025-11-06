# ⚡ Pokémon Browser Module

> A modern, modular, and professional React implementation for browsing Pokémon using the [PokéAPI](https://pokeapi.co).
> Includes Pagination, Infinite Scroll, and Pokémon Detail views — built with **React 19**, **Tailwind CSS**, and **React Query**.

---

## 🧩 Overview

The **Pokémon Browser Module** provides a complete browsing experience:

* Switch between **Pagination** and **Infinite Scroll** modes.
* View detailed Pokémon information with stats, abilities, and images.
* Built with clean, reusable, and scalable architecture.

---

## 🗂️ Folder Structure

```
src/
├── api/
│   └── pokemon.ts
│
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Loader.tsx
│   │   └── Skeleton.tsx
│   │
│   └── pokemon/
│       ├── PokemonCard.tsx
│       ├── PokemonStats.tsx
│       ├── PokemonPaginationView.tsx
│       ├── PokemonLoadMoreView.tsx
│       └── PokemonDetail.tsx
│
└── pages/
    └── Browser.tsx
```

---

## ⚙️ Core Components

### **1. Browser**

Controls the overall browsing experience.
Users can toggle between **Pagination** and **Infinite Scroll** modes.

```tsx
{mode === "pagination" ? <PaginationView /> : <LoadMoreView />}
```

**Features**

* Lazy-loaded subviews.
* ErrorBoundary for crash protection.
* Clean responsive layout with Tailwind CSS.

---

### **2. PokemonPaginationView**

Displays Pokémon in a **paginated layout**.

| Feature    | Description                   |
| ---------- | ----------------------------- |
| Data Hook  | `usePokemonPage(page, limit)` |
| Pagination | “Next” and “Previous” buttons |
| State      | Caches data using React Query |

---

### **3. PokemonLoadMoreView**

Implements **infinite scroll / load more** behavior.

```tsx
if (data?.results.length) {
  setAllData((prev) => [...prev, ...data.results]);
  setHasMore(!!data.next);
}
```

| State     | Description                |
| --------- | -------------------------- |
| `allData` | Combined list of Pokémon   |
| `page`    | Current page index         |
| `hasMore` | Whether more results exist |

---

### **4. PokemonDetail**

Detailed profile page for a single Pokémon.

**Displays:**

* Name, ID, Image, and Types
* Height and Weight
* Base Stats (animated progress bars)
* Abilities and XP

**Includes:**

* Back navigation
* Error & loading handling
* Responsive layout

---

## 🧰 Shared Components

### **PokemonCard**

Reusable Pokémon card for grids and lists.

```tsx
<PokemonCard
  id={25}
  name="pikachu"
  imageUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
/>
```

---

### **PokemonStats**

Animated stat bars with friendly labels.

| Stat              | Example Label |
| ----------------- | ------------- |
| `special-attack`  | Sp. Attack    |
| `special-defense` | Sp. Defense   |

---

### **Loader**

Reusable and accessible spinner.

```tsx
<Loader size={60} color="border-yellow-400" />
```

| Prop    | Type     | Default               | Description                 |
| ------- | -------- | --------------------- | --------------------------- |
| `size`  | `number` | `48`                  | Spinner size in pixels      |
| `color` | `string` | `"border-yellow-400"` | Tailwind border color class |

---

### **ErrorBoundary**

Catches UI errors and shows fallback content.

```tsx
<ErrorBoundary fallback={<div>Something went wrong.</div>}>
  <PokemonDetail />
</ErrorBoundary>
```

---

## 🧠 API Hooks

### **usePokemonPage(page, limit)**

Fetches a paginated Pokémon list.

```
GET /pokemon?limit={limit}&offset={(page - 1) * limit}
```

### **usePokemonDetails(id)**

Fetches detailed Pokémon information.

```
GET /pokemon/{id}
```

Configured via:

```ts
const API_BASE = import.meta.env.VITE_POKEMON_API;
```

---

## 🚦 Application States

| State          | Handled By        | Description                     |
| -------------- | ----------------- | ------------------------------- |
| **Loading**    | Loader / Skeleton | Shows spinner or placeholder UI |
| **Error**      | ErrorBoundary     | Displays retry or back link     |
| **Success**    | View components   | Renders fetched data            |
| **Empty Data** | Conditional       | Displays fallback text          |

---

## 🧱 Design System

| Element            | Description                                        |
| ------------------ | -------------------------------------------------- |
| **Colors**         | Gradient themes (pink → purple, yellow highlights) |
| **Buttons**        | Rounded corners, shadows, hover transitions        |
| **Typography**     | Clean, accessible sans-serif                       |
| **Animations**     | Smooth transitions, spinner rotations              |
| **Responsiveness** | Grid layout scales across devices                  |

---

## 🧩 Reusability

| Component       | Reusable In                      |
| --------------- | -------------------------------- |
| `Loader`        | Any async data-fetching view     |
| `ErrorBoundary` | Global wrappers                  |
| `PokemonCard`   | Lists, favorites, search results |
| `PokemonStats`  | Comparisons, dashboards          |
| `Browser`       | Template for switchable layouts  |

---

## 💡 Best Practices

✅ Strong separation of logic & UI
✅ Type-safe data fetching
✅ Lazy-loaded views for performance
✅ Accessible components
✅ Consistent Tailwind design system
✅ Graceful handling of all states

---

## 🔮 Future Enhancements

* 🌙 **Dark mode** with Tailwind `dark:` variants
* 🪄 **Shimmer skeleton** loading
* 🔁 **Persist mode** (remember pagination or scroll)
* 🧭 **Search and filtering support**
* 🧱 **Design system extraction** for broader reuse
* 📊 **Comparison view** for multiple Pokémon

---

## 🧪 Example Routing Setup

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browser from "./pages/Browser";
import PokemonDetail from "./components/pokemon/PokemonDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browser />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🧾 Summary

| Component          | Role        | Reusable | Description                        |
| ------------------ | ----------- | -------- | ---------------------------------- |
| **Browser**        | Entry View  | ✅        | Mode switcher & layout container   |
| **PaginationView** | List View   | ✅        | Paginated Pokémon explorer         |
| **LoadMoreView**   | List View   | ✅        | Infinite scroll Pokémon explorer   |
| **PokemonDetail**  | Detail View | ✅        | Full Pokémon information display   |
| **PokemonCard**    | UI Element  | ✅        | Reusable card with image & ID      |
| **PokemonStats**   | UI Element  | ✅        | Animated base stats bars           |
| **Loader**         | Utility     | ✅        | Universal spinner component        |
| **ErrorBoundary**  | Utility     | ✅        | Error isolation & fallback handler |

---

