// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "cordova-outsystems-firebase-performance",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "cordova-outsystems-firebase-performance",
            targets: ["FirebasePerformancePlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "10.29.0")
    ],
    targets: [
        .target(
            name: "FirebasePerformancePlugin",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "FirebasePerformance", package: "firebase-ios-sdk")
            ],
            path: "src/ios")
    ]
)
