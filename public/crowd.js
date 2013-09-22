

function CrowdOutBallsCtrl ($scope) {

	$scope.init = function () {
		var b = CreateBall(100, 0, 0);
		b.setPosition(200, 200);
	};

}

function CreateField () {

	var ball = CreateBall(100, 100, 100);

	return {
		balls: [ball],

		render: function () {
			Render(balls);
		}
	};

}

function CreateBall(radius, xPos, yPos) {

	var el = document.createElement('div');
	document.getElementsByTagName('body')[0].insertBefore(el, null);
	el.style.width = (2*radius) + 'px';
	el.style.height = (2*radius) + 'px';
	el.style.background = 'red';
	el.style.borderRadius = '50%';
	//el.style.borderTopLeftRadius = '50%';
	//el.style.borderTopRightRadius = '50%';
	//el.style.borderBottomLeftRadius = '50%';
	//el.style.borderBottomRightRadius = '50%';

	var x = xPos;
	var y = yPos;

	return {
		radius: radius,
		setPosition: function(xPos, yPos) {
			x = xPos;
			y = yPos;
			var transform = "translate(" + x + "," + y + ")";
			el.style.webkitTransform = transform;
		    el.style.mozTransform = transform;
		    el.style.msTransform = transform;
		    el.style.oTransform = transform;
		    el.style.transform = transform;
		},
		getPosition: function(){
			return {x: x, y: y};
		}
	};
}