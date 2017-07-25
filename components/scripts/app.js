/*jslint browser: true*/
/*jslint devel: true */

var require = require;
window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var nameRegEx = /[\d_+\.,!@#$%\^&*();\/|<>"'?=+:]/,
	postCodes = /^[A-Za-z0-9]{2,4}\s+[A-Za-z0-9]{2,4}$/,
	postCodesForbid = /[_+\.,!@#$%\^&*();\/|<>"'?=+:]/,
	ukMobilePatterns = [/^(\d{10,11})$/,
						/\d{4}\s\d{3}\s\d{4}/,
						/\d{4}\s\d{3}\s\d{2}\s\d{2}/,
					   /\d{3}\s\d{3}\s\d{4}/,
					   /\d{4}-\d{3}-\d{4}/,
					   /\d{4}-\d{3}-\d{2}-\d{2}/],
	emailPattern = /^[a-z\d]+[\w\d.\-]*@(?:[a-z\d]+[a-z\d\-]+\.){1,5}[a-z]{2,6}$/i,
	streetPattern = /[&\^@*();|<>"'?=+]/,
	i,
	inputItem = document.querySelectorAll('.person-details input.child'),
	submitBtn = document.getElementById('submit-btn');


//4. Valitaion of First name, last name and city.
function checkNames(source) {
	'use strict';
	var srcValue = source.value;
	if (srcValue.length <= 0) {
		source.className = 'child danger';
		return false;
	} else if (srcValue.search(nameRegEx) === -1) {
		source.className = 'child passed';
		return true;
	} else {
		source.className = 'child danger';
		return false;
	}
}

//7. Valitaion of First name, last name and city.
function checkStreet(source) {
	'use strict';
	var srcValue = source.value;

	if (srcValue.length <= 0) {
		source.className = 'child danger';
		return false;
	} else if (srcValue.search(streetPattern) === -1) {
		source.className = 'child passed';
		return true;
	} else {
		source.className = 'child danger';
		return false;
	}
}

//5. Valitaion of Postcodes
function checkPostCode(source) {
	'use strict';
	var srcValue = source.value;
	console.log(source.className);
	if (srcValue.length <= 0) {
		source.className = 'child danger';
	} else if (srcValue.search(postCodesForbid) === -1) {
		if (postCodes.test(srcValue) === true) {
			source.className = 'child passed';
			return true;
		} else {
			source.className = 'child danger';
			return false;
		}
	} else {
		source.className = 'child danger';
		return false;
	}
}

//6. Valitaion of Mobile
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
	if (srcName === 'street_line_2' && src.value === '') {
		src.placeholder = '';
		src.className = 'child passed';
	} else if (src.value !== '') {
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
		case 'street_line_1':
		case 'street_line_2':
			checkStreet(src);
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
	var validated = true;
	if (checkNames(inputItem[0]) !== true) {
		validated = false;
	}
	if (checkNames(inputItem[1]) !== true) {
		validated = false;
	}
	if (checkEmail(inputItem[2]) !== true) {
		validated = false;
	}
	if (checkMobile(inputItem[3]) !== true) {
		validated = false;
	}
	if (checkStreet(inputItem[4]) !== true) {
		validated = false;
	}
	//item 5 not required
	if (checkNames(inputItem[6]) !== true) {
		validated = false;
	}
	if (checkPostCode(inputItem[7]) !== true) {
		validated = false;
	}

	if (validated === true) {
		return true;
	} else {
		alert('Error! Please check again!');
		return false;
	}

};
