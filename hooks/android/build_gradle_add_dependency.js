#!/usr/bin/env node

module.exports = function(ctx) {
    var fs = require('fs'),
    os = require("os"),
    readline = require("readline"),
    deferral = require('q').defer();

var googleServicesStr = "if (project.extensions.findByName('googleServices') == null) { apply plugin: 'com.google.gms.google-services' }"
var googleServicesStrExists = false
var classpathsStrToVerify = "com.google.gms:google-services:4.3.10"
var classpathsStr = '\t\tclasspath "com.google.gms:google-services:4.3.10"'
var rootBuildGradlePath = "platforms/android/build.gradle"
var appBuildGradlePath = "platforms/android/app/build.gradle"

var lineReader = readline.createInterface({
    terminal: false,
    input : fs.createReadStream(rootBuildGradlePath)
});
lineReader.on("line", function(line) {
    if (!line.includes(classpathsStrToVerify)) {
        fs.appendFileSync('./build.gradle', line.toString() + os.EOL);
        if (/.*\ dependencies \{.*/.test(line)) {
            fs.appendFileSync('./build.gradle', classpathsStr + os.EOL);
        }
    }
    
}).on("close", function () {
    fs.rename('./build.gradle', rootBuildGradlePath, deferral.resolve);
});

var lineReaderApp = readline.createInterface({
    terminal: false,
    input : fs.createReadStream(appBuildGradlePath)
});
lineReaderApp.on("line", function (line) {
    if (line.includes(googleServicesStr)) {
        googleServicesStrExists = true;
    }
});    
lineReaderApp.on("close", function () {
    if (!googleServicesStrExists) {
        fs.appendFileSync('./' + appBuildGradlePath, googleServicesStr + os.EOL);
        fs.rename('./' + appBuildGradlePath, appBuildGradlePath, deferral.resolve);    
    }
    
});

return deferral.promise;
};
