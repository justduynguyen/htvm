export const callAsync = async (asyncCall) => {
  try {
    const response = await asyncCall;
    return makeResponse(response);
  } catch (err) {
    const resp = makeResponseWithErrors(err);
    console.log('callAsync Error:', resp);
    window.alert('Sai tài khoản hoặc mật khẩu');
    return resp;
  }
};

export const makeResponse = (resp) => {
  const response = {
    data: resp.data,
    error: '',
    status: resp.status,
  };
  console.log(response);
  return response;
};

export const makeResponseWithErrors = (error) => {
  let response = {
    data: null,
    error: '',
    status: '',
  };
  if (error.response) {
    // Request made and server responded
    response.error = error.response.data?.detail || 'Something went wrong';
    response.status = error.response.status || error.status;
  } else if (error.request) {
    // The request was made but no response was received
    response.error = 'Cannot connect to server';
    response.status = error.status;
  } else {
    // Something happened in setting up the request that triggered an Error
    response.error = error.message || 'Something went wrong';
    response.status = error.status;
  }

  return response;
};

export const getErrors = (error) => {
  if (!error) return '';
  if (error.response) {
    return error.response?.data?.error || 'Something went wrong';
  } else if (error.request) {
    return 'Cannot connect to server';
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message || 'Something went wrong';
  }
};

export const getErrorMessageCode = (error) => {
  if (!error || !error.response) return '';
  return {
    Code: error.response.data?.error?.Code ?? '',
    Message: error.response.data?.error?.Message ?? '',
  };
};
