define(['app', 'utils'], function (app, utils) {
    'use strict';
    app.controller("indexCtrl", ["$scope", "$stateParams", "$location", function ($scope) {
        $scope.model = {
            id: 1,
            dateTime: Date.now(),
            name: '我点餐',
            desc: '描述信息测试'
        };
    }]);
});