// Main AngularJS Application Module
angular.module('jobSeekerApp', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    // Home route
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      data: {
        publicRoute: true
      }
    })
    // Auth routes
    .when('/login', {
      templateUrl: 'views/auth/login.html',
      controller: 'LoginController',
      data: {
        publicRoute: true
      }
    })
    .when('/register', {
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterController',
      data: {
        publicRoute: true
      }
    })
    // Job Seeker routes
    .when('/jobs', {
      templateUrl: 'views/jobseeker/job-listings.html',
      controller: 'JobListingsController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth();
        }]
      }
    })
    .when('/jobs/:id', {
      templateUrl: 'views/jobseeker/job-detail.html',
      controller: 'JobDetailController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth();
        }]
      }
    })
    .when('/apply/:jobId', {
      templateUrl: 'views/jobseeker/apply-job.html',
      controller: 'ApplyJobController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth();
        }]
      }
    })
    .when('/my-applications', {
      templateUrl: 'views/jobseeker/my-applications.html',
      controller: 'MyApplicationsController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth();
        }]
      }
    })
    .when('/profile', {
      templateUrl: 'views/jobseeker/profile.html',
      controller: 'ProfileController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth();
        }]
      }
    })
    // Admin routes
    .when('/admin/dashboard', {
      templateUrl: 'views/admin/dashboard.html',
      controller: 'AdminDashboardController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth('admin');
        }]
      }
    })
    .when('/admin/post-job', {
      templateUrl: 'views/admin/post-job.html',
      controller: 'PostJobController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth('admin');
        }]
      }
    })
    .when('/admin/jobs/:id/applicants', {
      templateUrl: 'views/admin/applicants.html',
      controller: 'ApplicantsController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth('admin');
        }]
      }
    })
    .when('/admin/jobs/:id/edit', {
      templateUrl: 'views/admin/edit-job.html',
      controller: 'EditJobController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth('admin');
        }]
      }
    })
    .when('/admin/profile', {
      templateUrl: 'views/admin/profile.html',
      controller: 'AdminProfileController',
      data: {
        requiresAuth: true
      },
      resolve: {
        auth: ['AuthService', function(AuthService) {
          return AuthService.checkAuth('admin');
        }]
      }
    })
    .otherwise({
      redirectTo: '/home'
    });

  $locationProvider.hashPrefix('');
}])

.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
  
  // Initialize auth state
  const updateAuthState = function() {
    $rootScope.currentUser = AuthService.getCurrentUser();
    $rootScope.isLoggedIn = AuthService.isAuthenticated();
  };

  // Handle route change start - check if route requires auth
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    const requiresAuth = !!next?.$$route?.data?.requiresAuth;

    if (requiresAuth && !AuthService.isAuthenticated()) {
      event.preventDefault();
      $location.path('/login');
    }
  });

  // Update on route change success
  $rootScope.$on('$routeChangeSuccess', function() {
    updateAuthState();
  });

  // Handle route change error  
  $rootScope.$on('$routeChangeError', function(event, next, current, rejection) {
    console.error('Route change error:', rejection);
    if (!AuthService.isAuthenticated()) {
      $location.path('/login');
    }
  });

  // Watch for authentication changes
  $rootScope.$watch(function() {
    return AuthService.isAuthenticated();
  }, function(newVal) {
    if (newVal) {
      $rootScope.currentUser = AuthService.getCurrentUser();
      $rootScope.isLoggedIn = true;
    } else {
      $rootScope.currentUser = null;
      $rootScope.isLoggedIn = false;
    }
  });

  // Logout function
  $rootScope.logout = function() {
    AuthService.logout();
    $rootScope.currentUser = null;
    $rootScope.isLoggedIn = false;
    $location.path('/login');
  };

  // Initial check
  updateAuthState();
}]);
