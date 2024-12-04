import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";

const routes = [
  { path: "/", component: Home },
  { path: "/book/:id", component: BookDetails },
  { path: "/profile", component: Profile },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
];

export default routes;
