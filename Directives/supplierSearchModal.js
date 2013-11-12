/// <reference path="../../Scripts/angular.js" />
NorthwindSPA.directive('supplierSearchModal', function ($route, $window, dxSupplier) {
    return {
        restrict: "E",
        templateUrl: "/jsApp/Modal/SupplierSearchModal.html",
        scope: {
            modalClosed: "=",
            selectedSupplier: "=",
            supplierChanged:"=",
        },
        link: function(scope) {
            scope.filter = {};
            var selectedSupplier = scope.selectedSupplier;
            scope.dxSupplier = dxSupplier;
            scope.selectSupplier = function (sup) {
                scope.selectedSupplier = sup;
                selectedSupplier = sup;
                return $('#supplierSearchModal').modal('hide');
            };
            $('#supplierSearchModal').on('shown.bs.modal', function (a, b) {
                dxSupplier.refresh();
            });

            $('#supplierSearchModal').on('hidden.bs.modal', function () {
                if (Object.prototype.toString.call(scope.modalClosed) == '[object Function]') {
                    scope.modalClosed(selectedSupplier);
                }

                if (selectedSupplier != null && Object.prototype.toString.call(scope.supplierChanged) == '[object Function]') {
                    scope.supplierChanged(selectedSupplier);
                }
                ;
            });
        },
};
});