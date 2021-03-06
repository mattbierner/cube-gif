import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Number slider with a title and description of values.
 */
export default class LabeledRange extends React.Component {
    onChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const title = this.props.title ? (<div className='control-title'>{this.props.title}</div>) : '';
        return (
            <div className={'control-group labeled-slider ' + (this.props.className || '') }>
                {title}
                <input className="slider"
                    type="range"
                    min={this.props.min}
                    max={this.props.max}
                    value={this.props.value}
                    onChange={this.onChange.bind(this)} />
                <span className="min label">{this.props.min}</span>
                <span className="max label">{this.props.max}</span>
                <span className="value label">{this.props.value + (this.props.units || '') }</span>
            </div>
        );
    }
}
