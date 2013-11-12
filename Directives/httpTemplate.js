/// <reference path="../../Scripts/angular.js" />
NorthwindSPA.directive("httpTemplate", function ($http, $compile) {
    return {
        restrict: "E",
        //templateUrl: "/jsApp/Modal/httpTemplate.html",
        scope: {
            address: "=",
            templatehtml: "=",
        },
        link: function (scope,element, attrs) {
            if (!scope.address) return;
                scope.htmlContext = element.context.innerHTML;
                scope.items = [];
            $http.get(scope.address).then(
                function(results) {
                    element.context.innerHTML = "";
                    scope.items = results.data;
                    element.append('<div class="templatecontainer"></div>');
                    
                    //var elm = angular.element(document.getElementById('templatecontainer'));
                   
                    var elm = angular.element(element[0].getElementsByClassName("templatecontainer")[0]);
                    // var elm = angular.element(element[0]);
                    elm.append("<div ng-repeat='item in items'>" + scope.htmlContext + " </div>");
                    $compile(elm)(scope);

                }, function(error) {
                    alert(error);
                });
        },
    };
});