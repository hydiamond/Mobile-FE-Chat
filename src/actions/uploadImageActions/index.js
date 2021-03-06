import axiosServices from 'services/axiosServices';
import { PROFILE_TYPE } from 'constTypes';

export const uploadFiles = formData => dispatch => {
  dispatch({
    type: PROFILE_TYPE.UPDATE_AVATAR_REQUEST
  });
  return axiosServices
    .post('https://api-ret.ml/api/v0/files/upload', formData)
    .then(res => {
      const { data } = res.data;
      return { data };
    })
    .catch(err => {
      const { data } = err.response?.data;
      console.log('error', data);
      return { data };
    });
};
