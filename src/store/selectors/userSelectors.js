import { createSelector } from '@reduxjs/toolkit';

export const selectActiveUserInfo = ({ activeUser }) => ({
  userName: activeUser.userName,
  email: activeUser.email,
  image: activeUser.profileImg,
  id: activeUser._id,
});

export const selectUserNameAndEmail = ({ user }) => ({
  userName: user.user.userName,
  email: user.user.email,
});

export const selectUserId = ({ activeUser }) => ({
  id: activeUser._id,
});

const selectedUserInfo = ({ user }) => ({
  birthDate: user.user.userInfo.birthDate,
  from: {
    country: user.user.userInfo.from.country,
    city: user.user.userInfo.from.city,
  },
  currentLivingPlace: {
    country: user.user.userInfo.currentLivingPlace.country,
    city: user.user.userInfo.currentLivingPlace.city,
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
    company: user.user.userInfo.workplace.company,
    // description: user.user.userInfo.workplace.description,
    position: user.user.userInfo.workplace.position,
    // workingYears: {
    //   from: user.user.userInfo.workplace.workingYears.from,
    //   to: user.user.userInfo.workplace.workingYears.to,
    // },
  },
  friendsAmount: user.user.friendsAmount,
  friends: user.user.friends,
  createdAt: user.user.userInfo.createdAt,
});

export const selectUserInfo = createSelector(selectedUserInfo, (memo) => memo);
