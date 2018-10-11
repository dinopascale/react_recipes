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
  refresh: { endpoint: '/api/user/refresh', options: fetchOptions.GET },
  editRecipe: { endpoint: '/api/recipe', options: fetchOptions.PATCH },
  deleteRecipe: { endpoint: '/api/recipe', options: fetchOptions.DELETE },
  editUser: { endpoint: '/api/user', options: fetchOptions.PATCH },
  user: { endpoint: '/api/user', options: fetchOptions.GET },
  me: { endpoint: '/api/user/me', options: fetchOptions.GET },
  userStatistics: {
    endpoint: '/api/user/statistics',
    options: fetchOptions.GET
  },
  getThreads: { endpoint: '/api/thread', options: fetchOptions.GET },
  postThread: { endpoint: '/api/thread', options: fetchOptions.POST },
  editThread: { endpoint: '/api/thread', options: fetchOptions.PATCH },
  deleteThread: { endpoint: '/api/thread', options: fetchOptions.DELETE },
  alreadyRateThread: { endpoint: '/api/rate/c', options: fetchOptions.PATCH },
  firstRateThread: { endpoint: '/api/rate/c', options: fetchOptions.POST },
  getComments: { endpoint: '/api/comment', options: fetchOptions.GET },
  postComment: { endpoint: '/api/comment', options: fetchOptions.POST },
  editComment: { endpoint: '/api/comment', options: fetchOptions.PATCH },
  deleteComment: { endpoint: '/api/comment', options: fetchOptions.DELETE }
};

export default apiEndpoints;
