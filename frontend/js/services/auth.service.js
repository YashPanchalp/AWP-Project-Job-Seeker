// Authentication Service
angular.module('jobSeekerApp')
.factory('AuthService', ['$http', '$window', function($http, $window) {
  
  const API_URL = 'http://localhost:5000/api';

  return {
    // Register user
    register: function(userData) {
      return $http.post(API_URL + '/auth/register', userData);
    },

    // Login user
    login: function(credentials) {
      return $http.post(API_URL + '/auth/login', credentials).then(function(response) {
        if (response.data.token) {
          $window.localStorage.setItem('token', response.data.token);
          $window.localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
      });
    },

    // Logout user
    logout: function() {
      $window.localStorage.removeItem('token');
      $window.localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: function() {
      const user = $window.localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },

    // Check if user is authenticated
    isAuthenticated: function() {
      return !!$window.localStorage.getItem('token');
    },

    // Get token
    getToken: function() {
      return $window.localStorage.getItem('token');
    },

    // Check auth with role
    checkAuth: function(requiredRole) {
      const token = $window.localStorage.getItem('token');
      if (!token) {
        return Promise.reject('Not authenticated');
      }
      
      if (requiredRole) {
        const user = JSON.parse($window.localStorage.getItem('user'));
        if (user.role !== requiredRole) {
          return Promise.reject('Insufficient permissions');
        }
      }
      
      return Promise.resolve();
    }
  };
}])

// HTTP Interceptor for adding auth token to requests
.factory('AuthInterceptor', ['$q', '$window', function($q, $window) {
  return {
    request: function(config) {
      const token = $window.localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
      }
      return $q.reject(response);
    }
  };
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);
