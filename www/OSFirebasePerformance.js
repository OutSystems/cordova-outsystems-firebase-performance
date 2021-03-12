var exec = require('cordova/exec');
var PLUGIN_NAME = "OSFirebasePerformance";

module.exports = {
    startTrace: function (name) {
        return new Promise(function (resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "startTrace", [name]);
        });
    },
    stopTrace: function (name) {
        return new Promise(function (resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "stopTrace", [name]);
        });
    },
    addTraceAttribute: function (traceName, attribute, value) {
        return new Promise(function (resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "addTraceAttribute", [traceName, attribute, value]);
        });
    },
    removeTraceAttribute: function (traceName, attribute) {
        return new Promise(function (resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "removeTraceAttribute", [traceName, attribute]);
        });
    },
    incrementMetric: function (traceName, metricName, value) {
        return new Promise(function (resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "incrementMetric", [traceName, metricName, value]);
        });
    },
    setPerformanceCollectionEnabled: function (enabled) {
        return new Promise(function (resolve, reject) {
            exec(resolve, reject, PLUGIN_NAME, "setPerformanceCollectionEnabled", [enabled]);
        });
    }
}