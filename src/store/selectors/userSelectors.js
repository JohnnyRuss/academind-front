import { createSelector } from '@reduxjs/toolkit';

export const selectAuthenticationLoadingState = ({ activeUser }) => activeUser.loadingState;

export const selectActiveUserInfo = ({ activeUser }) => ({
  userName: activeUser.user.userName,
  email: activeUser.user.email,
  image: activeUser.user.profileImg,
  id: activeUser.user._id,
});

export const selectUserId = ({ activeUser }) => ({
  id: activeUser.user._id,
});

export const selectUserNameAndEmail = ({ user }) => ({
  userName: user.user.userName,
  email: user.user.email,
});

const selectedUserInfo = ({ user }) => ({
  birthDate: user.user?.birthDate,
  from: {
    country: user.user?.from?.country,
    city: user.user?.from?.city,
  },
  currentLivingPlace: {
    country: user.user?.currentLivingPlace?.country,
    city: user.user?.currentLivingPlace?.city,
  },
  workplace: {
    company: user.user?.workplace?.company,
    position: user.user?.workplace?.position,
  },
  friendsAmount: user.user.friendsAmount,
  friends: user.user.friends,
  createdAt: user.user?.createdAt,
});

export const selectUserInfo = createSelector(selectedUserInfo, (memo) => memo);

export const selectUserCover = ({ user, activeUser }) => {
  const currUser = user.user._id === activeUser.user._id;
  return {
    profileImg: currUser ? activeUser.user.profileImg : user.user.profileImg,
    coverImg: currUser ? activeUser.user.coverImg : user.user.coverImg,
  };
};
