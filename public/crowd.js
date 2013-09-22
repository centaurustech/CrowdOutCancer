

function CrowdOutBallsCtrl ($scope) {

	var field;

	var s = $scope;

	$scope.logged_in = false;
	$scope.user_name = '';
	$scope.user_image = 'http://schoolofeverything.com/files/imagecache/insert/sites/default/themes/everything2/images/blank_user_pic_insert.gif';

	$scope.randomise = function () {
		field.randomise();
	};

	$scope.fb_login = function () {

		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me?fields=picture,name', function(response) {
					console.log('Good to see you, ' + response.name + '. ' + response.picture.data.url);
					s.user_name = response.name;
					s.user_image = response.picture.data.url;
					s.logged_in = true;
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});

		return false;

	};

	$scope.fb_logout = function () {
		FB.logout(function(response) {
			s.logged_in = false;
		});
	};

	$scope.donate = function () {
		
	};

}

 // If your Heroku application is within the EU region,
 // uncomment the followling lines
 // Pusher.host = 'ws-eu.pusher.com';
 // Pusher.sockjs_host = 'sockjs-eu.pusher.com';

var pusher = new Pusher('f89afcbf862a43cde60d'); // uses your APP KEY
var channel = pusher.subscribe('test_channel');
channel.bind('donate', function(data) {
	add_donation(data);
});

function add_donation (d) {
	alert(d.amount + d.name + d.image);
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