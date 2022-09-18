# FEED

## GET FEED

> ### calledIn -> [Content.jsx](./src/components/Feed/Content.jsx)
>
> ### handledBy -> ReduxSaga --> [userReducer](./src/store/reducers/userReducer.js) - [userSaga](./src/store/saga/sagas/userSaga.js) - [userHandlers](./src/store/saga/handlers/userHandlers.js) - [userQueries](./src/store/saga/api/userQueries.js)

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

# POST-CRUD

## CREATE POST

> ### calledIn -> [CreatePost.jsx](./src/components/Layouts/CreatePost/CreatePost.jsx)
>
> ### handledBy -> CustomHook --> [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [createPostReducer](./src/store/reducers/createPostReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

## DLETE POST

> ### calledIn -> [Post.jsx](./src/components/Layouts/Post/Post.jsx)
>
> ### handledBy -> CustomHook --> [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

## UPDATE POST

post update process is devided as couple of steps:

- First of all we have to dispatch update process. For that coresponding function is imported into the [PostsList.jsx](./src/components/PostsPage/components/Content/PostsList.jsx), and is passed as a prop into the each [Post.jsx](./src/components/Layouts/Post/Post.jsx). This function transfers coreseponding post information into the redux [portalReducer](./src/store/reducers/portalReducer.js)

- after update action is dispatched, transfered data will be taken and used by [UpdatePostPortal.jsx](./src/components/Portal/UpdatePostPortal.jsx) and will be passed and changed by [CreatePostModal.jsx](./src/components/Layouts/CreatePost/CreatePostModal.jsx). Updated information will be saved back to redux [portalReducer](./src/store/reducers/portalReducer.js)
- after this process request will be sent
  > ### calledIn -> [UpdatePostPortal.jsx](./src/components/Portal/UpdatePostPortal.jsx)
  >
  > ### handledBy -> CustomHook --> [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [portalReducer](./src/store/reducers/portalReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

## REACT ON POST

> ### calledIn -> [PostActions.jsx](./src/components/Layouts/PostActions/PostActions.jsx)
>
> ### handledBy -> CustomHook --> [usePostQuery](./src/hooks/queries/usePostQuery.js) --> ReduxSaga --> [postsDataReducer](./src/store/reducers/postsDataReducer.js) - [postsSaga](./src/store/saga/sagas/postsSaga.js) - [postsHandlers](./src/store/saga/handlers/postsHandlers.js) - [postQueries](./src/store/saga/api/postQueries.js)

## GET POST COMMENTS

> ### calledIn -> [CommentsList.jsx](./src/components/Layouts/Comments/CommentsList.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

# COMMENTS-CRUD

## ADD COMMENT

> ### calledIn -> [CommentsList.jsx](./src/components/Layouts/Comments/CommentsList.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## DELETE COMMENT

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## UPDATE COMMENT

> ### calledIn -> [CommentsList.jsx](./src/components/Layouts/Comments/CommentsList.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## REACT ON COMMENT

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## PIN COMMENT

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## ADD COMMENT REPLY

> ### calledIn -> [RepliesThread.jsx](./src/components/Layouts/Comments/components/RepliesThread.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## DELETE COMMENT REPLY

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## UPDATE COMMENT REPLY

> ### calledIn -> [RepliesThread.jsx](./src/components/Layouts/Comments/components/RepliesThread.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## REACT ON COMMENT REPLY

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)

## PIN COMMENT REPLY

> ### calledIn -> [Comment.jsx](./src/components/Layouts/Comments/components/Comment.jsx)
>
> ### handledBy -> CustomHook --> [useCommentsQuery](./src/hooks/queries/useCommentsQuery.js) --> ReduxSaga --> [commentsDataReducer](./src/store/reducers/commentsDataReducer.js) - [commentSaga](./src/store/saga/sagas/commentSaga.js) - [commentsHandlers](./src/store/saga/handlers/commentsHandlers.js) - [commentsQueries](./src/store/saga/api/commentsQueries.js)
