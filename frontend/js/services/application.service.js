// Application Service
angular.module('jobSeekerApp')
.factory('ApplicationService', ['$http', function($http) {
  
  const API_URL = 'http://localhost:5000/api/applications';

  return {
    // Apply for job
    applyForJob: function(applicationData) {
      return $http.post(API_URL + '/apply', applicationData);
    },

    // Get my applications
    getMyApplications: function() {
      return $http.get(API_URL + '/my-applications');
    },

    // Get applicants for a job (admin)
    getJobApplicants: function(jobId) {
      return $http.get(API_URL + '/job/' + jobId + '/applicants');
    },

    // Update application status (admin)
    updateApplicationStatus: function(applicationId, status) {
      return $http.put(API_URL + '/' + applicationId + '/status', { status: status });
    }
  };
}]);
