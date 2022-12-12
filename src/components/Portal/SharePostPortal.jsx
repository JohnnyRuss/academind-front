/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  resetSharePostModal,
  addShareTag,
  removeShareTag,
  setShareAudience,
} from "../../store/reducers/portalReducer";
import { useRestrictBodyOverflow, usePostQuery } from "../../hooks";
import { selectSharePostPortal } from "../../store/selectors/portalSelectors";
import { selectActiveUserShortInfo } from "../../store/selectors/activeUserSelectors";

import {
  Modal,
  PostAuthentic,
  UserIdentifier,
  TextAreaWithTag,
  SelectAudience,
  BTN,
  InlineStandSpinner,
} from "../Layouts";
import styles from "./styles/sharePostPortal.module.scss";

function SharePostPortal() {
  const dispatch = useDispatch();

  const {
    sharePostModalIsOpen,
    sharePostData,
    shareAudience,
    sharePostLoadingState: { loading },
  } = useSelector(selectSharePostPortal);
  const { userName, image } = useSelector(selectActiveUserShortInfo);

  const [text, setText] = useState("");

  const handleTag = (tag) => dispatch(addShareTag(tag));

  const handleRemoveTag = (id) => dispatch(removeShareTag(id));

  const deactivateHandler = () => dispatch(resetSharePostModal());

  const handleAudience = (audience) => dispatch(setShareAudience(audience));

  const { sharePostHandler } = usePostQuery();

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  return (
    <Modal
      isOpen={sharePostModalIsOpen}
      setIsOpen={deactivateHandler}
      extraStyles={{ background: "white" }}
    >
      {loading && <InlineStandSpinner />}
      <div className={styles.sharePostModal}>
        <UserIdentifier
          img={image}
          userName={userName}
          withTime={false}
          className={styles.shareIdentifier}
        >
          <div className={styles.shareSelectAudience}>
            <SelectAudience
              audience={shareAudience}
              handleAudience={handleAudience}
            />
          </div>
        </UserIdentifier>
        <TextAreaWithTag
          text={text}
          setText={setText}
          tags={sharePostData.tags}
          setTag={handleTag}
          removeTag={handleRemoveTag}
          placeholder="description"
          className={styles.descriptionField}
        />
        <PostAuthentic
          shared={true}
          type={sharePostData.type}
          authenticType={sharePostData.authenticType}
          data={sharePostData}
          proccessShare={true}
        />
        <span className={styles.btnWrapper}>
          <BTN
            className={styles.confirmShareBtn}
            onClick={() =>
              sharePostHandler(sharePostData._id, {
                audience: shareAudience,
                tags: sharePostData?.tags,
                description: text,
              })
            }
          >
            post
          </BTN>
        </span>
      </div>
    </Modal>
  );
}

export default SharePostPortal;
