app.controller('IndexingCtrl', function ($scope, $http, $rootScope, NgTableParams, $timeout) {
    $rootScope.pageTitle = "Index Analytics";
    //$scope.IndexParams = new NgTableParams({}, {});
    $scope.showIndexTableflag = false;

    $scope.dropdownDatabase = function () {
        $('#dbDropdown').dropdown();
    }
    $scope.dropdown = function () {
        $('#formatInputDiv').dropdown();
    }

    

    $scope.Percent = false;
    $scope.Sugg = false;
    $scope.changeType = function () {
        if ($scope.index_type == 'Percent') {
            $scope.Percent = true;
            $scope.Sugg = false;
            $scope.GetIndexPer();
        } else {
            $scope.Percent = false;
            $scope.Sugg = true;
            $scope.GetIndexSugg();
        }
    }

    $scope.resetAll = function () {
        $scope.Percent = false;
        $scope.Sugg = false;
        $scope.index_type = null;
        document.querySelectorAll('.ui.dropdown > .text')[1].innerText = 'Select Type'
    }

    $scope.$watch('IndexParams.filter()', function () {
        $timeout(function () {
            $('.ui.indicating.progress').progress();
        }, 500);
    }, true);

    $scope.getDatabaseList = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/GetDatabase',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.DatabaseList = {};
                }
                else {
                    $scope.DatabaseList = response.obj;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });

    };

    $scope.GetIndexPer = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetIndexPercentage',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {

                    $scope.IndexParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    showIndexTableflag = true
                    $timeout(function () {
                        $('.ui.indicating.progress').progress();
                    }, 500);
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }
    $scope.showdeletePopup = function (data) {
       $scope.obj=data;
        $('.deletePopup').modal({
            context: '#parent-container'
        }).modal('show');
    }

    $scope.deleteIndex = function (data) {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/DeleteIndex',
            data: {
                "dbName": $scope.Database.name,
                "indexname": $scope.obj.indexname,
                "tablename": $scope.obj.tablename
            },
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {

                    $scope.DeleteIndexparams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    showMessage(response.obj)
                    $scope.hidedeletePopup()
                }
                $scope.GetIndexPer()
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }
   

    $scope.hidedeletePopup = function () {
        $('.deletePopup').modal('hide');
    };
    $scope.createformat = {
        "indexname": "",
        "whereCols": "",
        "includedcol": "",
        "onlineFlag": 1
    }

    $scope.showcreatePopup = function (data) {
        $scope.cobj = data;
        console.log(data.Index_Advantage)
        if (data.Index_Advantage < 500) {
            document.getElementById('warning').style.display = 'block'
        }
        var index=document.getElementById('indexname').value = 'IX_'+data.tablename
        $scope.createformat["indexname"] = index
        if (data.inequalitycol === '---') {
           var wr= document.getElementById('EIcolumnsname').value = data.equalitycol
            $scope.createformat["whereCols"] =wr
        }
        else {
            var wr = document.getElementById('EIcolumnsname').value = data.equalitycol + ',' + data.inequalitycol
            $scope.createformat["whereCols"] = wr
        } if (data.inequalitycol === '---') {
        } else {
           var col= document.getElementById('columnsname').value = data.includedcol
            $scope.createformat["includedcol"] = col
        }
        console.log($scope.cobj)
        $('.createPopup').modal({
            context: '#parent-container',
            onHidden: function () {
                document.getElementById('indexname').value = '';
                document.getElementById('EIcolumnsname').value = '';
                document.getElementById('columnsname').value = '';
            }
        }).modal('show');
    }

    $scope.createIndex = function (data) {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/CreateIndex',
            data: {
                "dbName": $scope.Database.name,
                "indexname": $scope.createformat["indexname"],
                "whereCols": $scope.createformat["whereCols"],
                "includedcol": $scope.createformat["includedcol"],
                "tablename": $scope.cobj.tablename,
                "onlineFlag":1
            },
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {

                    $scope.CreateIndexparams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    showMessage(response.obj)
                    $scope.hidedeletePopup()
                }

                $scope.hidecreatePopup();
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }

    $scope.hidecreatePopup = function () {
        $('.createPopup').modal('hide');
        hideLoadingScreen();
    };

    $scope.$watch('IndexSuggParams.filter()', function () {
        $timeout(function () {
            $('.ui.indicating.progress').progress();
        }, 500);
    }, true);
    
    $scope.GetIndexSugg = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetIndexSuggestions',
            data: '"' + $scope.Database.name + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.IndexSuggParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    $timeout(function () {
                        $('.ui.indicating.progress').progress();
                    }, 500);
                    showIndexTableflag = true
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }
});