// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "com.outsystems.plugins.firebaseperformance",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "com.outsystems.plugins.firebaseperformance",
            targets: ["com.outsystems.plugins.firebaseperformance"])
    ],
    dependencies: [
        .package(url: "https://github.com/apache/cordova-ios.git", branch: "master"),
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git", from: "10.29.0")
    ],
    targets: [
        .target(
            name: "com.outsystems.plugins.firebaseperformance",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "FirebasePerformance", package: "firebase-ios-sdk")
            ],
            path: "src/ios")
    ]
)
