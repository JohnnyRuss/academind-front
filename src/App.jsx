import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { StandSpinner } from "./components/Layouts";
import { Navigation, UserCover } from "./components";

import RestrictionAuthorised from "./pages/authentication/RestrictionAuthorised";
import RestrictionUnAuthorised from "./pages/authentication/RestrictionUnAuthorised";
const Login = lazy(() => import("./pages/authentication/Login"));
const Register = lazy(() => import("./pages/authentication/Register"));
const PostsPage = lazy(() => import("./pages/profile/PostsPage"));
const About = lazy(() => import("./pages/profile/AboutPage"));
const BookmarksPage = lazy(() => import("./pages/profile/BookmarksPage"));
const Friends = lazy(() => import("./pages/profile/friends/Friends"));
const AllFriends = lazy(() => import("./pages/profile/friends/AllFriends"));
const SentRequests = lazy(() => import("./pages/profile/friends/SentRequests"));
const PendingRequests = lazy(() =>
  import("./pages/profile/friends/PendingRequests")
);
const Feed = lazy(() => import("./pages/feed/Feed"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const ActiveBlogPost = lazy(() => import("./pages/blog/ActiveBlogPost"));
const Post = lazy(() => import("./pages/Post/Post"));
const ProfileReview = lazy(() =>
  import("./pages/profile/profileReview/ProfileReview")
);
const ReviewTaggedPosts = lazy(() =>
  import("./pages/profile/profileReview/ReviewTaggedPosts")
);
const ReviewHiddenPosts = lazy(() =>
  import("./pages/profile/profileReview/ReviewHiddenPosts")
);
const Messanger = lazy(() => import("./pages/Messanger/Messanger"));
const MessangerFeed = lazy(() => import("./pages/Messanger/MessangerFeed"));
const UnknownPage = lazy(() => import("./pages/UnknownPage/UnknownPage"));

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<StandSpinner />}>
        <Routes>
          <Route element={<RestrictionAuthorised />}>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="authentication/login" element={<Login />} />
            <Route path="authentication/register" element={<Register />} />
          </Route>
          <Route element={<RestrictionUnAuthorised />}>
            <Route path="/" element={<Navigate to="/feed" />} />
            <Route path="feed" element={<Feed />} />
            <Route path="profile/:id" element={<UserCover />}>
              <Route path="posts" element={<PostsPage />} />
              <Route path="about" element={<About />} />
              <Route path="friends" element={<Friends />}>
                <Route path="all-friends" element={<AllFriends />} />
                <Route path="sent-requests" element={<SentRequests />} />
                <Route path="pending-requests" element={<PendingRequests />} />
              </Route>
              <Route path="bookmarks" element={<BookmarksPage />} />
              <Route path="profile-review" element={<ProfileReview />}>
                <Route path="tags" element={<ReviewTaggedPosts />} />
                <Route path="hidden" element={<ReviewHiddenPosts />} />
              </Route>
            </Route>
            <Route path="post/:id" element={<Post />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<ActiveBlogPost />} />
            <Route path="/messanger" element={<Messanger />}>
              <Route path=":id" element={<MessangerFeed />} />
            </Route>
          </Route>

          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
