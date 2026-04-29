// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "cordova-outsystems-firebase-performance",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "cordova-outsystems-firebase-performance",
            targets: ["cordova-outsystems-firebase-performance"])
    ],
    dependencies: [
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "10.29.0")
    ],
    targets: [
        .target(
            name: "cordova-outsystems-firebase-performance",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "FirebasePerformance", package: "firebase-ios-sdk")
            ],
            path: "src/ios"),
            publicHeadersPath: ".")
    ]
)
