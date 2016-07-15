import THREE from 'three';
import OrbitControls from './OrbitControls';

import gen_array from './gen_array';
import createImageData from './create_image_data';

export default class CubeRenderer {
    constructor(canvas) {
        this._frames = [];
        this._options = {};

        this._scene = new THREE.Scene();

        this.initRenderer(canvas);
        this.initCamera();
        this.initControls(canvas);

        this.resize(500, 500);

        this.animate = () => this.animateImpl();
        this.animateImpl();
    }

    initRenderer(canvas) {
        this._renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        this._renderer.setClearColor(0xffffff, 0);
        this._renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    }

    initCamera(width, height) {
        this._camera = new THREE.PerspectiveCamera(75, 0.5, 0.01, 800);
        this._camera.position.z = 2;
    }

    initControls(container) {
        this._controls = new OrbitControls(this._camera, container);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.25;
        this._controls.enableZoom = true;
    }

    resize(width, height) {
        this._width = width;
        this._height = height;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    /**
     * Remove all objects from the current scene.
     */
    clear() {
        for (let i = this._scene.children.length - 1; i >= 0; --i) {
            const obj = this._scene.children[i];
            if (obj !== this._camera)
                this._scene.remove(obj);
        }
    }

    createPlane(name, a, b, c, d, mat) {
        const indices = new Uint32Array([0, 1, 2, 0, 2, 3]);

        const vertices = new Float32Array([
            a.x, a.y, a.z,
            b.x, b.y, b.z,
            c.x, c.y, c.z,
            d.x, d.y, d.z
        ]);

        const uv = new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1
        ]);

        const geometry = new THREE.BufferGeometry();

        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.addAttribute('uv', new THREE.BufferAttribute(uv, 2));

        geometry.setIndex(new THREE.BufferAttribute(indices, 1));

        const mesh = new THREE.Mesh(geometry, mat);
        mesh.name = name;
        return mesh;
    }

    setGif(imageData, options) {
        this.clear();

        const w = 0.5
        const h = 0.5;
        const d = 0.5;
        const faces = this._getFaceImages(imageData);

        this._scene.add(
            this.createPlane('front',
                new THREE.Vector3(-w, -h, d), new THREE.Vector3(w, -h, d), new THREE.Vector3(w, h, d), new THREE.Vector3(-w, h, d),
                faces.front));

        this._scene.add(
            this.createPlane('right',
                new THREE.Vector3(w, -h, d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, d),
                faces.right));

        this._scene.add(
            this.createPlane('back',
                new THREE.Vector3(-w, -h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(-w, h, -d),
                faces.back));

        this._scene.add(
            this.createPlane('left',
                new THREE.Vector3(-w, -h, d), new THREE.Vector3(-w, -h, -d), new THREE.Vector3(-w, h, -d), new THREE.Vector3(-w, h, d),
                faces.left));
        
        this._scene.add(
            this.createPlane('top',
                new THREE.Vector3(-w, h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, d), new THREE.Vector3(-w, h, d),
                faces.top));

        this._scene.add(
            this.createPlane('bottom',
                new THREE.Vector3(-w, -h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, -h, d), new THREE.Vector3(-w, -h, d),
                faces.bottom));
    }

    texFromFrame(frame) {
        const text = new THREE.Texture(frame);
        text.needsUpdate = true;
        return text;
    }

    sample(frame, x, y) {
        return frame.data[y * frame.height + x];
    }

    copyRgba(dest, destIndex, src, srcIndex) {
        destIndex *= 4;
        srcIndex *= 4;

        dest[destIndex++] = src[srcIndex++];
        dest[destIndex++] = src[srcIndex++];
        dest[destIndex++] = src[srcIndex++];
        dest[destIndex++] = src[srcIndex++];
    }

    sampleData(imageData, f) {
        const data = createImageData(imageData.width, imageData.height);
        for (let x = 0; x < imageData.width; ++x) {
            const frameIndex = Math.floor(x / imageData.width * imageData.frames.length);
            const frame = imageData.frames[frameIndex];
            for (let y = 0; y < imageData.height; ++y) {
                f(data, frame, x, y);
            }
        }
        return data;
    }

    sampleDataTop(imageData, f) {
        const data = createImageData(imageData.width, imageData.height);

        for (let y = 0; y < imageData.height; ++y) {
            const frameIndex = Math.floor(y / imageData.height * imageData.frames.length);
            const frame = imageData.frames[frameIndex];
            for (let x = 0; x < imageData.width; ++x) {
                f(data, frame, x, y);
            }
        }
        return data;
    }


    _frontImage(imageData) {
        return imageData.frames[0].data;
    }

    _rightImage(imageData) {
        return this.sampleData(imageData, (data, frame, x, y) =>
            this.copyRgba(
                data.data,
                y * imageData.width + x,
                frame.data.data,
                y * imageData.width + (imageData.width - 1)));
    }

    _backImage(imageData) {
        return imageData.frames[imageData.frames.length - 1].data;
    }

    _leftImage(imageData) {
        return this.sampleData(imageData, (data, frame, x, y) =>
            this.copyRgba(
                data.data,
                y * imageData.width + x,
                frame.data.data,
                y * imageData.width + 0));
    }

    _topImage(imageData) {
        return this.sampleDataTop(imageData, (data, frame, x, y) =>
            this.copyRgba(
                data.data,
                y * imageData.width + x,
                frame.data.data,
                x));
    }

    _bottomImage(imageData) {
        return this.sampleDataTop(imageData, (data, frame, x, y) =>
            this.copyRgba(
                data.data,
                y * imageData.width + x,
                frame.data.data,
                x + (imageData.height - 1) * imageData.width));
    }

    _getFaceImages(imageData) {
        const images = {
            front: this._frontImage(imageData),
            right: this._rightImage(imageData),
            back: this._backImage(imageData),
            left: this._leftImage(imageData),
            top: this._topImage(imageData),
            bottom: this._bottomImage(imageData),
        };

        return Object.keys(images).reduce((out, name) => {
            const mat = new THREE.MeshBasicMaterial({ map: this.texFromFrame(images[name]) });
            mat.side = THREE.DoubleSide;
            out[name] = mat;
            return out;
        }, {});
    }


    animateImpl() {
        requestAnimationFrame(this.animate);

        this._controls.update();
        this.render();
    }

    /**
     * Main render function.
     */
    render() {
        this._renderer.render(this._scene, this._camera);
    }
}