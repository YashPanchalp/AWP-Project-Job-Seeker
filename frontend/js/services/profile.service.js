// Profile Service
angular.module('jobSeekerApp')
.factory('ProfileService', ['$http', 'ApiConfig', function($http, ApiConfig) {
  
  const API_URL = ApiConfig.PROFILE_API;

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
