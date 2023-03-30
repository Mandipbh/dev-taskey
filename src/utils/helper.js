import NetInfo from '@react-native-community/netinfo';

export const handleResponse = async res => {
  console.log('rtesposen <<<>>> ', res.data);
  if ((res.status === 200 || res.status === 201 || res.status === 204) && res) {
    return res.data;
  }
  return handleError(res);
};

export const checkUrlValidity = async url => {
  try {
    const response = await fetch(url);
    return response.status === 200; // check if response status is 200
  } catch (error) {
    return false; // return false if there is an error
  }
};

export const handleError = async errorMsg => {
  console.log('error >>> ', errorMsg);
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      if (state.isInternetReachable) {
        if (typeof errorMsg === 'object') {
          return {error: true, errorMsg: errorMsg};
        }
        return {error: true, errorMsg};
      }
      return {
        error: true,
        errorMsg: 'Unable to reach server',
      };
    }
    return {
      error: true,
      errorMsg: 'No internet connection',
    };
  } catch (e) {
    return {error: true, errorMsg: e.message};
  }
};
