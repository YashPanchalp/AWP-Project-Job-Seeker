// Admin Profile Controller
angular.module('jobSeekerApp')
    .controller('AdminProfileController', ['$scope', 'ProfileService', '$window', 
        function($scope, ProfileService, $window) {
            
            // Initialize
            $scope.loading = true;
            $scope.saving = false;
            $scope.editMode = false;
            $scope.profile = {};
            $scope.message = '';
            $scope.messageType = '';

            // Load profile on init
            $scope.loadProfile = function() {
                $scope.loading = true;
                ProfileService.getProfile()
                    .then(function(response) {
                        $scope.profile = response.data.data;
                        $scope.loading = false;
                    })
                    .catch(function(error) {
                        $scope.message = error.data?.message || 'Error loading profile';
                        $scope.messageType = 'error';
                        $scope.loading = false;
                    });
            };

            // Toggle edit mode
            $scope.toggleEditMode = function() {
                $scope.editMode = !$scope.editMode;
                $scope.message = '';
            };

            // Save profile
            $scope.saveProfile = function() {
                // Validate required fields
                if (!$scope.profile.name || !$scope.profile.companyName || !$scope.profile.companyLocation) {
                    $scope.message = 'Please fill in all required fields';
                    $scope.messageType = 'error';
                    return;
                }

                $scope.saving = true;
                const profileData = {
                    name: $scope.profile.name,
                    phone: $scope.profile.phone,
                    companyName: $scope.profile.companyName,
                    companyLocation: $scope.profile.companyLocation,
                    companyWebsite: $scope.profile.companyWebsite,
                    companyDescription: $scope.profile.companyDescription
                };

                ProfileService.updateProfile(profileData)
                    .then(function(response) {
                        $scope.profile = response.data.data;
                        $scope.message = 'Profile updated successfully!';
                        $scope.messageType = 'success';
                        $scope.editMode = false;
                        $scope.saving = false;
                        
                        // Clear message after 3 seconds
                        setTimeout(function() {
                            $scope.$apply(function() {
                                $scope.message = '';
                            });
                        }, 3000);
                    })
                    .catch(function(error) {
                        $scope.message = error.data?.message || 'Error updating profile';
                        $scope.messageType = 'error';
                        $scope.saving = false;
                    });
            };

            // Cancel edit
            $scope.cancelEdit = function() {
                $scope.editMode = false;
                $scope.loadProfile();
                $scope.message = '';
            };

            // Load profile on controller init
            $scope.loadProfile();
        }
    ]);
