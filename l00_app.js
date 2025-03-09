
"use strict;"
new function(){

	ngl.init( "fsCanvas" ) ;

	var shader = ngl.shader_perspective;
	shader.compile();
	shader.use_program();


	//cpuLamp.test();
	
	var sc = 0.5 // scale
		, verts , frags
		, vertices , fragments
	;

	
	/*
	verts = [

		 -1.0 , -1.0 , 0.0 , 1.0 // left btm
		, 1.0 , -1.0 , 0.0 , 1.0 //  right btm
		, 1.0 ,  1.0 , 0.0 , 1.0 // right top
	];
	*/
	// parallel to xy plane
	// faces near -1, normal 
	// normal { 0 , 0 , -1 } 
	// but got { 0 , 0 , 1 } 
	
	/*
	verts = [

		  0.0 , -1.0 , -1.0 , 1.0 // btm near
		, 0.0 , -1.0 ,  1.0 , 1.0 //  btm far
		, 0.0 ,  1.0 ,  1.0 , 1.0 // top far
	];
	*/
	// parallel to yz plane
	// faces +x direction
	// normal { 1 , 0 , 0 }
	// but got { -1 , 0 , 0 }
		
	/*
	verts = [

		 -1.0 , 0.0 , -1.0 , 1.0 // left near
		, 1.0 , 0.0 , -1.0 , 1.0 //  right near
		, 1.0 , 0.0 ,  1.0 , 1.0 // right far
	];
	*/
	// parallel to xz plane
	// faces +y direction
	// normal { 0 , 1 , 0 }
	// but got { 0 , -1 , 0 }
	
	/*
	frags = [
		  1.0 , 0.0 , 0.0 , 1.0
		, 0.0 , 1.0 , 0.0 , 1.0
		, 0.0 , 0.0 , 1.0 , 1.0
	];
	*/
	
	/*
	 */
	verts = equilateralPyramid.get_vertices();
	dataUtil.scale_xyz ( verts , sc , sc , sc ) ;
	
	frags = equilateralPyramid.get_fragments();
		  
	vertices = dataUtil.allocateFloats( verts );
	var vertices_cache = dataUtil.allocateFloats( verts );

	fragments = dataUtil.allocateFloats( frags );
	var fragments_cache = dataUtil.allocateFloats( frags );
	// make cache because below 
	// cpuLamp.apply( vertices , fragments ) 
	// mutates the fragments data 





	var rot = 0 
		, step = 5 
		, lim = 355 
		, mat_rot_y
	;

	function draw () {

		mat_rot_y = mat4x4.genRotateAboutY ( rot ) ;
		// mutates vertices
		mat4x4.multiply_1x4_by_4x4 ( vertices , mat_rot_y ) ;

		// only mutates fragments
		cpuLamp.apply ( vertices , fragments ) ;

		shader.load.vertices ( vertices ) ;
		shader.load.fragments ( fragments ) ;

		shader.draw.triangles();

		// reset mutated data
		dataUtil.arrayCpy_src_dst ( fragments_cache , fragments ) ;
		dataUtil.arrayCpy_src_dst ( vertices_cache , vertices ) ;

		rot += step;
		if ( rot > lim ) rot = 0;

		setTimeout ( draw , 500 )

	}

	draw();
}
