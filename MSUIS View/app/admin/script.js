var app = angular.module('SampleApp', ["ui.router", 'ngMessages', 'ngCookies', "ngMaterial", "ngTable", "ngFileUpload"]);

app.factory('httpRequestInterceptor', function ($cookies) {
    return {
        request: function (config) {
            if (config.url.indexOf('api/') === 0) {

                config.url = "https://localhost:44374/" + config.url;

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

    e.state("login", {
        url: "/login",
        parent: "plain",
        templateUrl: "UI/pages/admin/login.html",
        controller: "loginCtrl"
    });

    e.state("index", {
        url: "/index",
        parent: "plain",
        templateUrl: "UI/pages/admin/login.html",
        controller: "IndexCtrl"
    });

    e.state("home", {
        url: "/home",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/home.html",
        controller: "usersCtrl"
    });

    e.state("users", {
        url: "/users",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/users.html",
        controller: "usersCtrl"
    });

    e.state("students", {
        url: "/students",
        parent: "dashboard",
        templateUrl: "UI/pages/admin/student.html",
        controller: "studentsCtrl"
    });
    e.state("MstFacultyDemoAdd", {
        url: "/MstFacultyDemoAdd",
        parent: "plain",
        templateUrl: "UI/pages/admin/MstFacultyDemoAdd.html",
        controller: "MstFacultyDemoCtrl"
    });
    //e.state("MstFacultyDemoAdd1", {
    //    url: "/MstFacultyDemoAdd1",
    //    parent: "plain",
    //    templateUrl: "UI/pages/admin/MstFacultyDemoAdd1.html",
    //    controller: "MstFacultyDemoCtrl1"
    //});
    e.state("MstFacultyProgrammeDemo", {
        url: "/MstFacultyProgrammeDemo",
        parent: "plain",
        templateUrl: "UI/pages/admin/MstFacultyProgrammeDemo.html",
        controller: "MstFacultyProgrammeDemoCtrl"
    });
    e.state("InstituteAdd", {
        url: "/InstituteAdd",
        parent: "plain",
        templateUrl: "UI/pages/admin/InstituteAdd.html",
        controller: "InstituteCtrl"
    });
    e.state("InstituteEdit", {
        url: "/InstituteEdit",
        parent: "plain",
        templateUrl: "UI/pages/admin/InstituteEdit.html",
        controller: "InstituteCtrl"
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

    e.state("UserLogin", {
        url: "/UserLogin",
        parent: "plain",
        templateUrl: "UI/pages/admin/UserLogin.html",
        controller: "UserLoginCtrl"
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

