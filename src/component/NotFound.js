import React, { Component, PropTypes } from 'react';
const propTypes = {
};
const defaultProps = {
};
class NotFound extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>{this.props.location.pathname} for NotFound</div>
        );
    }
}
NotFound.propTypes = propTypes;
NotFound.defaultProps = defaultProps;
export default NotFound;
