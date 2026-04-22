// API Configuration
angular.module('jobSeekerApp')
.factory('ApiConfig', [function() {
  
  // Determine API URL based on environment
  let apiUrl = 'http://localhost:5000/api';
  
  // If deployed (not localhost), use environment variable or backend domain
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Use environment variable or default to relative path
    apiUrl = window.API_URL || '/api';
    
    // If API_URL environment variable is set, use it
    if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) {
      apiUrl = process.env.REACT_APP_API_URL;
    }
  }
  
  return {
    API_URL: apiUrl,
    AUTH_API: apiUrl + '/auth',
    JOBS_API: apiUrl + '/jobs',
    APPLICATIONS_API: apiUrl + '/applications',
    PROFILE_API: apiUrl + '/profile'
  };
}]);
