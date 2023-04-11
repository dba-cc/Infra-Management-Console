var app = angular.module('Infra-ManagementConsole', ["ui.router", 'ngMessages', 'ngCookies', "ngMaterial", "ngTable", "ngFileUpload", "ngAnimate"]);

$('.loader-circle').hide();
$('.loading-screen').hide();

function showMessage(message) {
    document.getElementById('message').innerText = message
    $('#message-container').transition('fade');
    setTimeout(function () {
        $('#message-container').transition('fade');
    }, 5000);
}

function showLoadingScreen() {
    $('.loading-screen').fadeIn();
    $('.loader-circle').fadeIn();
}

function hideLoadingScreen() {
    $('.loader-circle').fadeOut()
    $('.loading-screen').fadeOut();
}

function toggleSettings() {
    $('.settings').fadeToggle();
}

function toggletheme(theme) {
    if (theme == 'dark') {
        document.querySelector(':root').style.setProperty('--invert', '1')
        document.querySelector(':root').style.setProperty('--hue', '180deg')
        localStorage.setItem('theme', 'dark');
        return

    }
    else if (theme == 'oceanblue') {
        document.querySelector(':root').style.setProperty('--invert', '1')
        document.querySelector(':root').style.setProperty('--hue', '230deg')
        localStorage.setItem('theme', 'oceanblue');
        return

    }
    else if (theme == 'light') {
        document.querySelector(':root').style.setProperty('--invert', '0')
        document.querySelector(':root').style.setProperty('--hue', '0deg')
        localStorage.setItem('theme', 'light');
        return

    }       
    else {
        document.querySelector(':root').style.setProperty('--invert', '0')
        document.querySelector(':root').style.setProperty('--hue', '0deg')
        localStorage.setItem('theme', 'light');
        return
    }
}
toggletheme(localStorage.getItem('theme'))

app.factory('httpRequestInterceptor', function ($cookies) {
    return {
        request: function (config) {
            if (config.url.indexOf('api/') === 0) {

                config.url = "https://localhost:44374/" + config.url;
                //config.url = "http://localhost:8081/" + config.url;

                config.headers['token'] = $cookies.get("token");
                config.headers['Content-Type'] = 'application/json';

            }

            return config;
        }
    };
});

app.filter('addLineBreak', ['$sce', function ($sce) {
    return function (input) {
        if (!input) return '';
        return $sce.trustAsHtml(input.replace(/,/g, ',<br><br><br>'));
    }
}]);

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function (e, t, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    t.otherwise("/dashboard"),

        e.state("boxed", {
            url: "",
            "abstract": !0,
            templateUrl: "UI/layouts/common/boxed.html"
        });
    e.state("Settings", {
        url: "/Settings",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/Settings.html",
        controller: "SettingsCtrl"
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

    e.state("Database", {
        url: "/Database",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/Database.html",
        controller: "DBCtrl"
    });

    e.state("Backup", {
        url: "/Backup",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/Backup.html",
        controller: "BackupCtrl"
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

    e.state("Indexing", {
        url: "/Indexing",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/Indexing.html",
        controller: "IndexingCtrl"
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

