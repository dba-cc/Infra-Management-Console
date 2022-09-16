app.controller('usersCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams) {

    $rootScope.pageTitle = "Manage Users";

    $scope.userTypeList = [
        {
            id: "1",
            name: "Admin"
        },
        {
            id: "2",
            name: "Account"
        },
        {
            id: "1",
            name: "Employee"
        }
    ];

    $scope.userList = [
        {
            id: "1",
            name: "Dhruv",
            email: "dhruv@gmail.com",
            mobile: "0000000000",
            status: true
        },
        {
            id: "2",
            name: "Anish",
            email: "anish@gmail.com",
            mobile: "1111111111",
            status: true
        },
        {
            id: "3",
            name: "Keval",
            email: "keval@gmail.com",
            mobile: "1111100000",
            status: false
        },
    ];

    $scope.userTableParams = new NgTableParams({
    }, {
            dataset: $scope.userList
    });

    $scope.resetUser = function () {
        $scope.user = {};
    }

    $scope.updateAdmin = function () {

        var data = new Object();
        data.id = $rootScope.id;

        $http({
            method: 'POST',
            url: 'api/Admin/updateAdmin',
            data: data,
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                $rootScope.showLoading = false;

                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {


                }
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
            });
    }
    $scope.updateAdmin();

    $scope.saveFiles = function () {
        $scope.showAttendanceLoading = true;
        var data = new FormData();
        if (!angular.isUndefined($scope.files)) {
            {
                for (var i in $scope.files) {
                    data.append("uploadedFile", $scope.files[i]);
                }

                // ADD LISTENERS.
                var objXhr = new XMLHttpRequest();
                objXhr.addEventListener("load", transferCompleteUpload, false);

                // SEND FILE DETAILS TO THE API.
                $rootScope.showCover = true;
                objXhr.open("POST", "http://localhost:55429/api/fileupload/UploadFiles/");
                objXhr.send(data);

                function transferCompleteUpload() {
                    if (objXhr.status == "200") {

                        var xml = new Object();

                        //For Multiple Files Upload
                        xml.files = JSON.parse(objXhr.responseText);

                        //$http({
                        //    method: 'POST',
                        //    url: 'api/Admin/saveImages',
                        //    data: xml,
                        //    headers: { "Content-Type": 'application/json' }
                        //})
                        //    .success(function (response) {
                        //        if (response.response_code != "200") {
                        //            $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                        //        }
                        //        else {
                        //            ngToast.create("Product Details Saved Successfully.");
                        //            $scope.files = [];
                        //        }

                        //        $scope.cancelProduct();
                        //        $scope.getProductList();

                        //        $scope.showAttendanceLoading = false;
                        //    })
                        //    .error(function (res) {
                        //        $scope.showAttendanceLoading = false;

                        //        $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                        //    });

                    } else {
                        alert('Getting error while uploading file.');
                    }
                }
                $rootScope.showCover = false;

            }
            //else {
            //    $rootScope.showCover = false;
            //    alert('Only .xlsx (Excel) files are allowed !');
            //}
        }
        else {
            $scope.cancelProduct();
            $scope.getProductList();
        }
        $scope.showAttendanceLoading = false;

    };

    $scope.files = [];
    // GET THE FILE INFORMATION.
    getFileDetails = function (e) {

        //alert("s");
        //Console.log('file data... ' + e.files);
        //$scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i]);

            }

        });
    };


    $scope.saveFile = function () {
        $scope.showAttendanceLoading = true;
        var data = new FormData();
        if (!angular.isUndefined($scope.files)) {
            if ($scope.imageFile.name.split('.')[1] === "png" || $scope.imageFile.name.split('.')[1] === "jpg" || $scope.imageFile.name.split('.')[1] === "jpeg") 
            {
                data.append("uploadedFile", $scope.imageFile);

                // ADD LISTENERS.
                var objXhr = new XMLHttpRequest();
                objXhr.addEventListener("load", transferCompleteUpload, false);

                // SEND FILE DETAILS TO THE API.
                $rootScope.showCover = true;
                objXhr.open("POST", "http://localhost:55429/api/fileupload/UploadFiles/");
                objXhr.send(data);

                function transferCompleteUpload() {
                    if (objXhr.status == "200") {

                        var xml = new Object();

                        //For Single File Upload
                        xml.file = objXhr.responseText;

                        //$http({
                        //    method: 'POST',
                        //    url: 'api/Admin/saveImages',
                        //    data: xml,
                        //    headers: { "Content-Type": 'application/json' }
                        //})
                        //    .success(function (response) {
                        //        if (response.response_code != "200") {
                        //            $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                        //        }
                        //        else {
                        //            ngToast.create("Product Details Saved Successfully.");
                        //            $scope.files = [];
                        //        }

                        //        $scope.cancelProduct();
                        //        $scope.getProductList();

                        //        $scope.showAttendanceLoading = false;
                        //    })
                        //    .error(function (res) {
                        //        $scope.showAttendanceLoading = false;

                        //        $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                        //    });

                    } else {
                        alert('Getting error while uploading file.');
                    }
                }
                $rootScope.showCover = false;

            }
            //else {
            //    $rootScope.showCover = false;
            //    alert('Only .xlsx (Excel) files are allowed !');
            //}
        }
        else {
            $scope.cancelProduct();
            $scope.getProductList();
        }
        $scope.showAttendanceLoading = false;

    };
});