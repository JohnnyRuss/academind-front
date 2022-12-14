import { axiosQuery } from "../../store/axiosConfig";
import { useState } from "react";

function useHelperQueries() {
  const [loading, setLoading] = useState(false);

  const [optionsRules, setOptionsRules] = useState(null);

  async function getOptionsRules(postId) {
    setLoading(true);
    const { data } = await axiosQuery(`/posts/${postId}/options`);
    setOptionsRules(data);
    setLoading(false);
  }

  async function getFriendShip(profileId) {
    const { data } = await axiosQuery(`/user/${profileId}/isFriend`);
    return data;
  }

  return {
    loading,
    getOptionsRules,
    optionsRules,
    setOptionsRules,
    getFriendShip,
  };
}

export default useHelperQueries;
