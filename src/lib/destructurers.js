export function destructurePostAuthenticData(data) {
  return data.deleted
    ? data
    : {
        author: {
          _id: data.shared ? data.authentic.author._id : data.author._id,
          userName: data.shared ? data.authentic.author.userName : data.author.userName,
          profileImg: data.shared ? data.authentic.author.profileImg : data.author.profileImg,
        },
        createdAt: data.shared ? data.authentic.createdAt : data.createdAt,
        description: data.shared ? data.authentic.description : data.description,
        tags: data.tags,
        authenticTags: data.authentic?.tags,
        media: data.shared ? data.authentic.media : data.media,
        comments: data.commentsCount,
        article: data.shared ? data.authentic?.article : data.article,
        title: data.shared ? data.authentic?.title : data.title,
        categories: data.shared ? data.authentic?.categories : data.categories,
        _id: data.shared ? data.authentic?._id : data._id,
        likesAmount: data.shared ? data.authentic?.likesAmount : data.likesAmount,
        dislikesAmount: data.shared ? data.authentic?.dislikesAmount : data.dislikesAmount,
        commentsAmount: data.shared ? data.authentic?.commentsAmount : data.commentsAmount,
      };
}

export function destructurePostUpdateData(data) {
  return {
    _id: data._id,
    type: data.shared ? data.authentic.type : data.type,
    shared: data.shared,
    authenticAuthorId: data.authentic?.author?._id,
    authenticAuthorImg: data.authentic?.author?.profileImg,
    authenticAuthorName: data.authentic?.author?.userName,
    authenticTags: data.shared ? data.authentic.tags : [],
    authenticDescription: data.shared ? data.authentic?.description : '',
    media: data.shared ? data.authentic.media : data.media,
    createdAt: data.shared ? data.authentic.createdAt : data.createdAt,
    article: data.shared ? data.authentic.article : data.article,
    title: data.shared ? data.authentic.title : data.title,
    categories: data.shared ? data.authentic.categories : data.categories,
    tags: data?.tags,
    description: data?.description,
    comments: data.comments,
  };
}

export function destructurePostShareData(data) {
  return {
    _id: data.shared ? data.authentic._id : data._id,
    type: data.type,
    author: {
      userName: data.shared ? data.authentic.author.userName : data.author.userName,
      profileImg: data.shared ? data.authentic.author.profileImg : data.author.profileImg,
    },
    createdAt: data.createdAt,
    description: data.shared ? data.authentic.description : data.description,
    media: data.shared ? data.authentic.media : data.media,
    tags: [],
    authenticTags: data.shared ? data.authentic.tags : data.tags,
    //for blog share
    article: data.shared ? data.authentic?.article : data.article,
    title: data.shared ? data.authentic.title : data.title,
    categories: data.shared ? data.authentic.categories : data.categories,
    authenticType: data.shared ? data.authentic?.type : data.type,
  };
}

export function destructureSharedPostHeaderData(data) {
  return {
    authorId: data.author._id,
    authorName: data.author.userName,
    authorImg: data.author.profileImg,
    description: data.description,
    createdAt: data.createdAt,
    tags: data.tags,
  };
}
