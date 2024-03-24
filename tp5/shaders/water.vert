attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler4;

uniform float normScale;
uniform float timeFactor;


void main() {

	vTextureCoord = aTextureCoord;

	vec4 filter = texture2D(uSampler4, vec2(timeFactor*0.02, timeFactor*0.02)+vTextureCoord);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	gl_Position.y += filter.b*6.5;
}

