app.directive("topnav", function () {
    return {
        templateUrl: "UI/layouts/admin/directives/topnav.html",
        restrict: "E",
        replace: !0,
        controller: ["$scope", function (e) {
            e.selectedBtn = null;
            e.toggleBodyLayout = function () {
                $("body").toggleClass("box-section")
            }, e.showMenu = function () {
                $("#app-container").toggleClass("push-right")
            }, e.changeTheme = function (e) {
                $("<link>").appendTo("head").attr({
                    type: "text/css",
                    rel: "stylesheet"
                }).attr("href", "styles/app-" + e + ".css"), console.log("hey")
            }, e.menuBtnClick = function (btnId) {
                //work done after selection for the Menu button from the top center Menu
                if (e.selectedBtn) e.selectedBtn.removeClass('active');
                e.selectedBtn = $('#' + btnId);
                e.selectedBtn.addClass('active');
                console.log('work done after selection for the Menu button from the top center Menu Btn: ' + btnId);
            }
        }]
    }
});