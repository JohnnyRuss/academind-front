import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StandSpinner } from "./components/Layouts";
import { Navigation } from "./components";

import RestrictionAuthorised from "./pages/authentication/RestrictionAuthorised";
import RestrictionUnAuthorised from "./pages/authentication/RestrictionUnAuthorised";

const LoginPage = lazy(() => import("./pages/authentication/LoginPage"));
const Register = lazy(() => import("./pages/authentication/Register"));
const UserPage = lazy(() => import("./pages/profile/UserPage"));
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

const ReviewTaggedPosts = lazy(() =>
  import("./pages/profile/profileReview/ReviewTaggedPosts")
);
const ReviewHiddenPosts = lazy(() =>
  import("./pages/profile/profileReview/ReviewHiddenPosts")
);
const ProfileReview = lazy(() =>
  import("./pages/profile/profileReview/ProfileReview")
);
const UnknownPage = lazy(() => import("./pages/UnknownPage/UnknownPage"));
const Messanger = lazy(() => import("./pages/Messanger/Messanger"));
const MessangerFeed = lazy(() => import("./pages/Messanger/MessangerFeed"));
const SettingsPage = lazy(() => import("./pages/settings/Settings"));
const ReadableSettingsContentPage = lazy(() =>
  import("./pages/settings/ReadableContentPage")
);
const EditableSettingsContentPage = lazy(() =>
  import("./pages/settings/EditableContentPage")
);
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const ActiveBlogPost = lazy(() => import("./pages/blog/ActiveBlogPostPage"));
const Post = lazy(() => import("./pages/Post/Post"));
const RegistrationConfirmPasswordPage = lazy(() =>
  import("./pages/authentication/RegistrationConfirmPasswordPage")
);
const WellcomePage = lazy(() => import("./pages/WellcomePage"));

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Suspense fallback={<StandSpinner />}>
        <Routes>
          <Route element={<RestrictionAuthorised />}>
            <Route path="/" element={<WellcomePage />} />
            <Route path="/authentication/login" element={<LoginPage />} />
            <Route path="/authentication/register" element={<Register />} />
          </Route>
          <Route element={<RestrictionUnAuthorised />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile/:id" element={<UserPage />}>
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
            <Route path="/post/:id" element={<Post />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<ActiveBlogPost />} />
            <Route path="/messanger" element={<Messanger />}>
              <Route path=":id" element={<MessangerFeed />} />
            </Route>
            <Route path="/settings/:id" element={<SettingsPage />}>
              <Route index element={<ReadableSettingsContentPage />} />
              <Route path="edit" element={<EditableSettingsContentPage />} />
            </Route>
          </Route>
          <Route
            path="/confirmRegistration/:registrationId/confirm/:tokenId"
            element={<RegistrationConfirmPasswordPage />}
          />
          <Route path="*" element={<UnknownPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
