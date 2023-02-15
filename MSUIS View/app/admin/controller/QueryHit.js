app.controller('QueryHitCtrl', function ($scope, $interval, $http, NgTableParams, $timeout) {
    $scope.QueryHitParams = new NgTableParams({}, {});

    $scope.timeFormat = 'HOUR'
    $scope.time = '1'
    $scope.db = 'Query'

    
    $scope.o=false;
    $scope.checkIt = function () {
        if (!$scope.check) {
            $scope.check = true;
            document.getElementById('freq').style.display = 'flex'  
            $scope.o = true;
        } else {
            $scope.check = false;   
            document.getElementById('freq').style.display = 'none'
            $scope.o = false;
            $interval.cancel(p);
            /*$scope.item = "";*/
        }
        console.log($scope.check)          
    }
    $scope.refreq = function () {
        $scope.temp;
        console.log($scope.temp)
        if ($scope.o == true) {
           var p= $interval(function () {
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

    $scope.generateChart = function (data) {
        var datetime = data.map(function (obj) {
            return obj.time.trim();
        });
        var lastWorkerTime = data.map(function (obj) {
            return obj.last_worker_time;
        });

       
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
                    }, {
                        dataset: response.obj
                    });
                    $scope.generateChart(response.obj)
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                showMessage(res.obj);
                hideLoadingScreen();
            });
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

    $scope.showPopup = function (data) {
        $('#inputPopup').modal({
            context: '.parent-container'
        }).modal('show');
        document.getElementById('query').innerText = data
    }

    $scope.hidePopup = function () {
        $('#inputPopup').modal('hide');
    };
});