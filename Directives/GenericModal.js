/// <reference path="../../Scripts/angular.js" />
NorthwindSPA.directive('genericModal', function ($route, $window) {
    return {
        restrict: "E",
        templateUrl: "/jsApp/Modal/GenericModal.html",
        scope: {
            template: "=template",
            modal: "=",
        },
        link: function(scope,element) {
            var q = scope.template;
            //Todo: apply modal on element instead of class
            //scope.show = function () { $('#myModal').modal('show'); };
            scope.modal = {
                show: function() {
                    return $('#myModal').modal('show');
                },
                hide: function() {
                    return $('#myModal').modal('hide');
                },
            };
        },
};
});