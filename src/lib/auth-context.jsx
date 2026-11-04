// "use client";

// // Frontend-only auth state for the BookNook UI demo.
// // The session lives in localStorage — there is no server behind it.
// //
// // Implemented with useSyncExternalStore so server HTML always matches the
// // first client render (the server snapshot is null, then it hydrates).

// import {
//   createContext,
//   useCallback,
//   useContext,
//   useMemo,
//   useSyncExternalStore,
// } from "react";

// const AuthContext = createContext(null);
// const SESSION_KEY = "booknook:session";
// const USERS_KEY = "booknook:users";
// const CHANGE_EVENT = "booknook:auth-change";

// // localStorage is an external store: cache the parsed value so getSnapshot
// // returns a stable reference between renders.
// let cachedRaw;
// let cachedUser;

// function readSession() {
//   let raw = null;
//   try {
//     raw = window.localStorage.getItem(SESSION_KEY);
//   } catch {
//     raw = null;
//   }
//   if (raw !== cachedRaw) {
//     cachedRaw = raw;
//     try {
//       cachedUser = raw ? JSON.parse(raw) : null;
//     } catch {
//       cachedUser = null;
//     }
//   }
//   return cachedUser;
// }

// function readUsers() {
//   try {
//     const raw = window.localStorage.getItem(USERS_KEY);
//     return raw ? JSON.parse(raw) : {};
//   } catch {
//     return {};
//   }
// }

// function subscribe(callback) {
//   // "storage" fires in other tabs; the custom event covers this tab.
//   const onStorage = (event) => {
//     if (event.key === SESSION_KEY || event.key === null) callback();
//   };
//   const onChange = () => callback();
//   window.addEventListener("storage", onStorage);
//   window.addEventListener(CHANGE_EVENT, onChange);
//   return () => {
//     window.removeEventListener("storage", onStorage);
//     window.removeEventListener(CHANGE_EVENT, onChange);
//   };
// }

// function notify() {
//   window.dispatchEvent(new Event(CHANGE_EVENT));
// }

// const subscribeNoop = () => () => {};

// export function AuthProvider({ children }) {
//   const user = useSyncExternalStore(subscribe, readSession, () => null);
//   const ready = useSyncExternalStore(
//     subscribeNoop,
//     () => true,
//     () => false,
//   );

//   const register = useCallback(({ name, email, password, photo }) => {
//     const users = readUsers();
//     users[email.toLowerCase()] = {
//       name,
//       email,
//       password,
//       photo: photo || "",
//     };
//     window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
//     window.localStorage.setItem(
//       SESSION_KEY,
//       JSON.stringify({ name, email, photo: photo || "" }),
//     );
//     notify();
//   }, []);

//   const login = useCallback((email, password) => {
//     const users = readUsers();
//     const saved = users[email.toLowerCase()];

//     // Registered accounts check their password; anything else can log in
//     // so the demo is easy to explore.
//     if (saved?.password && saved.password !== password) {
//       return { ok: false, error: "Incorrect password (demo accounts only)." };
//     }

//     const name = saved?.name || email.split("@")[0].replace(/[._-]+/g, " ");
//     const photo = saved?.photo || "";
//     window.localStorage.setItem(
//       SESSION_KEY,
//       JSON.stringify({ name, email, photo }),
//     );
//     notify();
//     return { ok: true };
//   }, []);

//   const logout = useCallback(() => {
//     window.localStorage.removeItem(SESSION_KEY);
//     notify();
//   }, []);

//   const value = useMemo(
//     () => ({ user, ready, login, register, logout }),
//     [user, ready, login, register, logout],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// }
