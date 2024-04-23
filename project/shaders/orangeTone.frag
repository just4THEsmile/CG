precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(void) {
    vec4 textureColor = texture2D(uSampler, vTextureCoord);
    vec4 orangeTone = vec4(1.0, 0.5, 0.0, 1.0); // RGB for orange
    gl_FragColor = mix(textureColor, orangeTone, 0.5); // Mix the texture color with the orange tone
}