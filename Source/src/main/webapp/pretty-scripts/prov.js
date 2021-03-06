baseURI = $('#meta_uri').html();
$('#filter').empty();
var htmlButtons = "<h2 id='provHeader'>Prov</h2><a id='provExpand' class='pL provButton' href='#'>View full graph</a><a id='provSimple' class='pL provButton' href='#'>View compact graph</a><div id='graphL'><p>Legend</p></div>";
$('#filter').append(htmlButtons);

/*Generates all nodes and edges*/
function buildGraph(data){
	var elements = [];
	var links = [];			
	var e = [];
	$.each(data.nodes, function(idN, dN) {
			elements.push(makeElement(idN, dN[0], dN[1], dN[2]));
			e.push(idN);	
	});	
	$.each(data.edges, function(idL, dL) {
		if(e.indexOf(dL[0]) > -1){
			links.push(makeLink(dL[0], dL[1], dL[2], dL[3]));
		}
	});		
	return elements.concat(links);			
}

/*Generates an edge between two nodes*/
function makeLink(sourceID, targetID, type, altText) {	
	if(altText === ""){
		altText = "No description found";
	}
	
	var smooth = true;
	label = "";
	if(type === 0){
		label = "Generated By";
	}else if(type == 1){
		label = "Used";
	}else if (type == 2){
		label = "Associated With";
		smooth = false;
	}else if (type == 3){
		label = "Attributed To";
		smooth = false;
	}else if (type == 4){
		label = "Derived From...";
	}else if(type == 5){
		label = "Acted on Behalf Of";
		smooth = false;
	}
		
    var lnk = new joint.dia.Link({
		
        source: { id:  targetID},
        target: { id: sourceID},
        
        attrs: { 
        	'.connection': { 
        		stroke: '#777', 
        		class:"provLink provL"+type, 
        	},
        	'.marker-target': {fill: '#333', 'stroke-width': '0', d: 'M 12 0 L 0 6 L 12 12 z' , class:"provL"+type} 
        },
        labels: [
	             { position: 0.5,            	 
	            	 attrs: { 
	            		text: {
	            			text: label,
	            			class:'provLD'+type,		            			
	            			'stroke-width': 5,
	            			'data-toggle':'tooltip', 
	            			'data-original-title':altText
	            		}, 
	             		rect: { 
	             			stroke: '#eee', 
	             			fill:'#eee',
	             			'stroke-width': 10, 
	             			rx: 1, 
	             			ry: 1
	             		}	
	            	 }  
	             }
	         ],
        smooth: smooth,
        manhattan: false
    }); 
    return lnk;
}
/*Generates nodes*/
function makeElement(id,label,type, url) {
   
    var maxLineLength = _.max(label.split('\n'), function(l) { return l.length; }).length;
    //Adjusts for short labels and adds f
    if(maxLineLength <= 8){
    	maxLineLength = maxLineLength * 1.2;
    }
    // Compute width/height of the rectangle based on the number 
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
    var letterSize = 14;
    var width = 0.9 * (letterSize * (0.6 * maxLineLength + 1));
    var height = 1.1 * ((label.split('\n').length + 1) * letterSize);
	var shape = null;

	if(type == 2){
		shape = new joint.shapes.basic.Rect({
	        id: id,
	        size: { width: width, height: height },
	        attrs: {
	            text: { class:"provO1", 'text': label, 'font-size': letterSize, fill:'#FFF'},
	            rect: {
	            	class:"provO1",
	                width: width, 
	                height: height,
	                rx: 3, 
	                ry: 3,
	                stroke: '#d03d00',
	                fill: '#d03d00',
	                'stroke-width':2
	            }
	        }
	    });	
						
	}else if(type == 1){
		shape = new joint.shapes.basic.Rect({
	        id: id,
	        size: { width: width, height: height },
	        attrs: {
	            text: { class:"provO2", 'text': label, 'font-size': letterSize, fill:'#FFF'},
	            rect: {
	            	class:"provO2",
	                width: width, 
	                height: height,
	                rx: 15, 
	                ry: 15,
	                stroke: '#00d093',
	                fill: '#00d093',
	                'stroke-width':2
	            }
	        }
	    });	
	}else{
		shape = new joint.shapes.basic.Rect({
	        id: id,
	        size: { width: width, height: height },
	        attrs: {
	            text: { class:"provO3", 'text': label, 'font-size': letterSize, fill:'#FFF' },
	            rect: {
	            	class:"provO3",
	                width: width, 
	                height: height,
	                rx: 6, 
	                ry: 6,
	                stroke: '#0093d0',
	                fill: '#0093d0',
	                'stroke-width':2
	            }
	        }
	    });	
	}
	if(url !== ''){
		shape.attr({text: {class: 'dynamicDesc', 'onclick':'window.location = "'+url+'";'}});
	}	
	return shape;
}

/*Creates a legend*/
function legend(){
	var graphL = new joint.dia.Graph();
	new joint.dia.Paper({
	    el: $('#graphL'),
	    width: 50,
	    height: 300,
	    gridSize: 1,
	    model: graphL,
	    perpendicularLinks:false
	});	
	
	var data = (function() {
	    var json = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': baseURI + "/json/provLegend.json",
	        'dataType': "json",
	        'success': function (d) {
	            json = d;
	        }
	    });
	    return json;
	})();
	
	var cells = buildGraph(data);
	graphL.resetCells(cells);		
	joint.layout.DirectedGraph.layout(graphL, { setLinkVertices: true, rankDir: 'LR', rankSep: 25, edgeSep: 25, nodeSep: 25 });
	//var adjW = dg.width;
	//var adjH = dg.height;	
	$("#graphL svg").attr("width","100%");
	$("#graphL svg").attr("height","100%");

}

/*Generates a new graph. ARG s=1 generates a simple graph, s != 1 complex graph*/
function build(s){	
	//Gets data from endpoint
	provData = (function() {
	    var json = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': baseURI + "/prov/data?short="+s,//+"&roots=ipumsusa2012",
	        'dataType': "json",
	        'success': function (data) {
	            json = data;
	        }
	    });
	    return json;
	})();
	
	var rs = 115;
	var ns = 100;
	if(s == "1"){
		rs = 150;
		ns = 75;
	}
	
	var cells = buildGraph(provData);
	graph.resetCells(cells);		
	var dg = joint.layout.DirectedGraph.layout(graph, { setLinkVertices: true, rankDir: 'TB', rankSep: rs, edgeSep: 125, nodeSep: ns });
	
	//Resizes SVG element to fit contents
	var adjW = dg.width+100;
	var adjH = dg.height+50;	
	$("#graph svg").attr("width",adjW);
	$("#graph svg").attr("height",adjH);


	//Disables moving nodes and edges
	$("g").mousedown(function() {
	    return false;
	});	
	
	//Adds tooltips for specific edges
	$(document).ready(function(){	
	    $(".provLD4").tooltip({
	    	'container': 'body',
	        'placement': 'top'
	    });
	});
}

var w = $('#main').width() * 0.9;
if(w < 900){
	w = 900;
}
var graph = new joint.dia.Graph();
new joint.dia.Paper({
    el: $('#graph'),
    width: w,
    height: 1500,
    gridSize: 1,
    model: graph,
    perpendicularLinks:false
});	

legend();
build("1");

$("#provExpand").click(function(){
	build("0");
	$("#provExpand").css("display","none");
	$("#provSimple").css("display","block");
});
$("#provSimple").click(function(){
	build("1");
	$("#provExpand").css("display","block");
	$("#provSimple").css("display","none");
});		