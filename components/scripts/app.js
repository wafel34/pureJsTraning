/*jslint browser: true*/
/*jslint devel: true */

var require = require;
window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var nameRegEx = /[\d_+.,!@#$%\^&*();\/|<>"'?=+:]/i,
	postCodes = /^[A-Za-z0-9]{2,4}\s+[A-Za-z0-9]{2,4}$/i,
	postCodesForbid = /[_+.,!@#$%\^&*();\/|<>"'?=+:]/i,
	ukMobilePatterns = [/^(\d{10,11})$/i,
						/\d{4}\s\d{3}\s\d{4}/i,
						/\d{4}\s\d{3}\s\d{2}\s\d{2}/i,
					   /\d{3}\s\d{3}\s\d{4}/i,
					   /\d{4}-\d{3}-\d{4}/i,
					   /\d{4}-\d{3}-\d{2}-\d{2}/i],
	emailPattern = /^[a-z\d]+[\w\d.\-]*@(?:[a-z\d]+[a-z\d\-]+\.){1,5}[a-z]{2,6}$/i,
	i,
	inputItem = document.querySelectorAll('.person-details input.child'),
	submitBtn = document.getElementById('submit-btn');


//4. Valitaion of First name, last name and city.
function checkNames(source) {
	'use strict';
	var srcValue = source.value;
	if (srcValue.search(nameRegEx) === -1) {
		source.className = 'child passed';
		return true;
	} else {
		source.className = 'child danger';
	}
}

//5. Valitaion of Postcodes
function checkPostCode(source) {
	'use strict';
	var srcValue = source.value;
	if (srcValue.search(postCodesForbid) === -1) {
		if (postCodes.test(srcValue) === true) {
			source.className = 'child passed';
			return true;
		} else {
			source.className = 'child danger';
			return false;
		}
	} else {
		source.className = 'child danger';
	}
}

//5. Valitaion of Mobile
function checkMobile(source) {
	'use strict';
	var srcValue = source.value,
		result;
	result = ukMobilePatterns.filter(function (item) {
		return (item.test(srcValue) === true);
	});
		
	if (result.length > 0) {
		source.className = 'child passed';
		return true;
	} else {
		source.className = 'child danger';
		return false;
	}
}

function checkEmail(source) {
	'use strict';
	var srcValue = source.value;
	
	if (emailPattern.test(srcValue) === true) {
		source.className = 'child passed';
		return true;
	} else {
		source.className = 'child danger';
		return false;
	}
}

//3. Checking the input type.
function checkType(src) {
	'use strict';
	//Assinging the name attribute to the variable
	var srcName = src.name;
	if (src.value !== '') {
		switch (srcName) {
		case 'first_name':
		case 'last_name':
		case 'city':
			checkNames(src);
			break;
		case 'postcode':
			checkPostCode(src);
			break;
		case 'phone_number':
			checkMobile(src);
			break;
		case 'email_address':
			checkEmail(src);
			break;
		}
	} else {
		src.className = 'child';
	}
}

//2. Handler function for event listener
function myHandler(e) {
	'use strict';
	var src;
	e = e || window.event;
	src = e.target || e.srcElement;

	//Calling checkType function.
	checkType(src);
}

// 1. Adding event listeners to input items in .person-details section
inputItem.forEach(function (item) {
	'use strict';
	return item.addEventListener('blur', myHandler, false);
});


submitBtn.onclick = function () {
	'use strict';
	if (checkPostCode(inputItem[7])) {
		return true;
	} else {
		alert('Błąd!');
		return false;
	}
};