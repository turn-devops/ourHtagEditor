angular.module("umbraco").controller("Our.Umbraco.HtagEditor.PreValueController", function ($scope, $http, $routeParams, assetsService, contentResource, notificationsService) {

    var defaultSizes = ["h1","h2","h3","h4","h5","h6"];
    var defaultTagclasses = ["h1","h2","h3","h4","h5","h6"];
    var defaultAlign = ["left","center","right"];

    $scope.sizeOptions =  $scope.model.config && $scope.model.config.options && $scope.model.config.options.size && $scope.model.config.options.size.options ? config.options.size.options : defaultSizes;
    $scope.tagclassOptions =  $scope.model.config && $scope.model.config.options && $scope.model.config.options.tagclass && $scope.model.config.options.tagclass.options ? config.options.tagclass.options : defaultTagclasses;
    $scope.alignOptions = $scope.model.config && $scope.model.config.options && $scope.model.config.options.align && $scope.model.config.options.align.options ? config.options.align.options : defaultAlign;

    if (!$scope.model.value.size.options)
        $scope.model.value.size.options = $scope.sizeOptions.slice(0);

    if (!$scope.model.value.tagclass.options)
        $scope.model.value.tagclass.options = $scope.tagclassOptions.slice(0);
    
    if (!$scope.model.value.align.options)
        $scope.model.value.align.options = $scope.alignOptions.slice(0);

    $scope.toggleAlign = function(align){
        toggleOption($scope.model.value.align.options, align, $scope.model.value.align.default);
        sort($scope.model.value.align.options, defaultAlign);
    }

    $scope.defaultAlign = function(align){
        var item = $scope.model.value.align;
        item.default = align;
        if(!isSelected(item.options, align))
            toggleOption(item.options, align);
    }

    $scope.defaultSize = function(size){
        var item = $scope.model.value.size;
        item.default = size;
        if(!isSelected(item.options, size))
            toggleOption(item.options, size);
    }
    
    $scope.defaultTagclass = function(tagclass){
        var item = $scope.model.value.tagclass;
        item.default = tagclass;
        if(!isSelected(item.options, tagclass))
            toggleOption(item.options, tagclass);
    }

    $scope.toggleSize = function(size){
        toggleOption($scope.model.value.size.options, size, $scope.model.value.size.default);
        $scope.model.value.size.options.sort();
    }
    
    $scope.toggleTagclass = function(tagclass){
        toggleOption($scope.model.value.tagclass.options, tagclass, $scope.model.value.tagclass.default);
        $scope.model.value.tagclass.options.sort();
    }

    function isSelected(values, value) {
        return values.indexOf(value) !== -1;
    }

    function toggleOption(selected, valueToToggle, currentDefault) {
        var index = selected.indexOf(valueToToggle);
        if (index !== -1) {
            if (valueToToggle !== currentDefault)
                selected.splice(index, 1); 
        }
        else {
            selected.push(valueToToggle);
        }
    }

    function sort(arrayToSort, referenceArray) {
        arrayToSort.sort(function(a, b) {
            return referenceArray.indexOf(a) - referenceArray.indexOf(b);
        });
    }
});
