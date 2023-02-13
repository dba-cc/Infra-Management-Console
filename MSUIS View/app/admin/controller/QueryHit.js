app.controller('QueryHitCtrl', function ($scope, $http, $rootScope, $state, $cookies, $mdDialog, NgTableParams, $interval, $timeout) {

    $scope.QueryHitParams = new NgTableParams({}, {});

    $scope.dropdown = function() {
        $('.ui.dropdown').dropdown();
    }

    $scope.changeFormat = function () {
        document.getElementById('timeInput').placeholder = 'Number of ' + $scope.timeFormat + 's'
        document.getElementById('timeInputDiv').style.display = 'flex'
    }

    $scope.check = function () {
        if ($scope.query.querycount.$invalid) {
            $scope.Show = true;
        } else {
            $scope.Show = false;
            $scope.FetchQueryHitList();
        }
    };

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

    $scope.resetChart = function() {
        $scope.chart.resetZoom();
    }

    $scope.FetchQueryHitList = function () {
        if ($scope.time === undefined) {
            showMessage('Enter number of ' + $scope.timeFormat + 's to fetch queries!')
            return
        }
        $scope.db = document.getElementById('dbname').value;
        if (document.getElementById('dbname').value == '? undefined:undefined ?') {
            $scope.db = 'DBAdmin';
            document.getElementById('dbname').value = $scope.db;
            $scope.dropdown();
        }
        console.log($scope.db)
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
    $scope.initFetch = function () {
        hideLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '"HOUR 1 DBAdmin"',
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