// Admin Dashboard Controller
angular.module('jobSeekerApp')
.controller('AdminDashboardController', ['$scope', '$location', 'JobService',
function($scope, $location, JobService) {
  
  $scope.jobs = [];
  $scope.loading = true;
  $scope.message = '';
  $scope.messageType = '';

  // Load admin's jobs with stats
  JobService.getAdminJobs().then(function(response) {
    $scope.jobs = response.data.jobs;
    $scope.loading = false;
  }, function(error) {
    $scope.loading = false;
    $scope.message = 'Failed to load jobs';
    $scope.messageType = 'error';
  });

  $scope.viewApplicants = function(jobId) {
    $location.path('/admin/jobs/' + jobId + '/applicants');
  };

  $scope.editJob = function(jobId) {
    $location.path('/admin/jobs/' + jobId + '/edit');
  };

  $scope.deleteJob = function(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
      JobService.deleteJob(jobId).then(function(response) {
        $scope.message = 'Job deleted successfully';
        $scope.messageType = 'success';
        // Reload jobs
        JobService.getAdminJobs().then(function(response) {
          $scope.jobs = response.data.jobs;
        });
      }, function(error) {
        $scope.message = 'Failed to delete job';
        $scope.messageType = 'error';
      });
    }
  };

  $scope.postNewJob = function() {
    $location.path('/admin/post-job');
  };
}]);

// Post Job Controller
angular.module('jobSeekerApp')
.controller('PostJobController', ['$scope', '$location', 'JobService',
function($scope, $location, JobService) {
  
  $scope.formData = {
    skillsRequired: [],
    jobType: 'Full-time'
  };
  $scope.loading = false;
  $scope.newSkill = '';
  $scope.message = '';
  $scope.messageType = '';

  $scope.addSkill = function() {
    if ($scope.newSkill && !$scope.formData.skillsRequired.includes($scope.newSkill)) {
      $scope.formData.skillsRequired.push($scope.newSkill);
      $scope.newSkill = '';
    }
  };

  $scope.removeSkill = function(index) {
    $scope.formData.skillsRequired.splice(index, 1);
  };

  $scope.submitJob = function() {
    // Validation
    if (!$scope.formData.title || !$scope.formData.companyName || !$scope.formData.description || 
        !$scope.formData.location || $scope.formData.skillsRequired.length === 0) {
      $scope.message = 'Please fill in all required fields';
      $scope.messageType = 'error';
      return;
    }

    $scope.loading = true;
    JobService.createJob($scope.formData).then(function(response) {
      $scope.loading = false;
      $scope.message = 'Job posted successfully';
      $scope.messageType = 'success';
      
      setTimeout(function() {
        $location.path('/admin/dashboard');
      }, 2000);
    }, function(error) {
      $scope.loading = false;
      $scope.message = error.data?.message || 'Failed to post job';
      $scope.messageType = 'error';
    });
  };

  $scope.goBack = function() {
    $location.path('/admin/dashboard');
  };
}]);

// Edit Job Controller
angular.module('jobSeekerApp')
.controller('EditJobController', ['$scope', '$location', '$routeParams', 'JobService',
function($scope, $location, $routeParams, JobService) {
  
  $scope.formData = {
    skillsRequired: []
  };
  $scope.loading = true;
  $scope.saving = false;
  $scope.newSkill = '';
  $scope.message = '';
  $scope.messageType = '';

  // Load job
  JobService.getJobById($routeParams.id).then(function(response) {
    $scope.formData = response.data.job;
    $scope.loading = false;
  }, function(error) {
    $scope.loading = false;
    $scope.message = 'Failed to load job';
    $scope.messageType = 'error';
  });

  $scope.addSkill = function() {
    if ($scope.newSkill && !$scope.formData.skillsRequired.includes($scope.newSkill)) {
      $scope.formData.skillsRequired.push($scope.newSkill);
      $scope.newSkill = '';
    }
  };

  $scope.removeSkill = function(index) {
    $scope.formData.skillsRequired.splice(index, 1);
  };

  $scope.submitJob = function() {
    if (!$scope.formData.title || !$scope.formData.companyName || !$scope.formData.description || 
        !$scope.formData.location || $scope.formData.skillsRequired.length === 0) {
      $scope.message = 'Please fill in all required fields';
      $scope.messageType = 'error';
      return;
    }

    $scope.saving = true;
    JobService.updateJob($routeParams.id, $scope.formData).then(function(response) {
      $scope.saving = false;
      $scope.message = 'Job updated successfully';
      $scope.messageType = 'success';
      
      setTimeout(function() {
        $location.path('/admin/dashboard');
      }, 2000);
    }, function(error) {
      $scope.saving = false;
      $scope.message = error.data?.message || 'Failed to update job';
      $scope.messageType = 'error';
    });
  };

  $scope.goBack = function() {
    $location.path('/admin/dashboard');
  };
}]);
