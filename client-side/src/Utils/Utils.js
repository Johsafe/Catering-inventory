//base_url
export const base_url = "http://localhost:8000/";

// get error
export const getError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

