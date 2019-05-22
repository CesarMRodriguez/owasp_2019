//frida -U --no-pause -l automation2.js com.example.ritesh.mybasiccalculator_riteshbhat

function getButton(operation) {
	switch (operation) {
		case '+': return buttonAdd;
		case '-': return buttonSub;
		case '*': return buttonMul;
		case '/': return buttonDiv;
	}
}

function testExample(int1,int2, expected, operation) {
	var Runnable = Java.use("java.lang.Runnable");  
	var androidActivityClass = Java.use("android.app.Activity");
	var JavaString = Java.use("java.lang.String");
	
	var BufferType= Java.use('android.widget.TextView$BufferType');
    var SPANNABLE = BufferType.valueOf("SPANNABLE");

	var SpannableStringBuilder = Java.use("android.text.SpannableStringBuilder");
		
		
	Java.registerClass({
	   name: 'com.test.RunnableComponent',
	   implements: [Runnable],
	   methods: {
	       'run': function() {
	       	   editNumero1.setText(JavaString.$new(int1),SPANNABLE);
			   editNumero2.setText(JavaString.$new(int2),SPANNABLE);
			   
			   var button = getButton(operation); 
			   button.callOnClick();
			   var text = Java.cast(editResultado.getText(), SpannableStringBuilder);
			   if (text == expected) {
			   		console.log("[+] test "+int1+" + "+int2 + " exitoso");
			   } else {
			   		console.error("[-] test "+int1+" + "+int2 + " retorno " + text + " y esperaba " + expected);
			   }
			   console.log("Valor devuelto: " + text);
			   
	       }
	  }
	});

	mainActivity = Java.cast(main.$handle,androidActivityClass);
	mainActivity.runOnUiThread(Java.use("com.test.RunnableComponent").$new());
}

    Java.perform(function() {
		Java.choose('com.example.ritesh.mybasiccalculator_riteshbhat.MainActivity', {
			onMatch: function(instance) {
				main = instance;
			},
			onComplete: function() {}
		});
		var EditText = Java.use("android.widget.EditText");  

        //obtengo variables que necesito para la automatizacion
		editNumero1 = main.editText.value;
		editNumero2 = main.editText2.value;

		editResultado = main.editText3.value;
		
		res = editResultado.getText().toString();
		res2 = editResultado.getText();
		buttonAdd = main.button2.value;
		buttonSub = main.button3.value;
		buttonMul = main.button.value;
		buttonDiv = main.button4.value;
		var Thread = Java.use("java.lang.Thread");
		
		//obtengo la vista para forzar el redibujo de la pantalla
		r_id = Java.use("com.example.ritesh.mybasiccalculator_riteshbhat.R$id");
		mainView = main.findViewById(r_id.main0oo.value);

		//tests suma
		testExample("1","4","5","+");
		Thread.sleep(1000);
		testExample("1","6","7","+");
		Thread.sleep(1000);
		testExample("1","-1","0","+");
		Thread.sleep(1000);
		testExample("2","-1","1","+");
		Thread.sleep(1000);
		testExample("-7","5","-2","+");
		Thread.sleep(1000);

		//tests restas
		testExample("5","2","3","-");
		Thread.sleep(1000);
		testExample("2","5","-3","-");
		Thread.sleep(1000);
		testExample("-1","-1","0","-");
		Thread.sleep(1000);
		testExample("1","-1","2","-");
		Thread.sleep(1000);

		//tests multiplicacion
		testExample("3","2","6","*");
		Thread.sleep(1000);
		testExample("5","0","0","*");
		Thread.sleep(1000);
		testExample("7","-1","-7","*");
		Thread.sleep(1000);
		testExample("-3","-3","9","*");
		Thread.sleep(1000);

		//tests division
		testExample("6","2","3","/");
		//tests division
		testExample("3","2","1","/");
		//tests division
		testExample("2","3","0","/");
		//tests division
		testExample("5","0","Div. By 0..!!","/");
		
		
	});