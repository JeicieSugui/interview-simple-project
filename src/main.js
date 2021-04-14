	//margin
	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    	height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	var svg = d3.select("body")
    	.append("svg")

	svg.attr("viewBox", "3300 2 " + width + " " + height)
    	.attr("preserveAspectRatio", "xMinYMin");


	var map = svg.append("g")
    	.attr("class", "map");


    //Read js
    d3.queue()
	  .defer(d3.json, "resource/PAR.json")
	  .defer(d3.json, "resource/PH.json")
	  .defer(d3.json, "resource/PH_Municipal.json")
	  .await(ready)


	//Create Projection
	var projection = d3.geoMercator()
		.scale(1450)
		.translate([ width / 1.75, height / 1])
	

	//Create Path
	var path = d3.geoPath()
		.projection(projection)


	function ready (error, par_json, ph_json, phmun_json){

	var par_feature = (par_json).features
	console.log(par_feature)

	var ph_feature = (ph_json).features
	console.log(ph_feature)

	var phmun_feature = (phmun_json).features
	console.log(phmun_feature)


	svg.selectAll(".par")
		.data(par_feature)
		.enter().append("path")
		.attr("class", "par")
		.attr("d", path)

	svg.selectAll(".phmun")
		.data(phmun_feature)
		.enter().append("path")
		.attr("class", "phmun")
		.attr("d", path)


	svg.selectAll(".ph")
		.data(ph_feature)
		.enter().append("path")
		.attr("class", "ph")
		.attr("d", path)


	}