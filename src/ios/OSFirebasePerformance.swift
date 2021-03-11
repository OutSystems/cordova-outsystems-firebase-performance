import UIKit
import Firebase

@objc(OSFirebasePerformance)
class OSFirebasePerformance : CDVPlugin {
    var traces = Dictionary<String, Any>()
    
    @objc(startTrace:)
    func startTrace(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        if !traceName.isEmpty {
            if let trace = traces[traceName] {
                (trace as? Trace)?.start()
            } else {
                let trace = Performance.startTrace(name: traceName)
                traces[traceName] = trace
            }
        }

    }
    
    @objc(stopTrace:)
    func stopTrace(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        if !traceName.isEmpty {
            if let trace = traces[traceName] {
                (trace as? Trace)?.stop()
            } else {
                let trace = traces[traceName]
                (trace as? Trace)?.stop()
            }
        }
    }
    
    @objc(addTraceAttribute:)
    func addTraceAttribute(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        let attributeName = command.arguments[1] as? String ?? ""
        let value = command.arguments[2] as? String ?? ""
        
        if !traceName.isEmpty && !attributeName.isEmpty && !value.isEmpty {
            if let trace = traces[traceName] {
                (trace as? Trace)?.setValue(attributeName, forAttribute: value)

            }
        }
    }
    
    @objc(removeAttribute:)
    func removeAttribute(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        let attributeName = command.arguments[1] as? String ?? ""
        
        if !traceName.isEmpty && !attributeName.isEmpty {
            if let trace = traces[traceName] {
                (trace as? Trace)?.removeAttribute(attributeName)
            }
        }
    }
    
    @objc(incrementMetric:)
    func incrementMetric(command: CDVInvokedUrlCommand) {
        let traceName = command.arguments[0] as? String ?? ""
        let metricName = command.arguments[1] as? String ?? ""
        let value = command.arguments[2] as? Int64 ?? 0
        
        if !traceName.isEmpty && !metricName.isEmpty && value != 0 {
            if let trace = traces[traceName] {
                (trace as? Trace)?.incrementMetric(metricName, by: value)
            }
        }
    }
    
    @objc(setPerformanceCollectionEnabled:)
    func setPerformanceCollectionEnabled(command: CDVInvokedUrlCommand) {
        let enabled = command.arguments[0] as? Bool ?? false
        Performance.sharedInstance().isDataCollectionEnabled = enabled
    }
    
}
