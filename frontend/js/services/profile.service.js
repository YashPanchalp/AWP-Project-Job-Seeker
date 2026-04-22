// Profile Service
angular.module('jobSeekerApp')
.factory('ProfileService', ['$http', function($http) {
  
  const API_URL = 'http://localhost:5000/api/profile';

  return {
    // Get user profile
    getProfile: function() {
      return $http.get(API_URL);
    },

    // Update user profile
    updateProfile: function(profileData) {
      return $http.put(API_URL, profileData);
    }
  };
}]);
