import React from 'react';
import ReactDOM from 'react-dom';

import CubeGifRenderer from './3d_renderer';

/**
 */
export default class GifRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingControls: true,
            showingGuides: true
        };
    }

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

    /**
     * Show or hide the controls.
     */
    toggleControls() {
        const shouldShow = !this.state.showingControls;
        this.setState({ showingControls: shouldShow });
        this._renderer.showControls(shouldShow);
    }

    /**
     * Toggle UI.
     */
    toggleGuides() {
        const shouldShow = !this.state.showingGuides;
        this.setState({ showingGuides: shouldShow });
        this._renderer.showGuides(shouldShow);
    }

    render() {
        return (
            <div className="gif-renderer">
                <div className="three-container">
                    <div className="three-controls three-view-controls">
                        <button onClick={() => this._renderer.goToFrontView() }>Front</button>
                        <button onClick={() => this._renderer.goToSideView() }>Side</button>
                        <button onClick={() => this._renderer.goToTopView() }>Top</button>

                        <button onClick={() => this._renderer.resetCamera() }>Reset Camera</button>
                    </div>
                    <div className="three-controls three-ui-controls">
                        <button onClick={this.toggleControls.bind(this) }>{this.state.showingControls ? 'Hide Controls' : 'Show Controls'}</button>
                        <button onClick={this.toggleGuides.bind(this) }>{this.state.showingGuides ? 'Hide Guides' : 'Show Guides'}</button>
                    </div>
                    <div className="three-obj-control-wrapper">
                        <div className="three-controls three-obj-controls">
                            <button onClick={() => this._renderer.setTransformMode('translate') }>Translate (w) </button>
                            <button onClick={() => this._renderer.setTransformMode('rotate') }>Rotate (e) </button>
                            <button onClick={() => this._renderer.setTransformMode('scale') }>Scale (r) </button>
                            <button onClick={() => this._renderer.resetPlane() }>Reset Plane</button>
                        </div>
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