package com.example.httpmock;

import android.os.Build;
import android.os.StrictMode;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private TextView textView;
    private EditText editGet;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = findViewById(R.id.txtViewResult);
        editGet = findViewById(R.id.editGet);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void onClickGet(View v) {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url("http://fake.server.com/index.html?id="+editGet.getText())
                .build();

        try (Response response = client.newCall(request).execute()) {
            textView.setText(response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
            textView.setText("Servidor no disponible. Intente luego");
        }
    }
}
