package com.integreat.fetcher;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.*;

import okhttp3.Callback;
import okhttp3.*;
import okio.BufferedSink;
import okio.Okio;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class FetcherModule extends ReactContextBaseJavaModule {
    private OkHttpClient client = new OkHttpClient.Builder().build();

    public FetcherModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void fetchAsync(final ReadableMap urls, final Promise promise) {
        HashMap<String, Object> urlMap = urls.toHashMap();
        int expectedFetchCount = urlMap.size();
        FetchResultCollector collector = new FetchResultCollector(
                getReactApplicationContext(),
                expectedFetchCount, promise
        );

        for (Map.Entry<String, Object> entry : urlMap.entrySet()) {
            String targetFilePath = entry.getKey();
            String url = entry.getValue().toString();
            fetchAsync(url, targetFilePath, collector);
        }
    }

    private void fetchAsync(final String sourceUrl, String targetFilePath, final FetchedCallback callback) {
        final File targetFile = new File(targetFilePath);

        if (targetFile.exists()) {
            callback.alreadyExists(sourceUrl, targetFile);
            return;
        }

        try {
            Request request = new Request.Builder().url(sourceUrl).build();
            Call call = client.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(@NonNull Call call, @NonNull IOException e) {
                    callback.failed(sourceUrl, e.getMessage());
                }

                @Override
                public void onResponse(@NonNull Call call, @NonNull Response response) {
                    if (!response.isSuccessful()) {
                        callback.failed(sourceUrl, response.code() + ": " + response.message());
                        return;
                    }

                    try {
                        targetFile.getParentFile().mkdirs();

                        BufferedSink sink = Okio.buffer(Okio.sink(targetFile));
                        sink.writeAll(response.body().source());
                        sink.close();

                        callback.fetched(sourceUrl, targetFile);
                    } catch (IOException e) {
                        callback.failed(sourceUrl, e.getMessage());
                    }
                }
            });
        } catch (Exception e) {
            callback.failed(sourceUrl, e.getMessage());
        }
    }

    @Override
    public String getName() {
        return "Fetcher";
    }
}

