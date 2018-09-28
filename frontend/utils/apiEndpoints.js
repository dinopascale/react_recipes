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
  },
  DELETE: {
    method: 'DELETE',
    credentials: 'include'
  }
};

const apiEndpoints = {
  newRecipe: { endpoint: '/api/recipe', options: fetchOptions.POST },
  logout: { endpoint: '/api/user/me/logout', options: fetchOptions.POST },
  login: { endpoint: '/api/user/login', options: fetchOptions.POST },
  register: { endpoint: '/api/user/signup', options: fetchOptions.POST },
  editRecipe: { endpoint: '/api/recipe', options: fetchOptions.PATCH },
  deleteRecipe: { endpoint: '/api/recipe', options: fetchOptions.DELETE },
  editUser: { endpoint: '/api/user', options: fetchOptions.PATCH },
  user: { endpoint: '/api/user', options: fetchOptions.GET },
  me: { endpoint: '/api/user/me', options: fetchOptions.GET },
  userStatistics: {
    endpoint: '/api/user/statistics',
    options: fetchOptions.GET
  }
};

export default apiEndpoints;
