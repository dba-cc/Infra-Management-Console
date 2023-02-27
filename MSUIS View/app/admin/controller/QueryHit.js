app.controller('QueryHitCtrl', function ($scope, $interval, $http, NgTableParams, $timeout) {
    $scope.QueryHitParams = new NgTableParams({}, {});

    $scope.timeFormat = 'MINUTE'
    $scope.time = '1'
    $scope.db = 'Query'

    
    $scope.o=false;
    $scope.checkIt = function () {
        if (!$scope.check) {
            $scope.check = true;
            $('#freq').fadeIn();
            
            $scope.o = true;
        } else {
            $scope.check = false;   
            $('#freq').fadeOut();
            $scope.o = false;
            $interval.cancel($scope.p);
            /*$scope.item = "";*/
        }
        console.log($scope.check)          
    }
    $scope.refreq = function () {
        $scope.temp;
        console.log($scope.temp)
        if ($scope.o == true) {
           $scope.p = $interval(function () {
                console.log("it works")
                $scope.FetchQueryHitList();
            }, $scope.temp);
        }
    }
    
    $scope.dropdown = function () {
        $('.ui.dropdown').dropdown();
    }

    $scope.changeFormat = function () {
        document.getElementById('timeInput').placeholder = 'Number of ' + $scope.timeFormat + 's'
        document.getElementById('timeInputDiv').style.display = 'flex'
    }
 


    $scope.$watch("QueryHitParams.filter()", function (newFilter) {
        $timeout(function () {
            var filteredData = $scope.QueryHitParams.data;
            $scope.generateChart(filteredData)
        });
    }, true);


  /*  $scope.FetchQueryHitList = function () {

        if ($scope.time === undefined) {
            showMessage('Enter number of ' + $scope.timeFormat + 's to fetch queries!')
            return
        }
        *//*if (document.getElementById('dbname').value != "") {*//*
            $scope.db = document.getElementById('dbname').value;
       *//* }*//*
        *//*else {
            $scope.db = 'Query';
            document.getElementById('dbname').value = $scope.db;
        }*//*
        if (document.getElementById('dbname').value == '? undefined:undefined ?') {
            $scope.db = 'Query';
            document.getElementById('dbname').value = $scope.db;
            $scope.dropdown();
        }
        hideLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '"' + $scope.timeFormat + ' ' + $scope.time + ' ' + $scope.db +'"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    showMessage(response.obj);
                }
                else {
                    $scope.QueryHitParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj,
                    });
                    $scope.generateChart(response.obj)
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                showMessage(res.obj);
                hideLoadingScreen();
            });
    };*/
    $scope.FetchQueryHitList = function () {

        if ($scope.time === undefined) {
            showMessage('Enter number of ' + $scope.timeFormat + 's to fetch queries!')
            return
        }
        $scope.db = document.getElementById('dbname').value;
        if (document.getElementById('dbname').value == '? undefined:undefined ?') {
            $scope.db = 'Query';
            document.getElementById('dbname').value = $scope.db;
            $scope.dropdown();
        }
        hideLoadingScreen();

        var pageNum = 1; // set initial page number to 1
        var totalData = []; // create empty array to store all data
        
        function fetchPage(pageNum) {
            $http({
                method: 'POST',
                url: 'api/Analytics/GetQueryHit',
                data: '"' + $scope.timeFormat + ' ' + $scope.time + ' ' + $scope.db + ' ' + pageNum + '"',
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {
                    if (response.response_code != "200") {
                        showMessage(response.obj);
                    }
                    else {
                        
                        totalData = totalData.concat(response.obj.data);// append data to totalData array
                        if (response.obj.data.length > 0) { // if there is more data, fetch next page

                           
                            fetchPage(pageNum + 1);
                        } else { // if no more data, update table params with totalData
                            $scope.QueryHitParams = new NgTableParams({
                                count:totalData.length
                            }, {
                                dataset: totalData, 
                       
                            });
                            /*$scope.QueryHitParams.settings({
                                dataset: totalData,
                                counts: [] // disable page size options
                                
                            });*/
                            $scope.generateChart(totalData);
                        }
                    }
                    hideLoadingScreen();
                })
                .error(function (res) {
                    showMessage(res.obj);
                    hideLoadingScreen();
                });
        }

        fetchPage(pageNum); // start fetching first page
    };

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
    $scope.qhgraph = function (data) {
        showLoadingScreen();        
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQHGraph',
            data:'"'+data.ctime+'"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                   // $scope.DatabaseList = {};
                }
                else {
                   // $scope.DatabaseList = response.obj;
                    console.log(response.obj)
                    $scope.generateQueryChart(response.obj)
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    }

    $scope.generateQueryChart = function (data) {
        var datetime = data.map(function (obj) {
            return obj.time.trim();
        });
        var execution_count = data.map(function (obj) {
            return obj.execution_count;
        });
        console.log(data)

        const chartCanvas = document.getElementById('analytics-chart');
        if (typeof $scope.chart !== 'undefined') {
            $scope.chart.destroy();
        }
        $scope.chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: datetime,
                datasets: [{
                    label: ' Execution Count',
                    data: execution_count,
                    borderWidth: 3,
                    backgroundColor: '#27bc1a3b',
                    borderColor: '#20bb40ad',
                    fill: true
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutoutPercentage: 50,
                plugins: {
                    filler: {
                        propagate: false,
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            drag: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
            }
        });
    }


    $scope.generateChart = function (data) {
        var datetime = data.map(function (obj) {
            return obj.time.trim();
        });
        var lastWorkerTime = data.map(function (obj) {
            return obj.last_worker_time;
        });
        console.log(data)

        const chartCanvas = document.getElementById('analytics-chart');
        if (typeof $scope.chart !== 'undefined') {
            $scope.chart.destroy();
        }
        $scope.chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: datetime,
                datasets: [{
                    label: ' Last Worker Time (ms)',
                    data: lastWorkerTime,
                    borderWidth: 3,
                    backgroundColor: '#27bc1a3b',
                    borderColor: '#20bb40ad',
                    fill: true
                }]
            },
            options: {
                maintainAspectRatio: false,
                cutoutPercentage: 50,
                plugins: {
                    filler: {
                        propagate: false,
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                        },
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            drag: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        }
                    }
                },
                interaction: {
                    intersect: false,
                },
            }
        });
    }

    $scope.resetChart = function () {
        $scope.chart.resetZoom();
    }

  /*  $scope.showPopup = function (data) {
        $('#inputPopup').modal({
            context: '.parent-container'
        }).modal('show');
        document.getElementById('query').innerText = data

    }*/

    $scope.hidePopup = function () {
        $('#inputPopup').modal('hide');
    };
});