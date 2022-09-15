import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { deActivateTarget } from '../store/reducers/aboutReducer';

import { destructureFormData } from '../functions';

const formTypes = {
  education: formatEducation,
  workplace: formatWorkplace,
  wrapper: queryWrapper,
};

/**
 * custom hook which is ensuring to send user data to DB properly from one place for all info blocks
 * @param {type} type defines which kind of information block have to be handled. and it is necessery to pass the type prop only if you're gonna handle the education or workplace blocks, because of they contain nested fields and in the case to send information to DB in correct form it is neccessery to format data manually. in other cases it is not required to pass the type prop
 * @returns cancelUpdate handler function which have to be passed on cancel button, confirmUpdate handler function which have to be passed on confirm button or on the form(onSubmit) and formRef which one have to be passed on the actual form element to work properly
 */
function useUpdateUserInfo(type) {
  const dispatch = useDispatch();
  const formRef = useRef();

  function cancelHandler() {
    dispatch(deActivateTarget());
  }

  function handleConfirm(e) {
    e.preventDefault();
    const output = formTypes[type]
      ? formTypes[type](destructureFormData(formRef.current))
      : formTypes.wrapper(destructureFormData(formRef.current));

    console.log(output);
  }

  return { cancelHandler, handleConfirm, formRef };
}

export default useUpdateUserInfo;

function formatEducation(data) {
  return {
    updateUserInput: {
      collage: data.collage,
      degree: data.degree,
      description: data.description,
      faculty: data.faculty,
      years: {
        from: data.from,
        to: data.to,
      },
    },
  };
}

function formatWorkplace(data) {
  return {
    updateUserInput: {
      company: data.company,
      position: data.position,
      description: data.description,
      workingYears: {
        from: data.from,
        to: data.to,
      },
    },
  };
}

function queryWrapper(data) {
  const keys = Object.keys(data);
  const output = { updateUserInput: {} };

  keys.forEach((key) => (output.updateUserInput[key] = data[key]));

  return output;
}
