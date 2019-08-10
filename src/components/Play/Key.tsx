import React from 'react';
import Render from './KeyRender';

export default class Key extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHighlighted: false,
        };

        // Bind callback methods to make `this` the correct context.
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    public onMouseDown() {
        this.setState({
            isHighlighted: true,
        });
    }

    public onMouseUp() {
        this.setState({
            isHighlighted: false,
        });
    }

    public render() {
        return Render.call(this, this.props, this.state);
    }
}
