# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The changes documented here do not include those from the original repository.

## 2.2.0

### Fixes
- (ios) Call `FirebaseApp.configure()` if necessary (https://outsystemsrd.atlassian.net/browse/RMET-3642).

## 2.1.2

### Chores
- (ios) Replace `cordova-plugin-add-swift-support` plugin with the `SwiftVersion` preference (https://outsystemsrd.atlassian.net/browse/RMET-4037).

## 2.1.1

### Features
- Feat: Android | Update dependency to Firebase Performance Android library (https://outsystemsrd.atlassian.net/browse/RMET-3608).

## 2.1.0

### Chores
- Update `FirebasePerformance` iOS pod to version `10.23.0` (https://outsystemsrd.atlassian.net/browse/RMET-3274).

## [2.0.0]

## 2023-08-11
- Feat: update firebase core version (https://outsystemsrd.atlassian.net/browse/RMET-2451).

## [1.0.7]

## 2022-10-31
- Replaced jcenter with more up to date mavenCentral

### 2022-11-10
- Use fixed versions (https://outsystemsrd.atlassian.net/browse/RMET-2045).

## [1.0.6]
### Fixes
- Removed hook that adds swift support and added the plugin as dependecy. (https://outsystemsrd.atlassian.net/browse/RMET-1680)

## [1.0.5]
### 2022-06-22
- Update 'add_swift_support' hook to the latest version.

## [1.0.4]
### 2022-05-16
- Update dependency to firebase-core to have error message improved (https://outsystemsrd.atlassian.net/browse/RMET-1538)

## [1.0.3]
## 2022-04-19
- Hook to add google services dependency to build.gradle. [RMET-1497](https://outsystemsrd.atlassian.net/browse/RMET-1497)

## [1.0.2]

## 2021-11-05
- New plugin release to include metadata tag setting compatibility with MABS versions

## 2021-08-24
- Updated Firebase plugin versions to 8.6.0 on iOS and 20.0.+ on Android [RMET-732](https://outsystemsrd.atlassian.net/browse/RMET-732)

## [1.0.1]

## 2021-07-22
- Added the Firebase Core dependency to install config files [RMET-695](https://outsystemsrd.atlassian.net/browse/RMET-695)

## 2021-07-13
- Migrating package upload to newer Saucelabs API [RMET-761](https://outsystemsrd.atlassian.net/browse/RMET-761)

## [1.0.0]

## 2021-04-05
- Fix: removeTraceAttribute renamed
## 2021-03-29
- Fix: Fixed hook unzipAndCopyConfigurations

## 2021-03-18
- feature: added pipelines configuration (https://outsystemsrd.atlassian.net/browse/RMET-437)

## 2021-03-15
- feature: added android and iOS native implementation (https://outsystemsrd.atlassian.net/browse/RMET-547)

## 2021-03-11
- feature: added dependencies to firebase and analytics plugin (https://outsystemsrd.atlassian.net/browse/RMET-547)

## 2021-03-09
- feature: added ci pipeline (https://outsystemsrd.atlassian.net/browse/RMET-546)
- feat: created javascript layer (https://outsystemsrd.atlassian.net/browse/RMET-548)

## 2021-03-08
- chore: plugin repository created (https://outsystemsrd.atlassian.net/browse/RMET-546)
