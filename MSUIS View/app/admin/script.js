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

/*function toggleDarkMode() {
    if (document.querySelector(':root').style.getPropertyValue('--invert') == '0' || document.querySelector(':root').style.getPropertyValue('--invert') == '') {
        document.querySelector(':root').style.setProperty('--invert', '0.9')
        document.querySelector(':root').style.setProperty('--hue', '180deg')
        localStorage.setItem('theme', 'dark');
    } else {
        document.querySelector(':root').style.setProperty('--invert', '0')
        document.querySelector(':root').style.setProperty('--hue', '0deg')
        localStorage.setItem('theme', 'light');
    }
}

if (localStorage.getItem('theme') == 'dark') {
    toggleDarkMode();
}*/
/////////////////////////////////////
function toggletheme(theme) {
    console.log(theme)
    if (theme == 'dark') {
        document.querySelector(':root').style.setProperty('--invert', '1')
        document.querySelector(':root').style.setProperty('--hue', '180deg')
        localStorage.setItem('theme', 'dark');
        /*document.getElementById('darkthemeCheckbox').checked = true
        document.getElementById('oceanthemeCheckbox').checked = false
        document.getElementById('somethemeCheckbox').checked = false*/
        return

    }

    else if (theme == 'blue') {
        document.querySelector(':root').style.setProperty('--invert', '1')
        document.querySelector(':root').style.setProperty('--hue', '230deg')
        localStorage.setItem('theme', 'blue');
        return

    }
    else if (theme == 'default') {
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
/*function toggleBlueMode() {

    if (currentInvert == '0' || currentInvert == '') {
        document.querySelector(':root').style.setProperty('--invert', '0.8')
        document.querySelector(':root').style.setProperty('--hue', '210deg')
        localStorage.setItem('color-theme', 'blue');
    } else {
        document.querySelector(':root').style.setProperty('--invert', currentInvert)
        document.querySelector(':root').style.setProperty('--hue', '210deg')
        localStorage.setItem('color-theme', 'light');
    }
}*/

/*else if (theme == 'purple') {
    document.querySelector(':root').style.setProperty('--invert', '1')
    document.querySelector(':root').style.setProperty('--hue', '360deg')
    localStorage.setItem('theme', 'purple');
    return

}  */


/*if (localStorage.getItem('theme') == 'blue') {
    toggleBlueMode();
} else if (localStorage.getItem('theme') == 'light') {
    // Do nothing, because light mode is the default
} else {
    // If no color theme is set, use the browser's preferred color scheme
  //  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches) {
        toggleDarkMode();
    }
}*/



/////////////////////////////////////

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

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function (e, t, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    t.otherwise("/UserLogin"),

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

