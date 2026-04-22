// Job Service
angular.module('jobSeekerApp')
.factory('JobService', ['$http', function($http) {
  
  const API_URL = 'http://localhost:5000/api/jobs';

  return {
    // Get all jobs with filters
    getAllJobs: function(filters) {
      let url = API_URL;
      const params = [];
      
      if (filters) {
        if (filters.role) params.push('role=' + encodeURIComponent(filters.role));
        if (filters.company) params.push('company=' + encodeURIComponent(filters.company));
        if (filters.skills) params.push('skills=' + encodeURIComponent(filters.skills));
        if (filters.location) params.push('location=' + encodeURIComponent(filters.location));
      }
      
      if (params.length > 0) {
        url += '?' + params.join('&');
      }
      
      return $http.get(url);
    },

    // Get job by ID
    getJobById: function(jobId) {
      return $http.get(API_URL + '/' + jobId);
    },

    // Create job (admin)
    createJob: function(jobData) {
      return $http.post(API_URL, jobData);
    },

    // Update job (admin)
    updateJob: function(jobId, jobData) {
      return $http.put(API_URL + '/' + jobId, jobData);
    },

    // Delete job (admin)
    deleteJob: function(jobId) {
      return $http.delete(API_URL + '/' + jobId);
    },

    // Get admin's jobs with stats
    getAdminJobs: function() {
      return $http.get(API_URL + '/admin/my-jobs/stats');
    }
  };
}]);
