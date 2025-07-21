import Home from "./components/Home";
import Profile from "./components/users/Profile";
import Header from "./components/Header";
import UserProfile from "./components/users/UserProfile";
import UserList from "./components/users/UserList";
import UserListFollowers from "./components/users/UserListFollowers";
import UserListFollowing from "./components/users/UserListFollowing";
import RequireAuth from "./components/Auth/RequireAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Browse from "./components/Browse";
import UserShelves from "./components/users/UserShelves";
import UserSettings from "./components/users/UserSettings";
import Community from "./components/Community";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BookPage from "./components/books/BookPage";
import AuthorPage from "./components/books/AuthorPage";
import ForumList from "./components/forum/ForumList";
import ForumPage from "./components/forum/ForumPage";
import ForumCreateForm from "./components/forum/ForumCreateForm";
import GroupPage from "./components/groups/GroupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@fontsource/rubik"; 
import "@fontsource/rubik/500.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/shelves" element={<UserShelves />} />
        <Route path="/community" element={<Community />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/users/:id/followers" element={<UserListFollowers />} />
        <Route path="/users/:id/following" element={<UserListFollowing />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/authors/:id" element={<AuthorPage />} />
        <Route path="/forum" element={<ForumList />} />
        <Route path="/forum/create" element={<ForumCreateForm />} />
        <Route path="/forum/thread/:id" element={<ForumPage />} />
        <Route path="/groups/:id" element={<GroupPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
