// Job Listings Controller
angular.module('jobSeekerApp')
.controller('JobListingsController', ['$scope', '$location', 'JobService',
function($scope, $location, JobService) {
  
  $scope.jobs = [];
  $scope.loading = true;
  $scope.filters = {};
  $scope.message = '';
  $scope.messageType = '';

  // Load all jobs
  $scope.loadJobs = function() {
    $scope.loading = true;
    JobService.getAllJobs($scope.filters).then(function(response) {
      $scope.jobs = response.data.jobs;
      $scope.loading = false;
    }, function(error) {
      $scope.loading = false;
      $scope.message = 'Failed to load jobs';
      $scope.messageType = 'error';
    });
  };

  // Initial load
  $scope.loadJobs();

  // Search/Filter
  $scope.applyFilters = function() {
    $scope.loadJobs();
  };

  $scope.clearFilters = function() {
    $scope.filters = {};
    $scope.loadJobs();
  };

  // View job details
  $scope.viewJob = function(jobId) {
    $location.path('/jobs/' + jobId);
  };

  // Apply for job
  $scope.applyForJob = function(jobId) {
    $location.path('/apply/' + jobId);
  };
}]);

// Job Detail Controller
angular.module('jobSeekerApp')
.controller('JobDetailController', ['$scope', '$location', '$routeParams', 'JobService',
function($scope, $location, $routeParams, JobService) {
  
  $scope.job = {};
  $scope.loading = true;
  $scope.message = '';
  $scope.messageType = '';

  // Load job details
  JobService.getJobById($routeParams.id).then(function(response) {
    $scope.job = response.data.job;
    $scope.loading = false;
  }, function(error) {
    $scope.loading = false;
    $scope.message = 'Failed to load job details';
    $scope.messageType = 'error';
  });

  $scope.applyForJob = function() {
    $location.path('/apply/' + $routeParams.id);
  };

  $scope.goBack = function() {
    $location.path('/jobs');
  };
}]);
