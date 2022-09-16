app.directive("menu", function () {
    return {
        templateUrl: "UI/layouts/admin/directives/menu.html",
        restrict: "E",
        replace: !0,
        controller: ["$scope", function (e) {
            e.selectedMenu = "dashboard",
            e.showingSubNav = 0,
            e.showSubNav = function (t) {
                e.showingSubNav = t == e.showingSubNav ? 0 : t
            },
            e.multiCheck = function (t) {
                e.multiCollapseVar = t == e.multiCollapseVar ? 0 : t
            }
        }]
    }
})