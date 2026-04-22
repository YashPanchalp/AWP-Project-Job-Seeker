// Apply Job Controller
angular.module('jobSeekerApp')
.controller('ApplyJobController', ['$scope', '$location', '$routeParams', 'JobService', 'ApplicationService', 'ProfileService',
function($scope, $location, $routeParams, JobService, ApplicationService, ProfileService) {

  $scope.job = {};
  $scope.profile = {};
  $scope.formData = {};
  $scope.loading = true;
  $scope.submitting = false;
  $scope.message = '';
  $scope.messageType = '';

  function setProfileFormData(profile) {
    $scope.profile = profile || {};
    $scope.formData = {
      name: $scope.profile.name || '',
      email: $scope.profile.email || '',
      phone: $scope.profile.phone || '',
      qualification: $scope.profile.qualification || '',
      skills: Array.isArray($scope.profile.skills) ? $scope.profile.skills : [],
      experience: $scope.profile.experience || '',
      location: $scope.profile.location || '',
      coverLetter: ''
    };
  }

  // Load job details
  JobService.getJobById($routeParams.jobId).then(function(response) {
    $scope.job = response.data.job || {};
  }, function() {
    $scope.message = 'Failed to load job';
    $scope.messageType = 'error';
  });

  // Load user profile
  ProfileService.getProfile().then(function(response) {
    const profile = response?.data?.data || response?.data?.user || {};
    if (profile) {
      setProfileFormData(profile);
    } else {
      setProfileFormData({});
    }
    $scope.loading = false;
  }, function() {
    setProfileFormData({});
    $scope.loading = false;
    $scope.message = 'Failed to load profile';
    $scope.messageType = 'error';
  });

  $scope.submit = function() {
    if (!$scope.formData) {
      $scope.formData = {};
    }

    if (!$scope.formData.name || !$scope.formData.email) {
      $scope.message = 'Please fill in required fields';
      $scope.messageType = 'error';
      return;
    }

    $scope.submitting = true;

    const applicationData = {
      jobId: $routeParams.jobId,
      coverLetter: $scope.formData.coverLetter || '',
      extraData: {
        name: $scope.formData.name || '',
        email: $scope.formData.email || '',
        phone: $scope.formData.phone || '',
        qualification: $scope.formData.qualification || '',
        skills: $scope.formData.skills || [],
        experience: $scope.formData.experience || '',
        location: $scope.formData.location || ''
      }
    };

    ApplicationService.applyForJob(applicationData).then(function() {
      $scope.submitting = false;
      $scope.message = 'Application submitted successfully';
      $scope.messageType = 'success';

      setTimeout(function() {
        $location.path('/my-applications');
      }, 2000);
    }, function(error) {
      $scope.submitting = false;
      $scope.message = error?.data?.message || 'Failed to submit application';
      $scope.messageType = 'error';
    });
  };

  $scope.goBack = function() {
    $location.path('/jobs/' + $routeParams.jobId);
  };
}]);

// My Applications Controller
angular.module('jobSeekerApp')
.controller('MyApplicationsController', ['$scope', '$location', 'ApplicationService',
function($scope, $location, ApplicationService) {

  $scope.applications = [];
  $scope.loading = true;
  $scope.message = '';
  $scope.messageType = '';

  // Load applications
  ApplicationService.getMyApplications().then(function(response) {
    $scope.applications = response.data.applications || [];
    $scope.loading = false;
  }, function() {
    $scope.loading = false;
    $scope.message = 'Failed to load applications';
    $scope.messageType = 'error';
  });

  $scope.getStatusBadgeClass = function(status) {
    switch (status) {
      case 'Applied': return 'badge-primary';
      case 'Shortlisted': return 'badge-success';
      case 'Rejected': return 'badge-danger';
      case 'Accepted': return 'badge-success';
      default: return 'badge-secondary';
    }
  };
}]);
