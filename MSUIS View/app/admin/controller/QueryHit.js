app.controller('QueryHitCtrl', function ($scope, $interval, $http, NgTableParams, $timeout) {
    $scope.QueryHitParams = new NgTableParams({}, {});

    $scope.filterType = 'rel';
    $scope.timeFormat = 'MINUTE'
    $scope.time = '1'
    $scope.db = 'Query'

    $scope.o = false;
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
            document.getElementById('freq').value = "";
            /$scope.item = "";/
        }
    }
    $scope.refreq = function () {
        $scope.temp;
        if ($scope.o == true) {
            $scope.p = $interval(function () {
                $scope.filterQueries();
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
          //*if (document.getElementById('dbname').value != "") {//*
              $scope.db = document.getElementById('dbname').value;
         // }//
          *//*else {
        $scope.db = 'Query';
        document.getElementById('dbname').value = $scope.db;
    }//
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

    $scope.FetchQueryHitListWithAbs = function () {
        showLoadingScreen();

        $scope.db = document.getElementById('dbname').value;
        if (document.getElementById('dbname').value == '? undefined:undefined ?') {
            $scope.db = 'Query';
            document.getElementById('dbname').value = $scope.db;
            $scope.dropdown();
        }

        var pageNum = 1; // set initial page number to 1
        var totalData = []; // create empty array to store all data
        function fetchPage(pageNum) {
            $http({
                method: 'POST',
                url: 'api/Analytics/GetQueryHitWithAbsRange',
                data: '"' + document.getElementById('fromDate').value + ' ' + document.getElementById('toDate').value + ' ' + $scope.db + ' ' + pageNum + '"',
                headers: { "Content-Type": 'application/json' }
            })
                .success(function (response) {
                    if (response.response_code != "200") {

                        showMessage(response.obj);

                    }
                    else {

                        totalData = totalData.concat(response.obj.data);// append data to totalData array
                        if (response.obj.data.length > 0) { // if there is more data, fetch next page

                            setTimeout(function () {
                                fetchPage(pageNum + 1);
                            }, 0)

                        } else { // if no more data, update table params with totalData
                            $scope.QueryHitParams = new NgTableParams({
                                count: totalData.length
                            }, {
                                dataset: totalData,

                            });
                            $scope.generateChart(totalData);
                            hideLoadingScreen();

                        }
                    }

                })
                .error(function (res) {
                    showMessage(res.obj);
                    hideLoadingScreen();
                });
        }

        fetchPage(pageNum); // start fetching first page
    };

    $scope.FetchQueryHitList = function () {
        showLoadingScreen();
        $scope.changeView('half', null)
        $scope.db = document.getElementById('dbname').value;
        if (document.getElementById('dbname').value == '? undefined:undefined ?') {
            $scope.db = 'Query';
            document.getElementById('dbname').value = $scope.db;
            $scope.dropdown();
        }


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
                           
                            setTimeout(function () {
                                fetchPage(pageNum + 1);
                            },0)
                            
                        } else { // if no more data, update table params with totalData
                            $scope.QueryHitParams = new NgTableParams({
                                count: totalData.length
                            }, {
                                dataset: totalData,

                            });
                            $scope.generateChart(totalData);
                            hideLoadingScreen();

                        }
                    }

                })
                .error(function (res) {
                    showMessage(res.obj);
                    hideLoadingScreen();
                });
        }

        fetchPage(pageNum); // start fetching first page
    };

    $scope.getDatabaseList = function () {

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
                //hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };
    $scope.activator = null;

    $scope.toggleCheckbox = function (e) {
        //  angular.element(e.currentTarget.children)[0].click();
        if ($scope.activator != null) {
            //$scope.activator = null;
            $scope.activator.classList.remove('activerow');
        }
        $scope.activator = e.currentTarget.parentNode;
        e.currentTarget.parentNode.classList.add('activerow');
    }

    $scope.qhgraph = function (data) {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetQHGraph',
            data: '"' + data.ctime + ',' + data.dbname +'"',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    // $scope.DatabaseList = {};
                }
                else {
                    // $scope.DatabaseList = response.obj;

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
                responsive: true,
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

    $scope.toggleChart = function () {
        document.getElementsByClassName('chart-item')[0].style.height = 'auto'
        if (document.getElementById('chart-parent').style.padding != '0px') {
            document.getElementById('chart-parent').style.padding = 0;
            $('#chart-parent').animate({
                height: "50px"
            });
            document.getElementsByClassName('down')[0].classList.add('up');
            document.getElementsByClassName('down')[0].classList.remove('down');
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '76vh';
        } else {
            document.getElementById('chart-parent').style.padding = '15px';
            $('#chart-parent').animate({
                height: "35vh"
            });
            document.getElementsByClassName('up')[0].classList.add('down');
            document.getElementsByClassName('up')[0].classList.remove('up');
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '46vh';
        }
        $('#resetChartButton').fadeToggle();
    }

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
                responsive: true,
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

    $scope.showPopup = function () {
          $('#inputPopup').modal({
              context: '.parent-container'
          }).modal('show');  
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        var day = ('0' + currentDate.getDate()).slice(-2);
        document.getElementById('fromDate').max = year + '-' + month + '-' + day;
        document.getElementById('toDate').max = year + '-' + month + '-' + day;
      }

    $scope.toggleFilterType = function (type) {
        if (type == 'abs') {
            document.getElementById('rel-div').style.borderColor = 'lightgray'
            document.getElementById('abs-div').style.borderColor = 'green'
            document.getElementById('fromDate').disabled = false
            document.getElementById('toDate').disabled = false
            document.getElementById('timeInput').disabled = true
            document.getElementById('formatInputDiv').style.pointerEvents = 'none'
            $('#formatInputDiv').removeClass('green')
        } else {
            document.getElementById('abs-div').style.borderColor = 'lightgray'
            document.getElementById('rel-div').style.borderColor = 'green'
            document.getElementById('fromDate').disabled = true
            document.getElementById('toDate').disabled = true
            document.getElementById('timeInput').disabled = false
            document.getElementById('formatInputDiv').style.pointerEvents = 'auto'
            $('#formatInputDiv').addClass('green')
        }
    } 

    $scope.filterQueries = function () { 
        if (document.getElementsByName('filtertype')[0].checked) {
            $scope.filterType = 'rel'
        } else {
            $scope.filterType = 'abs'
        }
        if ($scope.filterType == 'abs') {
            if (document.getElementById('fromDate').value == '' || document.getElementById('toDate').value == '') {
                showMessage('Enter date range!');
                return;
            }
            var fromDate = new Date($scope.fromDate);
            var year = fromDate.getFullYear();
            var month = ('0' + (fromDate.getMonth() + 1)).slice(-2);
            var day = ('0' + fromDate.getDate()).slice(-2);
            $scope.fromDate = year + '-' + month + '-' + day;

            var toDate = new Date($scope.toDate);
            var year = toDate.getFullYear();
            var month = ('0' + (toDate.getMonth() + 1)).slice(-2);
            var day = ('0' + toDate.getDate()).slice(-2);
            $scope.toDate = year + '-' + month + '-' + day;
            $scope.hidePopup();
            $scope.FetchQueryHitListWithAbs();
        } else {
            if ($scope.time === undefined) {
                showMessage('Enter number of ' + $scope.timeFormat + 's to fetch queries!')
                return
            }
            $scope.hidePopup();
            $scope.FetchQueryHitList();
        }
    }

    $scope.changeView = function (view, event) {
        if (event != null) {
            $('.buttonset-button').siblings().removeClass('active');
            event.currentTarget.classList.add('active')
        }
        document.getElementsByClassName('chart-item')[0].style.height = 'auto'
        if (view == 'hide') {
            document.getElementById('chart-parent').style.padding = 0;
            $('#chart-parent').animate({
                height: "50px"
            });
            document.getElementById('analytics-chart').style.display = 'none'
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '76vh';
            document.getElementById('table-container').style.padding = '0 1rem';
            $('#resetChartButton').fadeOut();
        } else if (view == 'half') {
            document.getElementById('chart-parent').style.padding = '15px';
            $('#chart-parent').animate({
                height: "35vh"
            });
            document.getElementById('analytics-chart').style.display = 'block'
            document.getElementsByClassName('table-responsive')[0].style.maxHeight = '46vh';
            document.getElementById('table-container').style.padding = '0 1rem';
            $('#resetChartButton').fadeIn();
        } else {
            document.getElementById('chart-parent').style.padding = '15px';
            document.getElementById('analytics-chart').style.display = 'block'
            $('#chart-parent').animate({
                height: "84vh"
            });
            document.getElementById('table-container').style.padding = '40px 40px';
            $('#resetChartButton').fadeIn();
        }
    }

    $scope.hidePopup = function () {
        $('#inputPopup').modal('hide');
    };
});