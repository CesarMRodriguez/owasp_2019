//frida -U --no-pause -l demo3/http-mock.js com.example.httpmock
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

function returnMessage(id) {
	switch (id) {
		case "1": return "{'codigo':200,'mensaje':'correcto'}";
		case "2": return "{'codigo':302,'mensaje':'redireccion a otra url'}";
		case "3": return "{'codigo':403,'mensaje':'forbidden'}";
		case "4": return "{'codigo':500,'mensaje':'Server error'}";
		case "5": return "{'codigo':666,'mensaje':'el numero de la bestia'}";
		default: return "{'codigo':0,'mensaje':'codigo no mockeado'}"; 
	}
}

Java.perform( function () {
	var Response = Java.use("okhttp3.Response");
	var Builder = Java.use("okhttp3.Response$Builder");
	var RealCall = Java.use("okhttp3.RealCall");
	
	var RealResponseBody = Java.use("okhttp3.internal.http.RealResponseBody");
	var ResponseBody = Java.use("okhttp3.ResponseBody");

	const JavaString = Java.use('java.lang.String');
	
	RealCall.execute.implementation = function () {
		var builder = Builder.$new();
		originalRequest = this.originalRequest.value._url;
		var url = this.originalRequest.value._url.value.toString();
		//obtengo todos los valores
		var id = getAllUrlParams(url).id;
		var mensaje = returnMessage(id);

		this.originalRequest.value._
		response = Response.$new(builder);
		response._body.value = RealResponseBody.$new(JavaString.$new(mensaje),12,null);
		response._request.value = this.originalRequest.value;
		return response;
	}

	ResponseBody.string.implementation = function() {
		var realResponseBody = Java.cast(this,RealResponseBody);
		realResponseEntity = realResponseBody;
		return realResponseBody.contentTypeString.value;
	}
	//RealCall.
});
