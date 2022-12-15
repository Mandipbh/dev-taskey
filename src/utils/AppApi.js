// import axios from 'axios';
// import {handleError, handleResponse} from './helper';

// export const AppApi = axios.create({
//   baseURL: 'https://taskey-app.herokuapp.com/api/',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'multipart/form-data',
//   },
// });

// export const API = {
//   signup: 'register',
//   verifyOTP: 'verifyOTP',
//   login: 'login',
// };

// export const getAPICall = (url, startOffset, size = 5, isDiscount) => {
//   console.log('url>>>. ', url);
//   return AppApi.get(url, {
//     params: {offset: startOffset, size, discounted: isDiscount},
//   })
//     .then(res => {
//       return handleResponse(res);
//     })
//     .catch(e => {
//       if (e.response) {
//         return handleError(e.response.data);
//       }
//       return handleError(e.message);
//     });
// };
// export const postAPICall = (url, requestData) => {
//   console.log('frmd data >> ', requestData);
//   return AppApi.post(url, requestData)
//     .then(res => {
//       return handleResponse(res);
//     })
//     .catch(e => {
//       if (e.response) {
//         return handleError(e.response.data.message);
//       } else {
//         return handleError(e.message);
//       }
//     });
// };
// export const putAPICall = (url, requestData) => {
//   return AppApi.put(url, requestData)
//     .then(res => {
//       return handleResponse(res);
//     })
//     .catch(e => {
//       if (e.response) {
//         return handleError(e.response.data.message);
//       } else {
//         return handleError(e.message);
//       }
//     });
// };
// export const deleteAPICall = url => {
//   return AppApi.delete(url)
//     .then(res => {
//       return handleResponse(res);
//     })
//     .catch(e => {
//       if (e.response) {
//         return handleError(e.response.data.message);
//       } else {
//         return handleError(e.message);
//       }
//     });
// };

import axios from 'axios';
import {handleError, handleResponse} from './helper';

export const getBaseUrl = 'https://9956-43-228-229-22.in.ngrok.io/api/';

export const appAPI = axios.create({
  baseURL: getBaseUrl,
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const API = {
  login: 'login',
  signUp: 'signup',
  post: 'post',
};

export const getAPICall = (url, startOffset, size = 5, isDiscount) => {
  console.log('get url>>>. ', url);
  return appAPI
    .get(url, {params: {offset: startOffset, size, discounted: isDiscount}})
    .then(res => {
      return handleResponse(res);
    })
    .catch(e => {
      if (e.response) {
        return handleError(e.response.data);
      }
      return handleError(e.message);
    });
};
export const postAPICall = (url, requestData) => {
  console.log('post url >>> ', url);
  return appAPI
    .post(url, requestData)
    .then(res => {
      return handleResponse(res);
    })
    .catch(e => {
      if (e.response) {
        // if (e.response.data && e.response.data.errors.email) {
        //   return handleError(e.response.data.errors.email);
        // }
        return handleError(e.response.data.message);
      } else {
        return handleError(e.message);
      }
    });
};
export const putAPICall = (url, requestData) => {
  return appAPI
    .put(url, requestData)
    .then(res => {
      return handleResponse(res);
    })
    .catch(e => {
      if (e.response) {
        return handleError(e.response.data.message);
      } else {
        return handleError(e.message);
      }
    });
};
export const deleteAPICall = url => {
  return appAPI
    .delete(url)
    .then(res => {
      return handleResponse(res);
    })
    .catch(e => {
      if (e.response) {
        return handleError(e.response.data.message);
      } else {
        return handleError(e.message);
      }
    });
};
