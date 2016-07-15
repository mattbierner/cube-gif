import React from 'react';
import ReactDOM from 'react-dom';

import Search from './search';
import Viewer from './viewer';

/**
 * Main application.
 */
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGif: "https://media.giphy.com/media/xThuWcaa4U4XZQDgvm/giphy-tumblr.gif"
        };
    }

    onGifSelected(src) {
        this.setState({ selectedGif: src });
        window.location = '#viewer';
    }

    render() {
        return (
            <div className="main container">
                <Viewer file={this.state.selectedGif} />
                <Search onGifSelected={this.onGifSelected.bind(this) } />
            </div>
        );
    }
};


ReactDOM.render(
    <Main />,
    document.getElementById('content'));