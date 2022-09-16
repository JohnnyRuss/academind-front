import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      _id: '',
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      profileImg: '',
      coverImg: '',
      userInfo: {
        birthDate: '',
        createdAt: '',
        from: {
          city: '',
          country: '',
        },
        currentLivingPlace: {
          city: '',
          country: '',
        },
        education: {
          collage: '',
          degree: '',
          description: '',
          faculty: '',
          years: {
            from: '',
            to: '',
          },
        },
        workplace: {
          company: '',
          description: '',
          position: '',
          workingYears: {
            from: '',
            to: '',
          },
        },
      },
      friends: [],
      friendsAmount: '',
      posts: [],
    },
    searchResult: [],
  },

  reducers: {
    searchUser() {},

    setSearchResult(state, { payload }) {
      state.searchResult = payload;
    },

    resetSearchResult(state) {
      state.searchResult = [];
    },

    getUserProfile() {},

    setUserProfile(state, { payload }) {
      const temp = {
        _id: payload._id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        email: payload.email,
        profileImg: payload.profileImg,
        coverImg: payload.coverImg,
        userInfo: {
          birthDate: payload.birthDate,
          createdAt: payload.createdAt,
          from: {
            country: payload.from.country,
            city: payload.from.city,
          },
          currentLivingPlace: {
            country: payload.currentLivingPlace.country,
            city: payload.currentLivingPlace.city,
          },
          education: {
            collage: payload.education?.collage,
            degree: payload.education?.degree,
            description: payload.education?.description,
            faculty: payload.education?.faculty,
            years: {
              from: payload.education?.years.from,
              to: payload.education?.years.to,
            },
          },
          workplace: {
            company: payload.workplace?.company,
            description: payload.workplace?.description,
            position: payload.workplace?.position,
            workingYears: {
              from: payload.workplace?.workingYears.from,
              to: payload.workplace?.workingYears.to,
            },
          },
        },
        friends: payload.friends.map((friend) => ({
          _id: friend._id,
          email: friend.email,
          profileImg: friend.profileImg,
          userName: friend.userName,
        })),
        friendsAmount: payload.friendsAmount,
        // posts: payload.posts,
      };

      Object.keys(temp).map((key) => (state.user[key] = temp[key]));
    },

    getProfilePosts() {},

    getFeedPosts() {},
  },
});

export const userReducer = userSlice.reducer;
export const {
  searchUser,
  setSearchResult,
  resetSearchResult,
  getUserProfile,
  setUserProfile,
  getProfilePosts,
  getFeedPosts,
} = userSlice.actions;
