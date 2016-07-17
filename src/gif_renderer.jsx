import React from 'react';
import ReactDOM from 'react-dom';

import CubeGifRenderer from './3d_renderer';

/**
 */
export default class GifRenderer extends React.Component {
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        const container = element.getElementsByClassName('three-container')[0];
        this._3dCanvas = element.getElementsByClassName('three-canvas')[0];
        this._renderer = new CubeGifRenderer(this._3dCanvas, container, this.onSampleDidChange.bind(this));

        if (this.props.imageData) {
            this._renderer.setGif(this.props.imageData, this.props);
        }
        this._renderer.setSampleSize(this.props.sampleWidth, this.props.sampleHeight);

        this._2dCanvas = element.getElementsByClassName('slice-canvas')[0];
        this._ctx = this._2dCanvas.getContext('2d');
    }

    componentWillReceiveProps(newProps) {
        if (this.props.imageData !== newProps.imageData) {
            this._renderer.setGif(newProps.imageData);
        }

        if (this.props.sampleWidth !== newProps.sampleWidth || this.props.sampleHeight !== newProps.sampleHeight) {
            this._renderer.setSampleSize(newProps.sampleWidth, newProps.sampleHeight);
        }
    }

    /**
     * Update 2d canvas when image changes.
     */
    onSampleDidChange(imageData) {
        this._2dCanvas.width = imageData.width;
        this._2dCanvas.height = imageData.height;
        this._ctx.putImageData(imageData, 0, 0);
    }

    resetCamera() {
        this._renderer.resetCamera();
    }

    resetPlane() {
        this._renderer.resetPlane();
    }

    render() {
        return (
            <div className="gif-renderer">
                <div className="three-container">
                    <div className="three-view-controls">
                        <button onClick={this.resetCamera.bind(this)}>Reset Camera</button>
                        <button onClick={this.resetPlane.bind(this)}>Reset Plane</button>

                    </div>
                    <canvas className="three-canvas" />
                </div>
                <div className="slice-container">
                    <h2>Slice</h2>
                    <canvas className="slice-canvas" width="200" height="200" />
                </div>
            </div>
        );
    }
};