define(['ionic.bundle', 'angular-async-loader', 'utils'], function (ionicBundle, asyncLoader, utils, mobileUtil) {
    'use strict';
    var app = angular.module('app', ['ui.router', 'ionic', 'ngLocale'])
        .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('bottom');
        }])
        .run(['$ionicPlatform', '$rootScope', '$location', "$window", '$interval', '$anchorScroll', function ($ionicPlatform, $rootScope, $location, $window, $interval, $anchorScroll) {
            console.debug('Device Infos (From Ionic):', ionic.Platform);
            if (ionic.Platform.isIOS()) {
                // IOS TODO ...
            }
            if (ionic.Platform.isAndroid()) {
                // Android TODO ...
            }
            // ionic ready
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });

            $rootScope.title = "\u524d\u7aef\u6846\u67b6";
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $location.hash(fromParams.id);
                $anchorScroll();
            });
        }]);

    app.config(['$locationProvider', '$httpProvider', '$provide', function ($locationProvider, $httpProvider, $provide) {
        //声明自定义http拦截
        $provide.factory('myHttpInterceptor', ['$q', '$injector', "$location", function ($q, $injector, $location) {
            /**
             * 判断请求url 是否需要过
             * @param excludedAddress
             * @param url
             * @returns {boolean}
             */
            var checkDefaultSetter = function (excludedAddress, url) {
                var defaultItem = ["html", "js", "css", "jpg", "png"];
                var patt = new RegExp(".*.(" + defaultItem.join('|') + "){1}");
                if (patt.test(url) || $.inArray(url, excludedAddress) > -1) {
                    return true;
                } else {
                    return false;
                }
            };
            return {
                'request': function (config) {
                    return config;
                },
                'requestError': function (rejection) {
                    return $q.reject(rejection);
                },

                'response': function (response) {
                    return response;
                },
                'responseError': function (rejection) {
                    return rejection;
                }
            };
        }]);

        $httpProvider.interceptors.push('myHttpInterceptor');
        $httpProvider.interceptors.push(["$q", function ($q) {
            return {
                'response': function (response) {
                    if (typeof (window.MiniProfiler) != 'undefined' && response.config.url.indexOf(".html") < 0) {
                        var stringIds = response.headers('X-MiniProfiler-Ids');
                        if (stringIds) {
                            window.MiniProfiler.fetchResults(angular.fromJson(stringIds));
                        }
                    }
                    return response || $q.when(response);
                }
            };
        }]);
    }]);
    asyncLoader.configure(app);
    return app;
})
;