/// <reference path="../../Scripts/angular.js" />
NorthwindSPA.directive("postItem", function ($http, $compile) {
    return {
        restrict: "E",
        scope: {
            address: "=",
            templatehtml: "=",
            item:"=",
        },
        link: function (scope, element, attrs) {
            if (!scope.address) return;
            scope.htmlContext = element.context.innerHTML;
            scope.save = function(form) {
                alert(scope.item.Product_Name);
            };
            element.context.innerHTML = "";
            element.append('<form novalidate name="catForm" class="form" class="form-horizontal" ng-submit="save(catForm)">');

            var elm = angular.element(element[0].getElementsByClassName("form")[0]);
            elm.append(scope.htmlContext);
            $compile(elm)(scope);
           
        },
    };
});