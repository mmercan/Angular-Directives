angular.module("directives").directive("mmList", ["$http", "$compile", function ($http, $compile) {
    return {
        restrict: 'EA',
        transclude: true,
        //template:'<div class="list">  </div>',
        link: function (scope, element, attrs, ctrl, transclude) {

            var expression = attrs.mmList;
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
            if (!match) { throw ('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression); }
            var lhs = match[1];
            var rhs = match[2];
            var aliasAs = match[3];
            var trackByExp = match[4];
            match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
            if (!match) {throw ('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", lhs); }
            var valueIdentifier = match[3] || match[1];

            var childscope = scope.$new();
            var datatemplate = null;
            var selecteditemPropertyName = null;
            var itemselectedEvent = null;
            var listcontainer = element.find("div.list");

            childscope.mmlistselecteditem = {};
            childscope.itemclicked = function (item) {
                childscope.mmlistselecteditem = item;
                if (selecteditemPropertyName) {
                    scope[selecteditemPropertyName] = item;
                }
                if (itemselectedEvent) {
                    if (mmlistselecteditem != item) {
                        itemselectedEvent(item);
                    }
                }
                
            };


            transclude(childscope, function (clone) {
                angular.forEach(clone, function(elem) {
                    if (angular.element(elem).hasClass('data-template')) {
                        datatemplate = elem.outerHTML;
                    }
                });
            });

          

            var createlist = function () {
               
                if (attrs.mmList) {
                    ngrepeatattr = attrs.mmList;
                }
                
                var datatemp = $(datatemplate);
                datatemp.attr("ng-repeat", ngrepeatattr);
                datatemp.attr("ng-click", "itemclicked("+valueIdentifier+")");
                datatemp.attr("data-ng-class", '{"active":mmlistselecteditem ==' + valueIdentifier + '}');
                datatemp.addClass("listitem");
                if (datatemp && datatemp[0] && datatemp[0].outerHTML) {
                    var listrepeater = datatemp[0].outerHTML;
                    element.append(listrepeater);
                    $compile(element.contents())(childscope);
                  
                }
                //var listrepeater = '<div class="listrepeater" ng-click="itemclicked(item)"  data-ng-class=\'{"active":mmlistselecteditem ==item}\' ng-repeat="item in ' + itemssourcePropertyName + '">' + datatemplate + '</div>';
                //listcontainer.append(listrepeater);
                //$compile(listcontainer)(childscope);
            };

            createlist();
            attrs.$observe("selecteditem", function (value, oldvalue) {
                selecteditemPropertyName = value;
                scope.$watch(value, function (newvalue) {
                    if (newvalue) {
                        if (newvalue !== childscope.mmlistselecteditem) {
                            childscope.mmlistselecteditem = newvalue;
                        }
                    } else if (selecteditemPropertyName) {
                        scope[selecteditemPropertyName] = {};
                    }
                });
            });

            attrs.$observe("itemselected", function (newvalue, oldvalue) {
                if (newvalue && scope[newvalue] && angular.isFunction(scope[newvalue])) {
                    itemselectedEvent = scope[newvalue];
                }
            });


        },

        controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {

        }],
    }
}]);
