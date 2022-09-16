app.directive("sidenavicon", function () {
    return {
        templateUrl: "UI/layouts/common/directives/sidenavicon.html",
        restrict: "E",
        replace: !0,
        controller: ["$scope", function (e) {
            e.tabActive = [],
            e.$watch("tabActive", function () {
                e.perfectSCrollbarObj && setTimeout(function () {
                    e.perfectSCrollbarObj.perfectScrollbar("update")
                }, 100)
            }, !0)
        }],
        link: function (e, t, a) {
            setTimeout(function () {
                e.perfectSCrollbarObj = t.find(".tab-content").perfectScrollbar()
            }, 0)
        }
    }
})