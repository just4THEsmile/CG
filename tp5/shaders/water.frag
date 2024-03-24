#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler3;
uniform sampler2D uSampler4;

uniform float timeFactor;


void main() {
	vec4 color = texture2D(uSampler3, vTextureCoord+vec2(timeFactor*0.01,0.0));
	vec4 filter = texture2D(uSampler4, vTextureCoord+vec2(timeFactor*0.01,timeFactor*0.01));

    color -= vec4(0.2,0.2,0.2,0.0)*filter.b;
	gl_FragColor = color;
}