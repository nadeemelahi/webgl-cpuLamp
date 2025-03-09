/* 
 * author : Nadeem Elahi
 * paid professional email: nad@3deem.com
 * free social media email: nadeem.elahi@gmail.com
 * tel : 905-481-1294
 * COPYRIGHT Feb 2025 
 */

"use strict";
	
// REQUIRES
// ngl
//
//ngl.load_vf.cnt
//ngl.load_vf.dim:4
//.load_vertices(vertices)
//.load_fragments(fragments)
ngl.load_vf = {
	// REQUIRES ngl {}
	
	// load_program()
	// load_vertices()
	// load_fragments()

	cnt : 0

	, dim : 4 

	, load_vertices : function ( aout , vertices ) {
		// must be named "vertex" 
		// must be 4d ie) x y z w
		this.cnt = vertices.length / this.dim;
		
		ngl.load_data( 
			aout
			, "vertex"
			, vertices
			, this.dim
		);

	}

	, load_fragments : function ( aout , fragments ) {
		// must be names "fragment"
		// must be 4d ie) r g b a

		if ( this.cnt != ( fragments.length / this.dim ) ) {
			console.log("Error: vertices and fragments count do not match.");
		}

		ngl.load_data( 
			aout
			, "fragment"
			, fragments 
			, this.dim
		);
	}
};


