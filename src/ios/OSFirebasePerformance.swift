import UIKit

@objc(OSFirebasePerformance)
class OSFirebasePerformance : CDVPlugin {
    var plugin: FirebasePerformancePlugin!
    
    override func pluginInitialize() {
        plugin = FirebasePerformancePlugin()
    }
    
    @objc(startTrace:)
    func startTrace(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        plugin.starTrace(traceName: traceName)
    }
    
    @objc(stopTrace:)
    func stopTrace(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        plugin.stopTrace(traceName: traceName)
    }

    @objc(addTraceAttribute:)
    func addTraceAttribute(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        let attributeName = command.arguments[1] as? String ?? ""
        let value = command.arguments[2] as? String ?? ""
        plugin.addTraceAttribute(traceName: traceName, attributeName: attributeName, value: value)
    }

    @objc(removeTraceAttribute:)
    func removeTraceAttribute(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        let attributeName = command.arguments[1] as? String ?? ""
        plugin.removeTraceAttribute(traceName: traceName, attributeName: attributeName)
    }

    @objc(incrementMetric:)
    func incrementMetric(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        let metricName = command.arguments[1] as? String ?? ""
        let value = command.arguments[2] as? Int64 ?? 0
        plugin.incrementMetric(traceName: traceName, metricName: metricName, value: value)
    }
    
    @objc(setPerformanceCollectionEnabled:)
    func setPerformanceCollectionEnabled(command: CDVInvokedUrlCommand) {
        let enabled = command.arguments[0] as? Bool ?? false
        plugin.setPerformanceCollectionEnabled(enabled: enabled)
    }
    
}
