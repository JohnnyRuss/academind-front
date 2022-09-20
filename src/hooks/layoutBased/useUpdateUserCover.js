import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { axiosFormDataQuery } from '../../store/axiosConfig';
import { selectUserId } from '../../store/selectors/userSelectors';

import { setActiveUserUpdatedCover } from '../../store/reducers/postsDataReducer';
import { setUpdatedUserCover } from '../../store/reducers/activeUserReducer';

function useUpdateUserCover(field) {
  const dispatch = useDispatch();

  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id: activeUserId } = useSelector(selectUserId);

  async function saveChangeHandler() {
    try {
      setLoading(true);
      if (field === 'profileImg') {
        const { data } = await axiosFormDataQuery.post(`/user/${activeUserId}/profile/profileImg`, {
          profileImg: file,
        });
        dispatch(setUpdatedUserCover({ field, value: data }));
        dispatch(setActiveUserUpdatedCover(data));
      } else if (field === 'coverImg') {
        const { data } = await axiosFormDataQuery.post(`/user/${activeUserId}/profile/coverImg`, {
          coverImg: file,
        });
        dispatch(setUpdatedUserCover({ field, value: data }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
      setFile(null);
      setLoading(false);
    }
  }

  function cancelChangeHandler() {
    fileRef.current.value = '';
    setFile(null);
  }

  return { fileRef, file, setFile, saveChangeHandler, cancelChangeHandler, loading };
}

export default useUpdateUserCover;
