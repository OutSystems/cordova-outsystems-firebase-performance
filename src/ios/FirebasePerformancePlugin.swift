import FirebasePerformance
import FirebaseCore

class FirebasePerformancePlugin {
    var traces: [String: Trace] = [:]
    
    func configureApp() {
        guard FirebaseApp.app() == nil else { return }
        FirebaseApp.configure()
    }
    
    func starTrace(traceName: String){
        if !traceName.isEmpty {
            if let trace = traces[traceName] {
                trace.start()
            } else {
                let trace = Performance.startTrace(name: traceName)
                traces[traceName] = trace
            }
        }
    }
    
    func stopTrace(traceName: String) {
        if !traceName.isEmpty {
            if let trace = traces[traceName] {
                trace.stop()
            } else {
                let trace = traces[traceName]
                trace?.stop()
            }
        }
    }

    func addTraceAttribute(traceName: String, attributeName: String ,value: String) {
        if !traceName.isEmpty && !attributeName.isEmpty && !value.isEmpty {
            if let trace = traces[traceName] {
                trace.setValue(attributeName, forAttribute: value)
            }
        }
    }
    
    func removeTraceAttribute(traceName: String, attributeName: String) {
        if !traceName.isEmpty && !attributeName.isEmpty {
            if let trace = traces[traceName] {
                trace.removeAttribute(attributeName)
            }
        }
    }

    func incrementMetric(traceName: String, metricName: String ,value: Int64) {
        if !traceName.isEmpty && !metricName.isEmpty && value != 0 {
            if let trace = traces[traceName] {
                trace.incrementMetric(metricName, by: value)
            }
        }
    }
    
    func setPerformanceCollectionEnabled(enabled: Bool) {
        Performance.sharedInstance().isDataCollectionEnabled = enabled
    }
        
}
