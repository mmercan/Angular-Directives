/// <reference path="../../Scripts/angular.js" />
NorthwindSPA.directive('customerSearchModal', function ($route, $window, dxCustomer) {
    return {
        restrict: "E",
        templateUrl: "/jsApp/Modal/CustomerSearchModal.html",
        scope: {
            selectedCustomer: "=",
            modalClosed: "=",
            customerChanged: "=",
        },
        link: function (scope) {
            var selectedCustomer = scope.selectedCustomer;
            scope.dxCustomer = dxCustomer;
            scope.selectCustomer = function (cat) {
                scope.selectedCustomer = cat;
                selectedCustomer = cat;
                return $('#customerSearchModal').modal('hide');
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

            $('#customerSearchModal').on('shown.bs.modal', function (a, b) {
                dxCustomer.refresh();
            });

            $('#customerSearchModal').on('hidden.bs.modal', function (a, b) {
                if (Object.prototype.toString.call(scope.modalClosed) == '[object Function]') {
                    scope.modalClosed(selectedCustomer);
                }

                if (selectedCustomer != null && Object.prototype.toString.call(scope.customerChanged) == '[object Function]') {
                    scope.customerChanged(selectedCustomer);
                }
                ;
            });
        }
    };
});