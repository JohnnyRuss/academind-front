import { axiosQuery } from '../../store/axiosConfig';
import { useState } from 'react';

function useHelperQueries() {
  const [loading, setLoading] = useState(false);

  const [optionsRules, setOptionsRules] = useState(null);

  async function getOptionsRules(postId) {
    setLoading(true);
    const { data } = await axiosQuery(`/posts/${postId}/options`);
    setOptionsRules(data);
    setLoading(false);
  }

  return { loading, getOptionsRules, optionsRules, setOptionsRules };
}

export default useHelperQueries;
