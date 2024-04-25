#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 color_of_text;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 newcolor = vec4(0,0,0,1);
	
	float colorGray = color.r * 0.299 + color.g *0.587 + color.b * 0.114;


	 newcolor.r= min(color_of_text.r,colorGray) ;
	 newcolor.g= min(color_of_text.g,colorGray) ;
	 newcolor.b= min(color_of_text.b,colorGray) ;
	

	gl_FragColor = newcolor;
	

}