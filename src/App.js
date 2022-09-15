import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Spinner } from './components/Interface';
import { Navigation, UserCover } from './components';

import RestrictionAuthorised from './pages/authentication/RestrictionAuthorised';
import RestrictionUnAuthorised from './pages/authentication/RestrictionUnAuthorised';
const Login = lazy(() => import('./pages/authentication/Login'));
const Register = lazy(() => import('./pages/authentication/Register'));
const Posts = lazy(() => import('./pages/profile/Posts'));
const About = lazy(() => import('./pages/profile/About'));
const Friends = lazy(() => import('./pages/profile/friends/Friends'));
const AllFriends = lazy(() => import('./pages/profile/friends/AllFriends'));
const SentRequests = lazy(() => import('./pages/profile/friends/SentRequests'));
const PendingRequests = lazy(() => import('./pages/profile/friends/PendingRequests'));
const Feed = lazy(() => import('./pages/feed/Feed'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const ActiveBlogPost = lazy(() => import('./pages/blog/ActiveBlogPost'));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<RestrictionAuthorised />}>
            <Route path='authentication/login' element={<Login />} />
            <Route path='authentication/register' element={<Register />} />
          </Route>
          <Route element={<RestrictionUnAuthorised />}>
            <Route path='feed' element={<Feed />} />
            <Route path='profile/:id' element={<UserCover />}>
              <Route path='posts' element={<Posts />} />
              <Route path='about' element={<About />} />
              <Route path='friends' element={<Friends />}>
                <Route path='all-friends' element={<AllFriends />} />
                <Route path='sent-requests' element={<SentRequests />} />
                <Route path='pending-requests' element={<PendingRequests />} />
              </Route>
            </Route>
            <Route path='blog' element={<Blog />} />
            <Route path='blog/:id' element={<ActiveBlogPost />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
