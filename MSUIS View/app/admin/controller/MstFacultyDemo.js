app.controller('MstFacultyDemoCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Manage MstFacultyDemo";

    $scope.MstFacultyDemo = {};
    $scope.AppCount = 0;
    $scope.newDemoFacultyProgramme = {};

    var ProgrammeList = [];
    
    $scope.getDemoFacultyProgramme = function () {

        var data = new Object();
        //data.id = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/MstFacultyDemo/DemoFacultyProgrammeGet',
            data: data,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.DemoFacProgTableParams = new NgTableParams({
                    }, {
                            dataset: response.obj
                    });
                    //$scope.ProgrammeList1 = response.obj;
                    //let COUNT = 0;
                    //for (var i in $scope.ProgrammeList1) {
                        //COUNT = COUNT + 1;
                    //}
                    //$scope.newDemoFacultyProgramme.AddCOUNT = COUNT;
                    //if ($scope.ProgrammeList1[0] != undefined || $scope.ProgrammeList1[0] != null) {

                        //$scope.AppCount = $scope.ProgrammeList1[0].AppCount;

                    //}
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    $scope.getFacultyList = function () {

        $http({
            method: 'POST',
            url: 'api/MstFacultyDemo/MstFacultyGet',
            //data: $scope.FacultyInstituteMap,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.FacultyList = {};
                }
                else {
                    $scope.FacultyList = response.obj;
                }

            })
            .error(function (res) {

            });
    };

    $scope.getProgrammeList = function () {

        $http({
            method: 'POST',
            url: 'api/MstFacultyDemo/MstProgrammeGetByFacultyId',
            data: $scope.MstFacultyDemo,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.ProgList = {};
                }
                else {
                    $scope.ProgList = response.obj;
                }

            })
            .error(function (res) {

            });
    };

//    $scope.getUserList();

    $scope.addDemoFacultyProgramme = function () {

        //$scope.newUser.createdById = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/MstFacultyDemo/DemoFacultyProgrammeAdd',
            data: $scope.MstFacultyDemo,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.MstFacultyDemo = {};
                    $scope.getDemoFacultyProgramme();
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }

    

    $scope.modifyMstFacultyDemo = function (data) {
        
        $scope.ShowFormFlag = true;
        $scope.MstFacultyDemo = data;
        $scope.getFacultyList();
        $scope.getProgrammeList();
        $(window).scrollTop(0); 
    }

    $scope.editMstFacultyDemo = function () {

        $http({
            method: 'POST',
            url: 'api/MstFacultyDemo/DemoFacultyProgrammeEdit',
            data: $scope.MstFacultyDemo,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    alert(response.obj);
                    $scope.showFormFlag = false;
                    $scope.getDemoFacultyProgramme();
                    $scope.MstFacultyDemo = {};

                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };

    $scope.deleteMstFacultyDemo = function (ev, data) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete?')
            .textContent('')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        $mdDialog.show(confirm).then(function () {
            $scope.MstFacultyDemo = data;

            $http({
                method: 'POST',
                url: 'api/MstFacultyDemo/DemoFacultyProgrammeDelete',
                data: $scope.MstFacultyDemo,
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {

                    $rootScope.showLoading = false;
                    if (response.response_code == "0") {
                        $state.go('login');

                    } else if (response.response_code != "200") {
                        $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                    }
                    else {
                        alert(response.obj);
                        $scope.getDemoFacultyProgramme();
                    }
                })
                .error(function (res) {
                    $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                });

        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    $scope.EditMstFacultyDemo = function () {


        alert("Your Preference Number has been Stored Successfully");
        //var data = new Object();
        //data.id = $rootScope.id;

        $scope.newDemoFacultyProgramme.Data1 = $scope.ProgrammeList1;
        $http({
            method: 'POST',
            url: 'api/MstFacultyDemo/EditDemoFacultyProgramme',
            data: $scope.newDemoFacultyProgramme,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.getDemoFacultyProgramme();
                    $scope.InstPartList = $scope.ProgrammeList1;
                    $scope.flagdisable = true;
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });

    }
    $scope.getDemoFacultyProgramme();



    //var move = function (origin, destination) {
    //    var temp = $scope.ProgrammeList1[destination];
    //    $scope.ProgrammeList1[destination] = $scope.ProgrammeList1[origin];
    //    $scope.ProgrammeList1[origin] = temp;
    //};
    
    //$scope.moveUp = function (index) {
        //move(index, index - 1);
        //console.log(index);
        //console.log($scope.ProgrammeList1[index].preferenceNo);
        //console.log("=====1======");
        //console.log($scope.ProgrammeList1[index - 1].preferenceNo);

        //$scope.ProgrammeList1[index - 1].preferenceNo = $scope.ProgrammeList1[index - 1].preferenceNo - 1;
        //$scope.ProgrammeList1[index].preferenceNo = $scope.ProgrammeList1[index].preferenceNo + 1;

        //console.log($scope.ProgrammeList1[index].preferenceNo);
        //console.log("=====2======");
        //console.log($scope.ProgrammeList1[index - 1].preferenceNo);
    //};
    
    //$scope.moveDown = function (index) {
    //    move(index, index + 1);
    //    //console.log(index);
    //    //console.log($scope.ProgrammeList1[index].preferenceNo);
    //    //console.log("=====1======");
    //    //console.log($scope.ProgrammeList1[index + 1].preferenceNo);

    //    $scope.ProgrammeList1[index + 1].preferenceNo = $scope.ProgrammeList1[index + 1].preferenceNo + 1;
    //    $scope.ProgrammeList1[index].preferenceNo = $scope.ProgrammeList1[index].preferenceNo - 1;

    //    //console.log($scope.ProgrammeList1[index].preferenceNo);
    //    //console.log("=====2======");
    //    //console.log($scope.ProgrammeList1[index + 1].preferenceNo);
    //}
    
    

});