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
  birthDate: user.user?.userInfo?.birthDate,
  from: {
    country: user.user.userInfo?.from.country,
    city: user.user.userInfo?.from.city,
  },
  currentLivingPlace: {
    country: user.user.userInfo?.currentLivingPlace.country,
    city: user.user.userInfo?.currentLivingPlace.city,
  },
  // education: {
  //   collage: user.user.userInfo.education.collage,
  //   degree: user.user.userInfo.education.degree,
  //   description: user.user.userInfo.education.description,
  //   faculty: user.user.userInfo.education.faculty,
  //   years: {
  //     from: user.user.userInfo.education.years.from,
  //     to: user.user.userInfo.education.years.to,
  //   },
  // },
  workplace: {
    company: user.user.userInfo?.workplace.company,
    // description: user.user.userInfo.workplace.description,
    position: user.user.userInfo?.workplace.position,
    // workingYears: {
    //   from: user.user.userInfo.workplace.workingYears.from,
    //   to: user.user.userInfo.workplace.workingYears.to,
    // },
  },
  friendsAmount: user.user.friendsAmount,
  friends: user.user.friends,
  createdAt: user.user.userInfo?.createdAt,
});

export const selectUserInfo = createSelector(selectedUserInfo, (memo) => memo);

export const selectUserCover = ({ user, activeUser }) => {
  const currUser = user.user._id === activeUser.user._id;
  return {
    profileImg: currUser ? activeUser.user.profileImg : user.user.profileImg,
    coverImg: currUser ? activeUser.user.coverImg : user.user.coverImg,
  };
};
