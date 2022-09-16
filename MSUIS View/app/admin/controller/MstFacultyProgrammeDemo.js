app.controller('MstFacultyProgrammeDemoCtrl',  function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $scope.NoRecordFound = false;
    var ProgCount = 0;
    $scope.showSaveBtn = false;
    $rootScope.pageTitle = "Manage MstFacultyProgrammeDemo";
    
    $scope.resetMstFacultyProgrammeDemo = function () {
        $scope.MstFacultyProgrammeDemo = {};
    };

    $scope.getMstFacultyProgrammeDemo= {};
    $scope.CheckChangeProg = {};

    $scope.getMstFacultyProgrammeDemo = function () {

        var data = new Object();

        $http({
            method: 'POST',
            url: 'api/MstFacultyProgrammeDemo/FacutlyProgrameDemoGet',
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

                    $scope.MstFacultyProgrammeDemoTableParams = new NgTableParams({
                    }, {
                        dataset: response.obj

                    });
                }

            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };
    
    $scope.resetUser = function () {
        $scope.user = {};
    }
    $scope.FacultyGet = function () {
        //alert("Faculty Details");
        $http({
            method: 'POST',
            url: 'api/MstFacultyProgrammeDemo/MstFacultyGet',
            data: $scope.MstFacultyProgrammeDemo,
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                $scope.FacultyList = response.obj;

                //$scope.TestCountry = {
                //};
            })
            .error(function (res) {
                //alert(res);
            });
    };

    
    $scope.MstProgrammeListGet = function () {

        $scope.checked = {};
        $http({
            method: 'POST',
            url: 'api/MstFacultyProgrammeDemo/MstProgrammeGetByFacultyId',
            data: $scope.MstFacultyProgrammeDemo,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code == "0") {
                    $state.go('login');
                }
                $rootScope.showLoading = false;

                if (response.response_code == "0") {
                    $state.go('login');
                }
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {

                            
                    $scope.ProgrammeList = response.obj;
                    $scope.NewProgLst = {};
                    NewProgLst = [];
                    ProgCount = 0;
                    for (key in Object.keys($scope.ProgrammeList)) {
                        if ($scope.ProgrammeList[key].ProgChecked == true) {

                            ProgCount = ProgCount + 1;
                            NewProgLst.push($scope.ProgrammeList[key]);
                        }

                    }
                    $scope.NewProgLst = NewProgLst;


                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    };



    $scope.CheckChangeProg = function (MstProgramme, checked) {
        //debugger;
        var i = 100;
        var j = i++ + ++i + ++i;
        console.log($scope.ProgrammeList);
        if (checked) {
            var ProgIndex = NewProgLst.map(function (item) { return item.Id; }).indexOf(MstProgramme.Id);


            if (ProgIndex >= 0) {
                NewProgLst[ProgIndex1].ProgChecked = true;

            }
            else if (ProgIndex < 0) {
                console.log(MstProgramme);
                MstProgramme.ProgChecked = true;
                NewProgLst.push(MstProgramme);

            }

        }
        else if (!(checked)) {
            //debugger;
            //console.log(MstProgramme.ProgrammeId);
            var ProgIndex1 = NewProgLst.map(function (item) { return item.Id; }).indexOf(MstProgramme.Id);
            NewProgLst[ProgIndex1].ProgChecked = false;



        }
        $scope.proglist = new Array();
        console.log(NewProgLst);
        for (var i in NewProgLst) {
            var obj = {};
            obj["ProgrammeId"] = NewProgLst[i].Id;
            obj["DemoFacutlyProgrameId"] = NewProgLst[i].DemoFacutlyProgrameId;
            obj["ProgChecked"] = NewProgLst[i].ProgChecked;
            $scope.proglist.push(obj);
        }
    };

    
    $scope.addMstFacultyProgrammeDemo = function () {

        //debugger;
        //$scope.MstFacultyProgrammeDemo.FacultyId = $localStorage.FacultyId;
        $scope.MstFacultyProgrammeDemo.ProgList = $scope.proglist;
        $http({
            method: 'POST',
            url: 'api/MstFacultyProgrammeDemo/MstFacultyProgrammeDemoAdd',
            data: $scope.MstFacultyProgrammeDemo,
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
                    $scope.getMstFacultyProgrammeDemo();
                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });





    };


});








