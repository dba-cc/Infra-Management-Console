app.controller('QueryHitCtrl', function ($scope, $http, NgTableParams, $timeout) {
    $scope.QueryHitParams = new NgTableParams({}, {});

    $scope.dropdown = function () {
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

        //var datetime = [
        //    '2023-02-01 14:47:08', '2023-02-01 14:47:37', '2023-02-01 14:47:40', '2023-02-01 14:47:46', '2023-02-01 14:47:48', '2023-02-01 14:47:50',
        //    '2023-02-01 14:47:57', '2023-02-01 14:47:57', '2023-02-01 14:47:59', '2023-02-01 14:48:14', '2023-02-01 14:48:16', '2023-02-01 14:48:22',
        //    '2023-02-01 14:49:08', '2023-02-01 14:49:37', '2023-02-01 14:49:40', '2023-02-01 14:49:46', '2023-02-01 14:49:48', '2023-02-01 14:49:50',
        //    '2023-02-01 14:49:57', '2023-02-01 14:49:57', '2023-02-01 14:49:59', '2023-02-01 14:49:14', '2023-02-01 14:49:16', '2023-02-01 14:49:22',
        //    '2023-02-01 14:50:08', '2023-02-01 14:50:37', '2023-02-01 14:50:40', '2023-02-01 14:50:46', '2023-02-01 14:50:48', '2023-02-01 14:50:50',
        //    '2023-02-01 14:50:57', '2023-02-01 14:50:57', '2023-02-01 14:50:59', '2023-02-01 14:51:14', '2023-02-01 14:51:16', '2023-02-01 14:51:22',
        //    '2023-02-01 14:51:08', '2023-02-01 14:51:37', '2023-02-01 14:51:40', '2023-02-01 14:51:46', '2023-02-01 14:51:48', '2023-02-01 14:51:50',
        //    '2023-02-01 14:51:57', '2023-02-01 14:51:57', '2023-02-01 14:51:59', '2023-02-01 14:52:14', '2023-02-01 14:52:16', '2023-02-01 14:52:22'
        //]
        //var lastWorkerTime = [
        //    1262, 1956, 1930, 1193, 1957, 1475, 1809, 3131, 1913, 1350, 2273, 1194, 1262, 1956, 1930, 1193, 1957, 1475, 1809, 3131, 1913, 1350, 2273,
        //    1194, 1262, 1956, 1930, 1193, 1957, 1475,1809,3131,9000,1350,2273,1194,1262,1956,1930,1193,1957,1475,1809, 3131, 1913, 1350, 2273, 1194
        //]
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
        hideLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '"' + $scope.timeFormat + ' ' + $scope.time + '"',
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

    $scope.initFetch = function () {
        hideLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQueryHit',
            data: '"HOUR 1"',
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