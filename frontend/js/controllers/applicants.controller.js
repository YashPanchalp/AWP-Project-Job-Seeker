// Applicants Controller
angular.module('jobSeekerApp')
.controller('ApplicantsController', ['$scope', '$location', '$routeParams', 'ApplicationService', 'JobService',
function($scope, $location, $routeParams, ApplicationService, JobService) {
  
  $scope.job = {};
  $scope.applications = [];
  $scope.loading = true;
  $scope.message = '';
  $scope.messageType = '';

  // Load job details
  JobService.getJobById($routeParams.id).then(function(response) {
    $scope.job = response.data.job;
  });

  // Load applicants
  ApplicationService.getJobApplicants($routeParams.id).then(function(response) {
    $scope.applications = response.data.applications;
    $scope.loading = false;
  }, function(error) {
    $scope.loading = false;
    $scope.message = 'Failed to load applicants';
    $scope.messageType = 'error';
  });

  $scope.updateStatus = function(applicationId, newStatus) {
    ApplicationService.updateApplicationStatus(applicationId, newStatus).then(function(response) {
      // Update the application in the list
      const app = $scope.applications.find(a => a._id === applicationId);
      if (app) {
        app.status = newStatus;
      }
      $scope.message = 'Status updated successfully';
      $scope.messageType = 'success';
    }, function(error) {
      $scope.message = 'Failed to update status';
      $scope.messageType = 'error';
    });
  };

  $scope.getStatusBadgeClass = function(status) {
    switch(status) {
      case 'Applied': return 'badge-primary';
      case 'Shortlisted': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      case 'Accepted': return 'badge-success';
      default: return 'badge-secondary';
    }
  };

  $scope.goBack = function() {
    $location.path('/admin/dashboard');
  };
}]);
