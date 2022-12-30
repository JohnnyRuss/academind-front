import { useDispatch } from "react-redux";
import { useState } from "react";

import {
  setCreateBlogPostIsOpen,
  setAudience,
  setTitle,
  setText,
  addLabel,
  removeLabel,
  setCategory,
  addTag,
  removeTag,
  setFile,
  removeFiles,
  resetCreateBlogPostErrorFragment,
} from "../../store/reducers/createPostReducer";

import {
  setUpdateAudience,
  setTitle as setUpdateTitle,
  setText as setUpdateText,
  addLabel as setUpdateLabel,
  removeLabel as removeUpdateLabel,
  addCategory as addUpdateCategory,
  addUpdateTag,
  removeUpdateTag,
  setUpdateFile,
  removeUpdateFiles,
  resetUpdateState,
  resetUpdateBlogPostErrorFragment,
} from "../../store/reducers/portalReducer";

const init = {
  publish: {
    activateModal: setCreateBlogPostIsOpen,
    setAudience: setAudience,
    setTitle: setTitle,
    setText: setText,
    setLabel: addLabel,
    removeLabel: removeLabel,
    addCategory: setCategory,
    addTag: addTag,
    removeTag: removeTag,
    setFile: setFile,
    removeFiles: removeFiles,
    resetError: resetCreateBlogPostErrorFragment,
  },
  update: {
    activateModal: resetUpdateState,
    setAudience: setUpdateAudience,
    setTitle: setUpdateTitle,
    setText: setUpdateText,
    setLabel: setUpdateLabel,
    removeLabel: removeUpdateLabel,
    addCategory: addUpdateCategory,
    addTag: addUpdateTag,
    removeTag: removeUpdateTag,
    setFile: setUpdateFile,
    removeFiles: removeUpdateFiles,
    resetError: resetUpdateBlogPostErrorFragment,
  },
};

// key must be update or publish
export default function useCreateBlogPost({ key, error }) {
  const dispatch = useDispatch();

  // activation
  function activateModal(order) {
    dispatch(init[key].activateModal(order));
  }

  // audience
  const handleAudience = (audience) =>
    dispatch(init[key].setAudience(audience));

  // title
  const handleTitle = (e) => {
    dispatch(init[key].setTitle(e.target.value));
    if (error.title.hasError)
      dispatch(init[key].resetError({ target: "title" }));
  };

  // article
  const handleText = (value) => {
    dispatch(init[key].setText(value));
    if (error.article.hasError)
      dispatch(init[key].resetError({ target: "article" }));
  };

  // labels
  const [label, setLabel] = useState("");

  function handleAddLabel(e) {
    e.preventDefault();
    if (
      label.startsWith("#") &&
      label.split("#")[1] &&
      label.split("#")[1].length > 2
    ) {
      dispatch(init[key].setLabel(label.replace("#", "")));
      setLabel("");
      if (error.labels.hasError)
        dispatch(init[key].resetError({ target: "labels" }));
    }
  }

  const handleRemoveLabel = (category) =>
    dispatch(init[key].removeLabel(category));

  // category
  function handleCategory(category) {
    dispatch(init[key].addCategory(category));
    if (error.category.hasError)
      dispatch(init[key].resetError({ target: "category" }));
  }

  // tags
  const handleAddTag = (tag) => dispatch(init[key].addTag(tag));

  const handleRemoveTag = (id) => dispatch(init[key].removeTag(id));

  // media files
  const handleMediaFiles = (e) => dispatch(init[key].setFile(e.target.files));

  const handleRemoveMediaFile = (media) =>
    dispatch(init[key].removeFiles(media));

  return {
    // activation
    activateModal,
    // audience
    handleAudience,
    // title
    handleTitle,
    // article
    handleText,
    // labels
    label,
    setLabel,
    handleAddLabel,
    handleRemoveLabel,
    // category
    handleCategory,
    // tags
    handleAddTag,
    handleRemoveTag,
    // media files
    handleMediaFiles,
    handleRemoveMediaFile,
  };
}
