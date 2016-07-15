import React from 'react';
import ReactDOM from 'react-dom';

import loadGif from './load_gif';
import GifRenderer from './gif_renderer';


/**
 * Displays an interative scanlined gif with controls. 
 */
export default class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: null,
            loadingGif: false,
            exporting: false,
        };
    }

    componentDidMount() {
        this.loadGif(this.props.file);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.file && newProps.file.length && newProps.file !== this.props.file) {
            this.loadGif(newProps.file);
        }
    }

    loadGif(file) {
        this.setState({ loadingGif: true });
        loadGif(file)
            .then(data => {
                if (file !== this.props.file)
                    return;

                this.setState({
                    imageData: data,
                    loadingGif: false,
                    error: null,
                });
            })
            .catch(e => {
                if (file !== this.props.file)
                    return;

                console.error(e);
                this.setState({
                    imageData: [],
                    loadingGif: false,
                    error: 'Could not load gif'
                })
            });
    }

    render() {
        return (
            <div className="gif-viewer" id="viewer">
                <div className="player-wrapper">
                     <GifRenderer imageData={this.state.imageData} />
                </div>
            </div>);
    }
}
