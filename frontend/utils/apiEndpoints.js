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
  },
  PATCH: {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
};

const apiEndpoints = {
  newRecipe: { endpoint: '/api/recipe', options: fetchOptions.POST },
  logout: { endpoint: '/api/user/me/logout', options: fetchOptions.POST },
  login: { endpoint: '/api/user/login', options: fetchOptions.POST },
  register: { endpoint: '/api/user/signup', options: fetchOptions.POST },
  editRecipe: { endpoint: '/api/recipe', options: fetchOptions.PATCH }
};

export default apiEndpoints;
