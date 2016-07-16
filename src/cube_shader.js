import THREE from 'three';

export default {
    uniforms: {
        clippingPlane: { type: 'v4', value: new THREE.Vector4(0, 0, 0, 0) },
        tDiffuse: { type: 't' }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 eyePos;

        void main() {
            vUv = uv;

            vec4 pos = modelViewMatrix * vec4(position, 1.0); 
            gl_Position = projectionMatrix * pos;
            eyePos = position; 
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec4 clippingPlane;

        varying vec2 vUv;
        varying vec3 eyePos;

        void main() {
            if (dot(eyePos, clippingPlane.xyz) > clippingPlane.w)
                discard;
            vec4 color = texture2D(tDiffuse, vUv);
            //color.a = mix(1.0, 0.2, float(dot(eyePos, clippingPlane.xyz) > clippingPlane.w));
            gl_FragColor = color;
        }
    `,
    side: THREE.DoubleSide,
    transparent: true,
};