"use strict";

var path = require("path");
var AdmZip = require("adm-zip");

var utils = require("./utilities");

var constants = {
  googleServices: "google-services"
};

module.exports = function(context) {
  var cordovaAbove8 = utils.isCordovaAbove(context, 8);
  var cordovaAbove7 = utils.isCordovaAbove(context, 7);
  var defer;
  if (cordovaAbove8) {
    defer = require("q").defer();
  } else {
    defer = context.requireCordovaModule("q").defer();
  }
  
  var platform = context.opts.plugin.platform;
  var platformConfig = utils.getPlatformConfigs(platform);
  if (!platformConfig) {
    utils.handleError("Invalid platform", defer);
  }

  var wwwPath = utils.getResourcesFolderPath(context, platform, platformConfig);
  var sourceFolderPath = utils.getSourceFolderPath(context, wwwPath);
  
  var googleServicesZipFile = utils.getZipFile(sourceFolderPath, constants.googleServices);
  if (!googleServicesZipFile) {
    utils.handleError("No zip file found containing google services configuration file", defer);
  }

  var zip = new AdmZip(googleServicesZipFile);

  var targetPath = path.join(wwwPath, constants.googleServices);
  zip.extractAllTo(targetPath, true);

  var files = utils.getFilesFromPath(targetPath);
  if (!files) {
    utils.handleError("No directory found", defer);
  }

  var fileName = files.find(function (name) {
    return name.endsWith(platformConfig.firebaseFileExtension);
  });
  if (!fileName) {
    utils.handleError("No file found", defer);
  }

  var sourceFilePath = path.join(targetPath, fileName);
  var destFilePath = path.join(context.opts.plugin.dir, fileName);

  if(!utils.checkIfFolderExists(destFilePath)){
    console.log("DEST_FILE_PATH É:::: " + destFilePath)
    console.log("SOURCE_FILE_PATH É:::: " + sourceFilePath)
    console.log("TARGET_PATH É:::: " + targetPath)
    console.log("DEFER É::: " + defer)
    console.log("ENTROU NO IF 1")
    utils.copyFromSourceToDestPath(defer, sourceFilePath, destFilePath);
  }

  console.log("PASSOU O IF 1")  

  if (cordovaAbove7) {
    var destPath = path.join(context.opts.projectRoot, "platforms", platform, "app");
    console.log("ENTROU CORDOVA ABOVE 7")
    if (utils.checkIfFolderExists(destPath)) {
      var destFilePath = path.join(destPath, fileName);
      if(!utils.checkIfFolderExists(destFilePath)){
        console.log("ENTROU NO IF 2")
        utils.copyFromSourceToDestPath(defer, sourceFilePath, destFilePath);
      }
      console.log("PASSOU O IF 2")
    }
  }

  console.log("PASSOU O CORDOVA 7")
      
  return defer.promise;
}
