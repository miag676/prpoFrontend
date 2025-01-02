import Home from "./pages/Home";
import BookDetailsPage from "./pages/BookDetailsPage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

const routes = [
  { path: "/", component: Home, protected: true },
  { path: "/book/:id", component: BookDetailsPage, protected: true },
  { path: "/profile", component: Profile, protected: true },
  { path: "/register", component: Register, protected: false },
  { path: "/login", component: Login, protected: false },
];

export default routes;
