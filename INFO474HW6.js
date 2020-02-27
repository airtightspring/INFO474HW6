'use strict';

(function() {

 	// Width and Height of the whole visualization
   var width = 700;
   var height = 580;

   // Create SVG
   var svg = d3.select( "body" )
       .append( "svg" )
       .attr( "width", width )
       .attr( "height", height );

   // Placeholder for Geometry Element
   var g = svg.append( "g" );

   // Set Projection Params
   var albersProjection = d3.geoAlbers()
       .scale( 76000 )
       .rotate( [74.0060,0] )
       .center( [0, 40.7128] )
       .translate( [width/2,height/2] );

   var geoPath = d3.geoPath()
       .projection( albersProjection );

   // Add Data
   g.selectAll( "path" )
       .data( neighborhoods_json.features )
       .enter()
       .append( "path" )
       .attr( "fill", "#ccc" )
       .attr( "stroke", "#333")
       .attr( "d", geoPath );
   
    // Load in Point Data and Fill/Set OnClick
   d3.csv("data.csv", function(data) {
     g.selectAll('.circle')
            .data(data, albersProjection)
            .enter()
            .append('circle')
                .attr('cx', function(d) { 
                    let scaledPoints = albersProjection([d['longitude'], d['latitude']])
                    return scaledPoints[0]
                })
                .attr('cy', function(d) {
                    let scaledPoints = albersProjection([d['longitude'], d['latitude']])
                    return scaledPoints[1]
                })
                .attr('r', 3)
                .attr('fill', 'steelblue')
                .on( "click", function(){
                 d3.select(this)
                   .attr("opacity",1)
                   .transition()
                   .duration(3000)
                   .attr( "cx", 1000)
                   .attr( "cy", 1000)
                   .attr( "opacity", 0 )
                   .on("end",function(){
                     d3.select(this).remove();
                   })});
                   
     
   });
  
})();
