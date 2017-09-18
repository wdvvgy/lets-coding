import React, { Component, PropTypes } from 'react';
import { HeaderForm, MainForm } from 'component';

const propTypes = {
};
const defaultProps = {
};
class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <MainForm/>
            </div>
        );
    }
}
Main.propTypes = propTypes;
Main.defaultProps = defaultProps;
export default Main;
