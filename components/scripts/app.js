/*jslint browser: true*/
/*jslint devel: true */
var require = require;
window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var nameRegEx = /[\d_+.,!@#$%\^&*();\/|<>"'?=+:]/g,
	postCodes = /^[A-Za-z0-9]{2,4}\s+[A-Za-z0-9]{2,4}$/,
	postCodesForbid = /[_+.,!@#$%\^&*();\/|<>"'?=+:]/g,
	i,
	inputItem = document.querySelectorAll('.person-details input.child');


//3. Valitaion of First name, last name and city.
function checkNames(source) {
	'use strict';
	var srcValue = source.value;
	if (srcValue.search(nameRegEx) === -1) {
		source.className = 'child passed';
	} else {
		source.className = 'child danger';
	}
	
}

//4. Valitaion of Postcodes
function checkPostCode(source) {
	'use strict';
	var srcValue = source.value;
	if (srcValue.search(postCodesForbid) === -1) {
		if (postCodes.test(srcValue) === true) {
			source.className = 'child passed';
		} else {
			source.className = 'child danger';
		}
	} else {
		source.className = 'child danger';
	}
}


//2. Handler function for event listener
function myHandler(e) {
	'use strict';
	var src,
		srcName;
	e = e || window.event;
	src = e.target || e.srcElement;
	/*if (src.nodeName.toLowerCase() !== 'input') {
		return;
	}*/
	
	srcName = src.name;
	
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
		}
	} else {
		src.className = 'child';
	}
}

// 1. Adding event listeners to input items in .person-details section
for (i = 0; i < inputItem.length; i = i + 1) {
	inputItem[i].addEventListener('blur', myHandler, false);
}
