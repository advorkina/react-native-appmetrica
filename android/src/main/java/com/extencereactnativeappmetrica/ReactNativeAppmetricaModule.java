package com.extencereactnativeappmetrica;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.yandex.metrica.Revenue;
import com.yandex.metrica.YandexMetrica;
import com.yandex.metrica.YandexMetricaConfig;

import java.util.Currency;

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

      if(config != null) {
        if (config.hasKey("appVersion")) {
          builder.withAppVersion(config.getString("appVersion"));
        }

        if (config.hasKey("revenueAutoTrackingEnabled")) {
          builder.withRevenueAutoTrackingEnabled(config.getBoolean("revenueAutoTrackingEnabled"));
        }
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

  @ReactMethod
  public void reportPurchase(String price, String currency, String productId, Double quantity, String orderId, String source, String key) {
    Revenue revenue = Revenue.newBuilderWithMicros((long) (Double.parseDouble(price) * Math.pow(10, 6)), Currency.getInstance(currency))
      .withProductID(productId)
      .withQuantity(quantity.intValue())
      .withPayload(String.format("{\"OrderID\":\"%s\", \"source\":\"%s\"}", orderId, source))
      .build();
    YandexMetrica.getReporter(reactContext, key).reportRevenue(revenue);
  }

}
