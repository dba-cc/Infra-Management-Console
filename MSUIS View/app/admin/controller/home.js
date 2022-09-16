app.controller('homeCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog) {

    $rootScope.pageTitle = "Dashboard";

    //$rootScope.showLoading = false;
    //$rootScope.id = $cookies.get("paramarshid");
    //$rootScope.role = $cookies.get("paramarshrole");
    //$rootScope.paramarshId = $cookies.get("paramarshid");
    //$rootScope.eventId = $cookies.get("eventid");
    //if ($rootScope.id === null || $rootScope.id === undefined || $rootScope.id === "") {
    //    $state.go('index');
    //}

    $scope.notificationList = [
        {
            title: " participants",
            time: " 4 minutes ago"
        },
        {
            title: " events",
            time: " 8 minutes ago"
        },
        {
            title: " operations",
            time: " 15 minutes ago"
        }
    ];

    //$scope.getParamarshDetail = function () {

    //    var xml = new Object();
    //    xml.id = $rootScope.id;
    //    $http({
    //        method: 'POST',
    //        url: 'http://paramarsh.cuttingedgeinfotech.com.com/api/admin/getUserDetail',
    //        data: xml,
    //        headers: { "Content-Type": 'application/json' }
    //    })
    //        .success(function (response) {
    //            $scope.showAddUserLoading = false;

    //            if (response.response_code != "200") {
    //                $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
    //            }
    //            else {
    //                $scope.userInfo = response.obj;
    //                $scope.getParamarshDetail();
    //            }
    //        })
    //        .error(function (res) {
    //            $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
    //        });
    //}
    //$scope.getParamarshDetail();

    //$scope.getEventDetail = function () {

    //    var xml = new Object();
    //    xml.id = $rootScope.id;
    //    $http({
    //        method: 'POST',
    //        url: 'http://paramarsh.cuttingedgeinfotech.com.com/api/admin/getEventDetail',
    //        data: $scope.userInfo,
    //        headers: { "Content-Type": 'application/json' }
    //    })
    //        .success(function (response) {
    //            $scope.showAddUserLoading = false;

    //            if (response.response_code != "200") {
    //                $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
    //            }
    //            else {
    //                $scope.EventInfo = response.obj;

    //            }
    //        })
    //        .error(function (res) {
    //            $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
    //        });
    //}

    $scope.redirectToParticipants = function () {
        $state.go('participants');
    }

    $scope.redirectToOnlineTestLink = function () {
        $state.go('onlineTestLink');
    }

    $scope.redirectToEvent = function () {
        $state.go('event');
    }


    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: 'purchaseSmsCreditsCtrl',
            templateUrl: 'purchasesmscredits.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })

    };


});

app.controller("purchaseSmsCreditsCtrl", function ($scope, $mdDialog) {


    $scope.calculateAmount = function () {
        $scope.amount = $scope.purchaseUnits * 2;
    };


    $scope.purchase = function () {

        //webservice
    };

    $scope.cancel = function () {
        $mdDialog.hide();
    };
});