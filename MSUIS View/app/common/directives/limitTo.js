app.directive("limitTo", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function (event) {
                if (event.keyCode > 47 && event.keyCode < 58) {
                    if (this.value.length == limit)
                        return false;
                }
                else
                    return false;
            });
        }
    }
}]);