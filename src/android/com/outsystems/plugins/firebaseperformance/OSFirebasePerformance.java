package com.outsystems.plugins.firebaseperformance;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class OSFirebasePerformance extends CordovaPlugin {

    private final static String KEY_ACTION_START_TRACE = "startTrace";
    private final static String KEY_ACTION_STOP_TRACE = "stopTrace";
    private final static String KEY_ACTION_ADD_TRACE_ATTRIBUTE = "addTraceAttribute";
    private final static String KEY_ACTION_INCREMENT_METRIC = "incrementMetric";
    private final static String KEY_ACTION_SET_PERFORMANCE_COLLECTION_ENABLED = "setPerformanceCollectionEnabled";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals(KEY_ACTION_START_TRACE)) {
            this.startTrace(args, callbackContext);
            return true;
        }
        else if (action.equals(KEY_ACTION_STOP_TRACE)) {
            this.stopTrace(args, callbackContext);
            return true;
        }
        else if (action.equals(KEY_ACTION_ADD_TRACE_ATTRIBUTE)) {
            this.addTraceAttribute(args, callbackContext);
            return true;
        }
        else if (action.equals(KEY_ACTION_INCREMENT_METRIC)) {
            this.incrementMetric(args, callbackContext);
            return true;
        }
        else if (action.equals(KEY_ACTION_SET_PERFORMANCE_COLLECTION_ENABLED)) {
            this.setPerformanceCollectionEnabled(args, callbackContext);
            return true;
        }
        return false;
    }

    private void startTrace(JSONArray args, CallbackContext callbackContext) {
        //TODO
    }

    private void stopTrace(JSONArray args, CallbackContext callbackContext) {
        //TODO
    }

    private void addTraceAttribute(JSONArray args, CallbackContext callbackContext) {
        //TODO
    }

    private void incrementMetric(JSONArray args, CallbackContext callbackContext) {
        //TODO
    }

    private void setPerformanceCollectionEnabled(JSONArray args, CallbackContext callbackContext) {
        //TODO
    }

}