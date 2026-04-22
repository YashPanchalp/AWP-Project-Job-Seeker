// Home Controller
angular.module('jobSeekerApp')
.controller('HomeController', ['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  $scope.heroImageUrl = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80';
  $scope.searchQuery = '';
  $scope.activeAudience = 'jobseeker';

  $scope.audienceCards = [
    {
      key: 'jobseeker',
      label: 'For Job Seekers',
      title: 'Find roles that fit your skills',
      description: 'Browse openings, apply quickly, and keep your applications organized in one place.',
      accent: 'badge-primary'
    },
    {
      key: 'admin',
      label: 'For Company Admins',
      title: 'Post vacancies and review applicants',
      description: 'Publish jobs, manage candidates, and build your hiring pipeline faster.',
      accent: 'badge-success'
    }
  ];

  $scope.featuredHighlights = {
    jobseeker: [
      {
        icon: '🔍',
        title: 'Smart search',
        description: 'Filter jobs by role, location, and experience level.'
      },
      {
        icon: '📝',
        title: 'Fast apply',
        description: 'Use your profile to submit applications in a few clicks.'
      },
      {
        icon: '📊',
        title: 'Track progress',
        description: 'See where every application stands at a glance.'
      }
    ],
    admin: [
      {
        icon: '📣',
        title: 'Post jobs',
        description: 'Create polished openings with salary and requirements.'
      },
      {
        icon: '👥',
        title: 'Review applicants',
        description: 'Shortlist, reject, or accept candidates with clarity.'
      },
      {
        icon: '🏢',
        title: 'Manage profile',
        description: 'Show your company story, website, and location.'
      }
    ]
  };

  $scope.featuredJobs = [
    { title: 'Frontend Developer', company: 'Nova Digital', location: 'Remote', type: 'Full-time' },
    { title: 'Data Analyst', company: 'Apex Insights', location: 'Bangalore', type: 'Hybrid' },
    { title: 'UI/UX Designer', company: 'Studio Wave', location: 'Delhi', type: 'Contract' },
    { title: 'Backend Engineer', company: 'Cloud Forge', location: 'Remote', type: 'Full-time' }
  ];

  $scope.testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      text: 'Found my dream job within 2 weeks! The platform is user-friendly and the opportunities are endless.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Data Analyst',
      company: 'Data Systems Inc',
      text: 'Great experience! Landed a perfect role that matched my skills perfectly.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'Creative Studios',
      text: 'Best job platform I\'ve used. Highly recommend to anyone looking for opportunities.',
      rating: 5
    }
  ];

  $scope.setAudience = function(audience) {
    $scope.activeAudience = audience;
  };

  $scope.getHighlights = function() {
    return $scope.featuredHighlights[$scope.activeAudience] || [];
  };

  $scope.getPrimaryActionLabel = function() {
    if (AuthService.isAuthenticated()) {
      return $scope.activeAudience === 'admin' ? 'Go to Dashboard' : 'Browse Jobs';
    }

    return $scope.activeAudience === 'admin' ? 'Create Admin Account' : 'Create Free Account';
  };

  $scope.handlePrimaryAction = function() {
    if (AuthService.isAuthenticated()) {
      $location.path($scope.activeAudience === 'admin' ? '/admin/dashboard' : '/jobs');
      return;
    }

    $location.path('/register');
  };

  $scope.searchJobs = function() {
    if ($scope.searchQuery?.trim()) {
      $location.path('/jobs').search({ q: $scope.searchQuery.trim() });
      return;
    }

    $location.path('/jobs');
  };

  $scope.goToLogin = function() {
    $location.path('/login');
  };

  $scope.goToRegister = function() {
    $location.path('/register');
  };

  $scope.goToJobs = function() {
    if (AuthService.isAuthenticated()) {
      $location.path('/jobs');
    } else {
      $location.path('/register');
    }
  };
}]);
