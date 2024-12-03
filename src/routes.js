import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';

const routes = [
  { path: '/', component: Home },
  { path: '/book/:id', component: BookDetails },
  { path: '/profile', component: Profile },
];

export default routes;
