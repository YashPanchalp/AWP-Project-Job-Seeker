// Login Controller
angular.module('jobSeekerApp')
.controller('LoginController', ['$scope', '$location', '$rootScope', 'AuthService', 
function($scope, $location, $rootScope, AuthService) {
  
  $scope.formData = {};
  $scope.loading = false;
  $scope.message = '';
  $scope.messageType = '';

  $scope.login = function() {
    if (!$scope.formData.email || !$scope.formData.password) {
      $scope.message = 'Please fill in all fields';
      $scope.messageType = 'error';
      return;
    }

    $scope.loading = true;
    AuthService.login($scope.formData).then(function(response) {
      $scope.loading = false;
      const user = response.data.user;
      
      // Update root scope
      $rootScope.currentUser = user;
      $rootScope.isLoggedIn = true;
      
      // Redirect based on role
      if (user.role === 'admin') {
        $location.path('/admin/dashboard');
      } else {
        $location.path('/jobs');
      }
    }, function(error) {
      $scope.loading = false;
      $scope.message = error.data?.message || 'Login failed';
      $scope.messageType = 'error';
    });
  };

  $scope.goToRegister = function() {
    $location.path('/register');
  };
}]);

// Register Controller
angular.module('jobSeekerApp')
.controller('RegisterController', ['$scope', '$location', '$rootScope', 'AuthService', 
function($scope, $location, $rootScope, AuthService) {
  
  $scope.formData = {};
  $scope.loading = false;
  $scope.message = '';
  $scope.messageType = '';

  $scope.register = function() {
    // Validation
    if (!$scope.formData.name || !$scope.formData.email || !$scope.formData.password || !$scope.formData.confirmPassword || !$scope.formData.role) {
      $scope.message = 'Please fill in all fields';
      $scope.messageType = 'error';
      return;
    }

    if (!$scope.formData.email.includes('@')) {
      $scope.message = 'Please enter a valid email';
      $scope.messageType = 'error';
      return;
    }

    if ($scope.formData.password.length < 6) {
      $scope.message = 'Password must be at least 6 characters';
      $scope.messageType = 'error';
      return;
    }

    $scope.loading = true;
    AuthService.register($scope.formData).then(function(response) {
      $scope.loading = false;
      $scope.message = response.data.message;
      $scope.messageType = 'success';
      
      // Store user and token
      const user = response.data.user;
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      // Update root scope
      $rootScope.currentUser = user;
      $rootScope.isLoggedIn = true;
      
      // Redirect after 2 seconds
      setTimeout(function() {
        if (user.role === 'admin') {
          $location.path('/admin/dashboard');
        } else {
          $location.path('/jobs');
        }
      }, 2000);
    }, function(error) {
      $scope.loading = false;
      $scope.message = error.data?.message || 'Registration failed';
      $scope.messageType = 'error';
    });
  };

  $scope.goToLogin = function() {
    $location.path('/login');
  };
}]);
