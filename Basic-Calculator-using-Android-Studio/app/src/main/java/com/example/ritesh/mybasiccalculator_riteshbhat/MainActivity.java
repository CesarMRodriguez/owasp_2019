package com.example.ritesh.mybasiccalculator_riteshbhat;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private Button button,button2,button3,button4,button5;
    private EditText editText,editText2;
    private EditText editText3, editText4;

    android.R.id


    @Override
    protected void onCreate(Bundle savedInstanceState)  {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        startcalc();
    }

    private void startcalc()
    {
        button=(Button)findViewById(R.id.button);
        button2=(Button)findViewById(R.id.button2);
        button3=(Button)findViewById(R.id.button3);
        button4=(Button)findViewById(R.id.button4);
        button5=(Button)findViewById(R.id.button5);
        editText=(EditText)findViewById(R.id.editText);
        editText2=(EditText)findViewById(R.id.editText2);
        editText3=(EditText)findViewById(R.id.editText3);
        editText4=(EditText)findViewById(R.id.editText4);

        R
        button.setOnClickListener(this);
        button2.setOnClickListener(this);
        button3.setOnClickListener(this);
        button4.setOnClickListener(this);

    }

    private Integer multiply(Integer int1, Integer int2) {
        return int1 * int2;
    }

    private Integer add(Integer int1, Integer int2) {
        return int1 + int2;
    }

    private Integer subtract(Integer int1, Integer int2) {
        return int1 - int2;
    }

    private Integer divide(Integer int1, Integer int2) {
        return int1 / int2;
    }


    @Override
    public void onClick(View view)
    {
        String num1=editText.getText().toString();
        String num2=editText2.getText().toString();
        this.findViewById()
        switch(view.getId())
        {
            case R.id.button:
                int mul= multiply(Integer.parseInt(num1), Integer.parseInt(num2));
                editText3.setText(String.valueOf(mul));
            break;
            case R.id.button2:
                int add= add(Integer.parseInt(num1), Integer.parseInt(num2));
                editText3.setText(String.valueOf(add));
                break;
            case R.id.button3:
                int sub= subtract(Integer.parseInt(num1), Integer.parseInt(num2));
                editText3.setText(String.valueOf(sub));
                break;
            case R.id.button4:
                try {
                    int div = divide(Integer.parseInt(num1), Integer.parseInt(num2));
                    editText3.setText(String.valueOf(div));
                }
                catch(Exception e)
                {
                    editText3.setText("Div. By 0..!!");
                }
                break;


        }
    }

    public void testCharSequence(CharSequence charSequence) {

    }

    public void executeToast(View view, String message)
    {
        Context context=getApplicationContext();
        int duration= Toast.LENGTH_LONG;

        Toast toast=Toast.makeText(context,message,duration);
        toast.show();
    }

    public void BasicToast(View view)
    {
        executeToast(view, editText4.getText().toString());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
