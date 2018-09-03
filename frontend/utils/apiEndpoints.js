const fetchOptions = {
  POST: {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  GET: {
    method: 'GET',
    credentials: 'include'
  }
};

const apiEndpoints = {
  newRecipe: { endpoint: '/api/recipe', options: fetchOptions.POST },
  logout: { endpoint: '/api/user/me/logout', options: fetchOptions.POST }
};

export default apiEndpoints;
