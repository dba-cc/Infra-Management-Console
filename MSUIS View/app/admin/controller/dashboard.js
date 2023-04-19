app.controller("dashboardCtrl", function ($scope, $state, $window, $rootScope, $http, NgTableParams, $filter) {
    var lastWorkerTime = [];
    var sr_no = [];

    $scope.DbList = {};

    hideLoadingScreen();

    function toggleSubmenu(parentMenu, subMenu, stateName) {
        $(parentMenu).parent().siblings().children(":odd").slideUp()
        submenus = parentMenu.parentNode.children[1];
        $(submenus).slideDown(300);
        $state.go(stateName);

        $(subMenu).parent().siblings().children().removeClass('active-menu')
        $(subMenu).parent().parent().parent().siblings().children(":odd").children().children().removeClass('active-menu')
        subMenu.classList.add('active-menu')

        document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].style.backgroundColor = '#8080801f'
        document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].style.color = 'green'
        document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].children[1].children[0].style.color = 'black'
    }

    function closeMenus() {
        $('a').parent().parent().parent().siblings().children(":odd").children().children().removeClass('active-menu')
        $('.subitem').ready(function () {
            items = document.getElementsByClassName('subitem')
            $(items).hide().slideUp();
        })
    }

    $scope.GetDashboardInfo = function() {
        closeMenus();
        $scope.getServerLogs();
        $scope.fetchPage(1);
        $scope.GetAutoBackupLogs();
        $scope.getDatabaseCounts();
        $scope.GetCredentialAnalytics();
        $scope.GetLocksAnalysisCount();
    }

    $scope.goTo = function (parentMenuIndex, stateName) {
        toggleSubmenu(document.querySelectorAll('.pcoded[theme-layout="vertical"] .pcoded-navbar .pcoded-item[item-border="true"][item-border-style="none"] li > a')[parentMenuIndex], document.getElementById(stateName), stateName);
    }

    $scope.GetAutoBackupLogs = function () {
        $http({
            method: 'POST',
            url: 'api/AutoBackup/GetAutoBackupLogs',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.BackupLogParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.GetLocksAnalysisCount = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/LockAnalysis/GetLock',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.LockCount = response.obj.length;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.getServerLogs = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Dashboard/GetServerLogs',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.ServerLogParams = new NgTableParams({
                        count: response.obj.length
                    }, {
                        dataset: response.obj
                    });
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.getDatabaseCounts = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Database/GetDBWithStates',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code == "201") {
                    $scope.DatabaseList = {};
                }
                else {
                    $scope.DbList = response.obj;
                    $scope.onlineCount = $filter('filter')($scope.DbList, { name: $scope.searchDB, noc: 'ONLINE' }).length;
                    $scope.offlineCount = $filter('filter')($scope.DbList, { name: $scope.searchDB, noc: 'OFFLINE' }).length;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    $scope.GetCredentialAnalytics = function () {
        showLoadingScreen();
        $http({
            method: 'POST',
            url: 'api/Analytics/GetCredentialAnalysis',
            headers: { "Content-Type": 'application/json' }
        })

            .success(function (response) {
                if (response.response_code != "200") {
                    $rootScope.$broadcast('dialog', "Error", "alert", response.obj);
                }
                else {
                    $scope.ActiveLoginWithDBCount = response.obj.length;
                }
                hideLoadingScreen();
            })
            .error(function (res) {
                $rootScope.$broadcast('dialog', "Error", "alert", res.obj);
                hideLoadingScreen();
            });
    };

    var totalData = [];

    $scope.fetchPage = function(pageNum) {
        $http({
            method: 'POST',
            url: 'api/Dashboard/GetQueryHit',
            data: '"MINUTE 1 Query ' + pageNum + '"',
            headers: { "Content-Type": 'application/json' }
        })
            .success(function (response) {
                if (response.response_code != "200") {
                    showMessage(response.obj);
                }

                else {
                    totalData = totalData.concat(response.obj.data);
                    if (response.obj.data.length > 0) {

                        setTimeout(function () {
                            $scope.fetchPage(pageNum + 1);
                        }, 0)

                    } else {
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

    $scope.generateChart = function () {
        var data = totalData
        if (data != null) {
            var sr_no_count = 0;
            sr_no = data.map(function (obj) {
                return sr_no_count++;
            });
            lastWorkerTime = data.map(function (obj) {
                return obj.last_worker_time;
            });
            lastElapsedTime = data.map(function (obj) {
                return obj.last_elapsed_time;
            });
            executionCount = data.map(function (obj) {
                return obj.execution_count;
            });
        }

        const chartCanvas = document.getElementById('analytics-chart').getContext('2d');
        if (typeof $scope.chart !== 'undefined') {
            $scope.chart.destroy();
        }

        $scope.chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: sr_no,
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
                scales: {
                    x: {
                        ticks: {
                            display: false,
                        }
                    },
                    y: {
                        ticks: {
                            stepSize: 500,
                        }
                    }
                },
                plugins: {
                    filler: {
                        propagate: false,
                    },
                    legend: false,
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
})