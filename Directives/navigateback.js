NorthwindSPA.directive('navigateBack', function ($route, $window) {
    return {
        restrict: "A",
        //replace: true,
        //template: editorTemplate,
        //scope: {
        //    value: "=clickToEdit",
        //},
        //controller: function($scope) {
        //    $scope.view = {
        //        editableValue: $scope.value,
        //        editorEnabled: false
        //    };
        //    $scope.enableEditor = function() {
        //        $scope.view.editorEnabled = true;
        //        $scope.view.editableValue = $scope.value;
        //    };
        //    $scope.disableEditor = function() {
        //        $scope.view.editorEnabled = false;
        //    };
        //    $scope.save = function() {
        //        $scope.value = $scope.view.editableValue;
        //        $scope.disableEditor();
        //    };
        //}
        compile: function compile(tElement, tAttrs, transclude) {
            tElement.click(function() {
                $window.history.back();
            });
        }
    };
});
