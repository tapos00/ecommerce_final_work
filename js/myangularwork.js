(function () {
    var cat = {};
    var app = angular.module("myApp", ['ui-rangeSlider']);
    app.directive('rangeMaker', function() {
        return {
            restrict: 'E',
            template: '<input  type="text" class="span2" value="" data-slider-min="250" data-slider-max="500" data-slider-step="5" data-slider-value="[250,450]" id="sl2" ><br /> <b class="pull-left">$ 0</b> <b class="pull-right">$ 600</b>'
        }
    });
    /*app.filter('uniqueCategory', function () {
        return function (allproduct) {
            if (angular.isArray(allproduct)) {
                var cat = {};
                var catlist = [];
                angular.forEach(allproduct, function (aproduct) {
                    var nowcat = aproduct['Categories'];
                    if (angular.isUndefined(cat[nowcat])) {
                        cat[nowcat] = true;
                        catlist.push({name:nowcat});
                    }
                });
                return catlist;
            }else{
                return allproduct;
            }

        }
    });*/

    app.controller("myCtrl", ['$scope', '$http', function ($scope, $http) {
        $scope.productList = [];
        $scope.categorories = [];
        $scope.selectpro = null;
        $scope.demo2 = {
            range: {
                min: 0,
                max: 600
            },
            minPrice: 0,
            maxPrice: 600
        };
        $http.get('/productlist_latest.json').then(function (response) {
            $scope.productList = response.data;
            angular.forEach(response.data,function(aproduct){
                var nowcat = aproduct['Categories'];
                var subcat = aproduct['SubCategory'];
                if (angular.isUndefined(cat[nowcat])) {
                    cat[nowcat] = true;

                    var nowdata ={
                        name : nowcat,
                        subcat:[subcat]
                    };
                    if(subcat==""){
                        nowdata.subcat = [];
                    }
                    $scope.categorories.push(nowdata);
                }else{
                    angular.forEach($scope.categorories,function(cat){

                        if(cat['name']==nowcat){
                            if((cat['subcat']).indexOf(subcat) == -1) {
                                cat['subcat'].push(subcat);
                            }
                        }
                    });

                }
            });
        }, function () {

        });
        $scope.seletedProduct = function (aCategory) {
            $scope.selectpro = aCategory;
        };
        $scope.clicktoselect = function (aproduct) {
            return $scope.selectpro == null || $scope.selectpro == aproduct.SubCategory || $scope.selectpro == aproduct.Categories;
        };
        $scope.selectactive = function (category) {
            return category == $scope.selectpro ? "active" : null;
        };

        $scope.seletedPrice = function(aproduct){
            if(aproduct.Price>=$scope.demo2.minPrice && aproduct.Price<=$scope.demo2.maxPrice){
                return true;
            }
            return false;
        };
    }]);
})();
