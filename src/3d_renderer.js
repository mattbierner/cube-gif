import THREE from 'three';
import OrbitControls from './OrbitControls';

import gen_array from './gen_array';
import createImageData from './create_image_data';

const createPlane = (name, a, b, c, d, mat) => {
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
};

export default class CubeRenderer {
    constructor(canvas) {
        this._frames = [];
        this._options = {};

        this._scene = new THREE.Scene();

        this.initRenderer(canvas);
        this.initCamera();
        this.initControls(canvas);
        this.resize(500, 500);

        this.initGeometry();

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
        this._camera.position.z = 5;
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

    initGeometry() {
        const geometry = new THREE.PlaneGeometry(2, 2, 1);
        const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.Texture(), transparent: true, opacity: 1, alphaTest: 0.5 });
        this._plane = new THREE.Mesh(geometry, material);
        this._plane.name = 'plane';
        this._scene.add(this._plane);
          this._plane.rotateX(Math.PI / 2);
      
    }

    /**
     * Remove all objects from the current scene.
     */
    clear() {
        const targets = ['left', 'right', 'top', 'bottom', 'front', 'back'];
        for (const name of targets) {
            const obj = this._scene.getObjectByName(name);
            this._scene.remove(obj);
        }
    }

    slice(imageData) {
        const plane = this._scene.getObjectByName('plane');

        const vertices = plane.geometry.vertices;

        const p1 = vertices[0].clone().applyMatrix4(plane.matrix);
        const p2 = vertices[1].clone().applyMatrix4(plane.matrix);
        const p3 = vertices[2].clone().applyMatrix4(plane.matrix);

        const l = 100;

        const dx = p2.clone().sub(p1).divideScalar(l);
        const dy = p3.clone().sub(p1).divideScalar(l);

        const sampledData = createImageData(l, l);

        let start = p1.clone().add(dy.clone().divideScalar(2));
        for (let y = 0; y < l; ++y) {
            const startRow = start.clone().add(dx.clone().divideScalar(2));
            for (let x = 0; x < l; ++x) {
                const p = startRow;
                this.copyRgba(sampledData.data, x + y * l, this.getSample(imageData, p.x, p.y, p.z), 0);
                startRow.add(dx);
            }
            start.add(dy);
        }

        const texture = this.texFromFrame(sampledData);
        texture.flipY = false;
        plane.material.map = texture;
        plane.material.map.needsUpdate = true;

    }

    getSample(imageData, x, y, z) {
        const componentSize = 4;
        const size = 0.5;
        if (Math.abs(x) > size || Math.abs(y) > size || Math.abs(z) > size)
            return [0, 0, 0, 0];
        x += size;
        y += size;
        z += size;
        const frameIndex = Math.floor(z / (size * 2) * imageData.frames.length);
        const frame = imageData.frames[frameIndex];

        const u = Math.floor(x / (size * 2) * imageData.width);
        const v = Math.floor(y / (size * 2) * imageData.height);

        const index = (v * imageData.width + u) * componentSize;
        return [frame.data.data[index], frame.data.data[index + 1], frame.data.data[index + 2], 255];
    }

    setGif(imageData, options) {
        this.clear();
        this._data = imageData;

        const scale = Math.max(imageData.width, imageData.height);

        const w = imageData.width / scale / 2;
        const h = imageData.height / scale / 2;
        const d = 0.5;
        const faces = this._getFaceImages(imageData);

        this._scene.add(
            createPlane('front',
                new THREE.Vector3(-w, -h, d), new THREE.Vector3(w, -h, d), new THREE.Vector3(w, h, d), new THREE.Vector3(-w, h, d),
                faces.front));

        this._scene.add(
            createPlane('right',
                new THREE.Vector3(w, -h, d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, d),
                faces.right));

        this._scene.add(
            createPlane('back',
                new THREE.Vector3(-w, -h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(-w, h, -d),
                faces.back));

        this._scene.add(
            createPlane('left',
                new THREE.Vector3(-w, -h, d), new THREE.Vector3(-w, -h, -d), new THREE.Vector3(-w, h, -d), new THREE.Vector3(-w, h, d),
                faces.left));

        this._scene.add(
            createPlane('top',
                new THREE.Vector3(-w, h, -d), new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, d), new THREE.Vector3(-w, h, d),
                faces.top));

        this._scene.add(
            createPlane('bottom',
                new THREE.Vector3(-w, -h, -d), new THREE.Vector3(w, -h, -d), new THREE.Vector3(w, -h, d), new THREE.Vector3(-w, -h, d),
                faces.bottom));

        this.slice(imageData)
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
            const mat = new THREE.MeshBasicMaterial({ map: this.texFromFrame(images[name]), transparent: true, opacity: 0.1 });
            mat.side = THREE.DoubleSide;
            out[name] = mat;
            return out;
        }, {});
    }


    animateImpl() {
        requestAnimationFrame(this.animate);

        this._controls.update();
        this.render();

        this._plane.rotateX(0.005);
        this._i = this._i || 0;
        if (this._i++ % 5 == 0 && this._data) {
            this.slice(this._data);
        }
    }

    /**
     * Main render function.
     */
    render() {
        this._renderer.render(this._scene, this._camera);
    }
}