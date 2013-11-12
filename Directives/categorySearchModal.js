/// <reference path="../../Scriptsgo/angular.js" />
NorthwindSPA.directive('categorySearchModal', function($route, $window, dxCategory) {
    return {
        restrict: "E",
        templateUrl: "/jsApp/Modal/CategorySearchModal.html",
        scope: {
            selectedCategory: "=",
            modalClosed: "=",
            categoryChanged: "=",
        },
        link: function(scope) {
            var selectedCategory = scope.selectedCategory;
            scope.dxCategory = dxCategory;
            scope.selectCategory = function(cat) {
                scope.selectedCategory = cat;
                selectedCategory = cat;
                return $('#categorySearchModal').modal('hide');
            };
            //scope.filter = {};
            //scope.modal = {
            //    show: function () {

            //        return $('#categorySearchModal').modal('show');
            //    },
            //    hide: function() {
            //        return $('#categorySearchModal').modal('hide');
            //    },
            //};

            //$('#categorySearchModal').on('shown.bs.modal', function (a, b) {
            //    dxCategory.refresh();
            //});

            $('#categorySearchModal').on('hidden.bs.modal', function(a, b) {
                if (Object.prototype.toString.call(scope.modalClosed) == '[object Function]') {
                    scope.modalClosed(selectedCategory);
                }

                if (selectedCategory != null && Object.prototype.toString.call(scope.categoryChanged) == '[object Function]') {
                    scope.categoryChanged(selectedCategory);
                }
                ;
            });
        }
    };
});