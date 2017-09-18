import React, { Component, PropTypes } from 'react';
import { HeaderForm } from 'component';

const propTypes = {
};
const defaultProps = {
};

class MainForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <HeaderForm/>
                MainForm
            </div>
        );
    }
}

MainForm.propTypes = propTypes;
MainForm.defaultProps = defaultProps;

export default MainForm;
