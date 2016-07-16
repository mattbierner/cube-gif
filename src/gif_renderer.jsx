import React from 'react';
import ReactDOM from 'react-dom';

import CubeGifRenderer from './3d_renderer';

/**
 * Renders a median blended gif.
 */
export default class GifRenderer extends React.Component {
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        this._3dCanvas = element.getElementsByClassName('3d-canvas')[0];
        this._renderer = new CubeGifRenderer(this._3dCanvas, this.onSampleDidChange.bind(this));
        
        if (this.props.imageData) {
            this._renderer.setGif(this.props.imageData, this.props);
        }

        if (this.props.onRendererLoaded)
            this.props.onRendererLoaded(this._renderer);

        this._renderer.render();

        this._2dCanvas = element.getElementsByClassName('2d-canvas')[0];
        this._ctx = this._2dCanvas.getContext('2d');
    }

    componentWillReceiveProps(newProps) {
        if (this.props.imageData !== newProps.imageData) {
            this._renderer.setGif(newProps.imageData);
        }
    }

    onSampleDidChange(imageData) {
       // this.props.imageData
       this._2dCanvas.width = imageData.width;

       this._2dCanvas.height = imageData.height
       this._ctx.putImageData(imageData, 0, 0);
    }
    

    render() {
        return (
            <div>
                <canvas className="3d-canvas" />
                <canvas className="2d-canvas" width="200" height="200" />
            </div>
        );
    }
};