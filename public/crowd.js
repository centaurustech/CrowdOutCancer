

function CrowdOutBallsCtrl ($scope) {

	var field;

	$scope.logged_in = false;
	$scope.user_name = '';
	$scope.user_image = '';

	$scope.init = function () {
		setTimeout(function () {
			test_logged_in($scope);
		}, 300);
	};

	$scope.randomise = function () {
		field.randomise();
	};

	$scope.fb_login = function () {

		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				get_user_details($scope);
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});

	};

	$scope.fb_logout = function () {
		FB.logout(function(response) {
			$scope.logged_in = false;
		});
	};

}



function test_logged_in ($scope) {
	FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				// the user is logged in and has authenticated your
				// app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed
				// request, and the time the access token 
				// and signed request each expire
				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;

				get_user_details($scope);

			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, 
				// but has not authenticated your app
			} else {
				// the user isn't logged in to Facebook.
			}
		});
}





function get_user_details ($scope) {
	FB.api('/me?fields=picture,name', function(response) {
		console.log('Good to see you, ' + response.name + '.');
		$scope.user_name = response.name;
		$scope.user_image = response.picture.data.url;
		$scope.logged_in = true;
	});
}

function CreateField (numBalls) {

	var balls = [];

	for(var i=0; i<numBalls; ++i) {
		balls.push(CreateRandomBall());
	}

	return {
		balls: balls,

		randomise: function() {
			for(var i in balls) {
				var p = GetRandomPosition(960, 960);
				balls[i].setPosition(p.x, p.y);
			}
		}
	};

}

function CreateRandomBall() {
	var pos = GetRandomPosition(960, 960);
	var radius = GetRandomNumber(10, 150);
	var colour = GetRandomColour();
	return CreateBall(radius, pos.x, pos.y, colour);
}

function GetRandomColour() {
	if(Math.random() < 0.5) {
		return 'red';
	}

	return 'white';
}

function GetRandomPosition(xmax, ymax) {
	return {
		x: GetRandomNumber(0, xmax),
		y: GetRandomNumber(0, ymax)
	};
}

function GetRandomNumber (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function CreateBall(radius, xPos, yPos, colour) {

	var el = document.createElement('div');
	document.getElementsByTagName('body')[0].insertBefore(el, null);
	el.style.width = (2*radius) + 'px';
	el.style.height = (2*radius) + 'px';
	el.style.background = colour;
	//el.style.borderRadius = '50%';

	el.style.position = 'absolute';
	el.className = 'ball';
	el.style.top = '0';
	el.style.left = '0';

	//el.style.borderTopLeftRadius = '50%';
	//el.style.borderTopRightRadius = '50%';
	//el.style.borderBottomLeftRadius = '50%';
	//el.style.borderBottomRightRadius = '50%';

	var x, y;

	var setPosition = function(xPos, yPos) {
		x = xPos;
		y = yPos;
		var transform = "translate(" + x + "px, " + y + "px)";
		el.style.webkitTransform = transform;
	    el.style.mozTransform = transform;
	    el.style.msTransform = transform;
	    el.style.oTransform = transform;
	    el.style.transform = transform;
	};

	setPosition(xPos, yPos);

	return {
		radius: radius,
		setPosition: setPosition,
		getPosition: function() {
			return {x: x, y: y};
		}
	};
}