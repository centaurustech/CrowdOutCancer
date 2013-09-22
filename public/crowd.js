

function CrowdOutBallsCtrl ($scope) {

	var field;

	$scope.init = function () {
		//field = CreateField(100);
		//setInterval($scope.randomise, 3000);
	};

	$scope.randomise = function () {
		field.randomise();
	};

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