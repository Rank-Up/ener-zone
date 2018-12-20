// Cookie functions.

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

function setCookie(name, value, options) {
  options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
	  var d = new Date();
	  d.setTime(d.getTime() + expires * 1000);
	  expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
	  options.expires = expires.toUTCString();
	};

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
	  updatedCookie += "; " + propName;
	  var propValue = options[propName];
	  if (propValue !== true) {
	    updatedCookie += "=" + propValue;
	  }
	}

  document.cookie = updatedCookie;
};

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
};

// Logout.
function setLogout (socket) {
	$('#logout').on('click', function (event) {
		socket.emit('logout', 'rip');
	})

	socket.on('success-logout', function (res) {
		localStorage.removeItem('EnerZoneToken');
		localStorage.removeItem('EnerZoneNickname');
	})
}
