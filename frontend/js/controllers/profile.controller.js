// Profile Controller
angular.module('jobSeekerApp')
.controller('ProfileController', ['$scope', 'ProfileService',
function($scope, ProfileService) {
  
  $scope.profile = {};
  $scope.editMode = false;
  $scope.loading = true;
  $scope.saving = false;
  $scope.message = '';
  $scope.messageType = '';

  // Load profile
  ProfileService.getProfile().then(function(response) {
    $scope.profile = response.data.data;
    $scope.loading = false;
  }, function(error) {
    $scope.loading = false;
    $scope.message = 'Failed to load profile';
    $scope.messageType = 'error';
  });

  $scope.toggleEditMode = function() {
    $scope.editMode = !$scope.editMode;
  };

  $scope.saveProfile = function() {
    $scope.saving = true;
    ProfileService.updateProfile($scope.profile).then(function(response) {
      $scope.saving = false;
      $scope.profile = response.data.data;
      $scope.editMode = false;
      $scope.message = 'Profile updated successfully';
      $scope.messageType = 'success';
    }, function(error) {
      $scope.saving = false;
      $scope.message = error.data?.message || 'Failed to update profile';
      $scope.messageType = 'error';
    });
  };

  $scope.cancelEdit = function() {
    $scope.editMode = false;
    // Reload profile
    ProfileService.getProfile().then(function(response) {
      $scope.profile = response.data.data;
    });
  };

  $scope.addSkill = function(skill) {
    if (skill && !$scope.profile.skills.includes(skill)) {
      $scope.profile.skills.push(skill);
      $scope.newSkill = '';
    }
  };

  $scope.removeSkill = function(index) {
    $scope.profile.skills.splice(index, 1);
  };
}]);
