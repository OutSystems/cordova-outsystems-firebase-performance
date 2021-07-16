var azdev = require("azure-devops-node-api")
var atob = require('atob');
var configurations = require('./configurations.json');

if(configurations.testPipelineArgs == null) {
    throw new Error("Missing testPipelineArg from configurations");
}

if(process.env.npm_config_jsonStringBase64 == null) {
    throw new Error("Missing JSON string with appIDs and platforms");
}

if(process.env.npm_config_deviceAndroid == null) {
    throw new Error("Missing Android version to use");
}

if(process.env.npm_config_deviceIos == null) {
    throw new Error("Missing iOS version to use");
}

if(process.env.npm_config_androidPipelineID == null) {
    throw new Error("Missing Android Pipeline ID");
}

if(process.env.npm_config_iosPipelineID == null) {
    throw new Error("Missing iOS Pipeline ID");
}

if(process.env.npm_config_azureProjectID == null) {
    throw new Error("Missing azure project ID");
}

if(process.env.npm_config_dataCenter == null) {
    throw new Error("Missing Data Center");
}

if(process.env.npm_config_token == null) {
    throw new Error("Missing Token string to access pipelines");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executePipeline(appID, plugin, platformVersion, azureProject, pipelineId, token, dataCenter, threads, tags) {
    const FAILED = 8;
    const orgUrl = 'https://dev.azure.com/OutSystemsRD'
    const authHandler = azdev.getPersonalAccessTokenHandler(token);
    const connection = new azdev.WebApi(orgUrl, authHandler);
    const buildApi = await connection.getBuildApi();
    const testApi = await connection.getTestApi();
    const build = {
        templateParameters: {
            "APP_ID": appID,
            "DATACENTER": dataCenter,
            "DEVICE_VERSION": platformVersion,
            "MABS": "latest",
            "PLUGIN_NAME": plugin,
            "TAGS": tags,
            "TEST_TYPE": "native",
            "THREADS": threads,
            "TYPE_OF_DEVICE": "real",
        },
    };
    const url = `${orgUrl}/${azureProject}/_apis/pipelines/${pipelineId}/runs`;
    const reqOpts = {
        acceptHeader: 'application/json;api-version=6.0-preview.1',
    };
    const queuedBuild = await buildApi.rest.create(url, build, reqOpts);
    const id = queuedBuild.result.id;
    let triggeredBuild = await buildApi.getBuild(azureProject, id);
    console.log(`Tests execution for ${triggeredBuild.buildNumber} has started`);
    while (!triggeredBuild.finishTime) {
        await sleep(30000);
        triggeredBuild = await buildApi.getBuild(azureProject, id);
        console.log(`Pipeline execution in progress... ${triggeredBuild._links.web.href}`)
    }
    triggeredBuild = await buildApi.getBuild(azureProject, id);
    const buildReport = await buildApi.getBuildReport(azureProject, id);
    console.log(`Tests finished: ${triggeredBuild.result == FAILED ? 'failed' : 'passed'}`);
    const buildResults = await testApi.getTestResultsByBuild(azureProject, id);
    const runResults = await testApi.getTestResults(azureProject, buildResults[0].runId);
    console.log(`Passed tests: ${runResults.filter((test) => test.outcome == "Passed").map((test) => `\n${test.testCase.name}` )}\n`);
    console.log(`Failed tests with bugs: ${runResults.filter((test) => test.outcome != "Passed" && !test.stackTrace.includes('**Unstable**')).map((test) => `${test.testCase.name}\n` )}\n`);
    console.log(`Failed tests without bugs: ${runResults.filter((test) => test.outcome != "Passed" && test.stackTrace.includes('**Unstable**')).map((test) => `${test.testCase.name}\n` )}\n`);
}

var personalToken = process.env.npm_config_token;
var jsonStringBase64 = process.env.npm_config_jsonStringBase64;
var testPipelineArgs = configurations.testPipelineArgs;
var azureProjectID = process.env.npm_config_azureProjectID;
var dataCenter = process.env.npm_config_dataCenter;
var threads = testPipelineArgs.threads;
var jsonString = atob(jsonStringBase64);
var json = JSON.parse(jsonString);

json.forEach(function(run) {
    var pipelineID = run.platform == 'android' ? process.env.npm_config_androidPipelineID : process.env.npm_config_iosPipelineID;
    var deviceVersion = run.platform == 'android' ? process.env.npm_config_deviceAndroid : process.env.npm_config_deviceIos;
    executePipeline(run.storageID, testPipelineArgs.plugin, deviceVersion, azureProjectID, pipelineID, personalToken, dataCenter, threads, testPipelineArgs.tags);
});