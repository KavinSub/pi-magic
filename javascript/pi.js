var w = 600;
var h = 600;
var padding = 20;

var r = w/2;
var node_radius = 5;

var origin_x = padding + r;
var origin_y  = padding + r;

var dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var points = generatePoints();
var colors = ["#ff0000", "#ff4500", "#ffa500", "#ffcc00", "#ffff00", "#adff2f", "#00ff00", "#21b6a8", "#0000ff", "#551a8b"];

var pi = generatePI();

var delay = 800;
var duration = 800;

var svg = d3.select("body")
			.append("svg")
			.attr("width", w + padding * 2)
			.attr("height", h + padding * 2);

// Draw all the node circles
svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("cx", function(d){
		return origin_x + (r * points[d][0]);
	}).attr("cy", function(d){
		return origin_y + (r * points[d][1]);
	}).attr("r", node_radius)
	.attr("style", function(d, i){
		return "fill: " + colors[i] + ";";
	});

// Draw node labels
for(var i = 0; i < dataset.length; i++){
	svg.append("text")
		.attr("x", function(d){
			return origin_x + ((r + 15) * points[i][0]);
		}).attr("y", function(d){
			return origin_y + ((r + 15) * points[i][1]);
		}).text(i);
}	

// Draw the main background circle
svg.insert("circle", ":first-child")
	.attr("cx", w/2 + padding)
	.attr("cy", h/2 + padding)
	.attr("r", r);

// First draw all the lines
svg.selectAll("line")
	.data(pi)
	.enter()
	.append("line")
	.attr("x1", function(d, i){
		if(i > 0){
			return origin_x + (r * points[pi[i - 1]][0]);
		}else{
			return 0;
		}
	}).attr("y1", function(d, i){
		if(i > 0){
			return origin_y + (r * points[pi[i - 1]][1]);
		}else{
			return 0;
		}
	}).attr("x2", function(d, i){
		if(i > 0){
			return origin_x + (r * points[pi[i - 1]][0]);
		}else{
			return 0;
		}
	}).attr("y2", function(d, i){
		if(i > 0){
			return origin_y + (r * points[pi[i - 1]][1]);
		}else{
			return 0;
		}
	}).attr("style", function(d, i){
		if(i > 0){
			return "stroke: " + colors[pi[i - 1]] + ";";
		}else{
			return colors[0];
		}
	});

// Now animate all the lines
svg.selectAll("line")
	.data(pi)
	.transition()
	.duration(duration)
	.delay(function(d, i){
		return i * delay;
	})
	.attr("x1", function(d, i){
		if(i > 0){
			return origin_x + (r * points[pi[i - 1]][0]);
		}else{
			return 0;
		}
	}).attr("y1", function(d, i){
		if(i > 0){
			return origin_y + (r * points[pi[i - 1]][1]);
		}else{
			return 0;
		}
	}).attr("x2", function(d, i){
		if(i > 0){
			return origin_x + (r * points[pi[i]][0]);
		}else{
			return 0;
		}
	}).attr("y2", function(d, i){
		if(i > 0){
			return origin_y + (r * points[pi[i]][1]);
		}else{
			return 0;
		}
	});

function generatePoints(){
	var points = [];
	var constant = (2 * Math.PI)/10.0;

	for(var i = 0; i <= 9; i++){
		var theta = (constant * i) - (Math.PI/2);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);

		points.push([cos, sin]);
	}

	return points;
}

function generatePI(){
	var pi = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198".split("");
	var digits = [];
	for(var i = 0; i < pi.length; i++){
		var c = pi.shift();
		pi.push(parseInt(c));
	}

	return pi;
}