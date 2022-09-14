package com.extencereactnativeappmetrica;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.yandex.metrica.YandexMetrica;
import com.yandex.metrica.YandexMetricaConfig;

@ReactModule(name = ReactNativeAppmetricaModule.NAME)
public class ReactNativeAppmetricaModule extends ReactContextBaseJavaModule {
    public static final String NAME = "ReactNativeAppmetrica";

  private final ReactApplicationContext reactContext;

    public ReactNativeAppmetricaModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }
    

    @ReactMethod
    public void setup(String key, ReadableMap config) {
      YandexMetricaConfig.Builder builder = YandexMetricaConfig.newConfigBuilder(key);


      if (config.hasKey("appVersion")) {
        builder.withAppVersion(config.getString("appVersion"));
      }

      if (config.hasKey("revenueAutoTrackingEnabled")) {
        builder.withRevenueAutoTrackingEnabled(config.getBoolean("revenueAutoTrackingEnabled"));
      }

      YandexMetrica.activate(reactContext, builder.build());
    }

    @ReactMethod
    public void reportEvent(String name, ReadableMap attributes) {
      if (attributes == null) {
        YandexMetrica.reportEvent(name);
      } else {
        YandexMetrica.reportEvent(name, attributes.toHashMap());
      }
    }

}
