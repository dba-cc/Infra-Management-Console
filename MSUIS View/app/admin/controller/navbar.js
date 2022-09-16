app.controller('navbarCtrl', function ($mdDialog, $scope, $http, $rootScope, $state, $cookies) {

    if ($cookies.get("id") != "undefined" && $cookies.get("id") != null && $cookies.get("id") != "") {
        $rootScope.name = $cookies.get("name");
        $rootScope.id = $cookies.get("id");
        $rootScope.adminAuditor = $cookies.get("AdminAuditorFlag");
    }

    $scope.logout = function () {
        $cookies.remove("id");
        $cookies.remove("name");

        $state.go('login');
    };

    $scope.$on('dialog', function (event, title, type, msg, ev) {

        if (type === "alert" && ev === undefined) {
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title(title)
                  .textContent(msg)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Got it!')
              );
        }
        if (type === "alert" && ev != undefined) {
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title(title)
                  .textContent(msg)
                  .ariaLabel('Alert Dialog Demo')
                  .targetEvent(ev)
                  .ok('Got it!')
              );
        }
        else if (type === "prompt" && ev === undefined) {
            $mdDialog.confirm()
              .title(title)
              .textContent(msg)
              .ariaLabel('Lucky day')
              .ok('Ok')
              .cancel('Cancel');
        }
        else if (type === "prompt" && ev != undefined) {
            $mdDialog.confirm()
              .title(title)
              .textContent(msg)
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Ok')
              .cancel('Cancel');
        }

    });

});