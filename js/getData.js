
function getData(url) {
	return new Promise((resolve, reject) => {
		const ourRequest = new XMLHttpRequest();
		ourRequest.open("GET", url, true);
		ourRequest.onload = function () {
			if (ourRequest.status == 200) {
				const json = JSON.parse(ourRequest.responseText);
				resolve(json.results);
			} else {
				reject("DATA NOT FOUND");
			}
		};
		ourRequest.onerror = function () {
			reject("CANNOT CONNECT TO THE INTERNET! PLEASE TRY AGAIN LATER!");
		};
		ourRequest.send();
	});
}
