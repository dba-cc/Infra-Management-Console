var app = angular.module('Infra-ManagementConsole', ["ui.router", 'ngMessages', 'ngCookies', "ngMaterial", "ngTable", "ngFileUpload", "ngAnimate"]);

function showMessage(message) {
    document.getElementById('message').innerText = message
    $('#message-container').transition('fade');
    setTimeout(function () {
        $('#message-container').transition('fade');
    }, 5000);
}

function showLoadingScreen() {
    $('.loading-screen').addClass('active');
}

function hideLoadingScreen() {
    $('.loading-screen').removeClass('active');
}


app.factory('httpRequestInterceptor', function ($cookies) {
    return {
        request: function (config) {
            if (config.url.indexOf('api/') === 0) {

                config.url = "https://localhost:44374/" + config.url;
                //config.url = "http://localhost:8080/Api/" + config.url;

                config.headers['token'] = $cookies.get("token");
                config.headers['Content-Type'] = 'application/json';

            }

            return config;
        }
    };
});

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function (e, t, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    t.otherwise("/dashboard"),

    e.state("boxed", {
        url: "",
        "abstract": !0,
        templateUrl: "UI/layouts/common/boxed.html"
    });

    e.state("plain", {
        url: "",
        "abstract": !0,
        templateUrl: "UI/layouts/common/plain.html"
    });

    e.state("dashboard", {
        url: "/dashboard",
        parent: "plain",
        templateUrl: "UI/layouts/admin/dashboard.html",
        controller: "dashboardCtrl"
    });

    e.state("User", {
        url: "/User",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/User.html",
        controller: "UserCtrl"
    });

    e.state("Permission", {
        url: "/Permission",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/Permission.html",
        controller: "PermissionCtrl"
    });

    e.state("RestoreBackup", {
        url: "/RestoreBackup",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/RestoreBackup.html",
        controller: "RBCtrl"
    });

    e.state("AutoBackup", {
        url: "/AutoBackup",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/AutoBackup.html",
        controller: "AutoBackupCtrl"
    });

    e.state("QueryHit", {
        url: "/QueryHit",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/QueryHit.html",
        controller: "QueryHitCtrl"
    });

    e.state("CredentialAnalytics", {
        url: "/CredentialAnalytics",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/CredentialAnalytics.html",
        controller: "CredentialAnalyticsCtrl"
    });

    e.state("LockAnalysis", {
        url: "/LockAnalysis",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/LockAnalysis.html",
        controller: "LockAnalysisCtrl"
    });

    e.state("PermReport", {
        url: "/PermReport",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/PermReport.html",
        controller: "PermReportCtrl"
    });

    e.state("UserLogin", {
        url: "/UserLogin",
        parent: "plain",
        templateUrl: "UI/pages/admin/UserLogin.html",
        controller: "UserLoginCtrl"
    });

    e.state("DBPermission", {
        url: "/DBPermission",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/DBPermission.html",
        controller: "DBPermissionCtrl"
    });

    e.state("SPPermission", {
        url: "/SPPermission",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/SPPermission.html",
        controller: "SPPermissionCtrl"
    });

}])

app.filter('getById', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (input[i].id == id) {
                return input[i];
            }
        }
        return "none";
    }
});

