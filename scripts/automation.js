//frida -U --no-pause -l automation.js -f com.example.httpmock
        Java.perform(function() {
		Java.choose('com.example.httpmock.MainActivity', {
			onMatch: function(instance) {
				main = instance;
			},
			onComplete: function() {}
		});
		var EditText = Java.use("android.widget.EditText");  

		var BufferType= Java.use('android.widget.TextView$BufferType');
        var SPANNABLE = BufferType.valueOf("SPANNABLE");

		editGet = main.editGet.value;
		console.log("llega");

		var JavaString = Java.use("java.lang.String");
		var androidActivityClass = Java.use("android.app.Activity");
		var Runnable = Java.use("java.lang.Runnable");  
		Java.registerClass({
		   name: 'com.test.RunnableComponent',
		   implements: [Runnable],
		   methods: {
		       'run': function() {
		       		console.log("classname: " + editGet.$className);
				   editGet.setText(JavaString.$new("1"),SPANNABLE);
				   main.onClickGet(null);
		       }
		  }
		});
		
		mainActivity = Java.cast(main.$handle,androidActivityClass);
		mainActivity.runOnUiThread(Java.use("com.test.RunnableComponent").$new());
	});
	/*var button = Java.use('android.widget.Button');
    		var checkid = main.findViewById(2131165231);
    		var check = Java.cast(checkid.$handle, button);
    		var string = Java.use('java.lang.String');
    		check.setText(string.$new("Confirm"));*/
    
    		// Bonus Track
    		/*var textview = Java.use('android.widget.TextView');
    		var description = main.findViewById(2131165328);
    		var desc = Java.cast(description.$handle, textview);
    		var string = Java.use('java.lang.String');
    		desc.setText(string.$new("App made by Ross Marks.\nWriteup by Shielder. :)"));*/
	

