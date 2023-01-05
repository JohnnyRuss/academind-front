import { useRef } from "react";
import { useSelector } from "react-redux";

import { selectActiveUserShortInfo } from "../../../../store/selectors/activeUserSelectors";
// import { selectActiveSelectedMedia } from "../../../../store/selectors/createPostSelectors";

import styles from "./styles/createPostTouch.module.scss";
import { MultiMediaIcon } from "../../Icons/icons";
import { UserIdentifier } from "../../";

import { useCreatePost } from "../../../../hooks";

/**
 * is component which one firstly communicates to the user, so the component which is represented before modal open
 * @param {boolean} withTextField by default true. if true returns component with textfield if false returns only the media button, actually footer of itself
 * @returns
 */
function CreatePostTouch({ setIsOpen, withTextField = true }) {
  const filesRef = useRef();

  // const activeSelectedMedia = useSelector(selectActiveSelectedMedia);
  const { userName, image, _id } = useSelector(selectActiveUserShortInfo);

  const { addMediaHandler } = useCreatePost({
    key: "post",
    error: null,
  });

  const selectFiles = (e) => {
    addMediaHandler(e.target.files);
  };

  // useEffect(() => {
  //   if (!activeSelectedMedia) filesRef.current.value = null;
  // }, [activeSelectedMedia]);

  return (
    <>
      {withTextField && (
        <>
          <UserIdentifier
            userId={_id}
            userName={userName}
            img={image}
            withTime={false}
            className={styles.identifierPostTouch}
          />
          <input
            type="text"
            className={styles.touchInp}
            placeholder="what's on your mind ?"
            onClick={() => setIsOpen(true)}
          />
        </>
      )}
      <label className={styles.createPostFooter} htmlFor="postMediaFile">
        <MultiMediaIcon /> / Media
        <input
          ref={filesRef}
          type="file"
          id="postMediaFile"
          name="postFiles"
          className={styles.mediaFileInp}
          onChange={selectFiles}
          multiple
        />
      </label>
    </>
  );
}

export default CreatePostTouch;
