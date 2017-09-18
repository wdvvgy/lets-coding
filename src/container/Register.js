import React, { Component, PropTypes } from 'react';
import { RegisterForm } from 'component';
import { connect } from 'react-redux';
import { RegisterRequest } from 'action/auth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(formData){
        return this.props.RegisterRequest(formData).then(
            () => {
                console.log(this.props.status);
                return (this.props.status === 'SUCCESS' ? true : false);
            }
        ).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <RegisterForm onRegister={this.handleRegister} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.auth.register.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        RegisterRequest: (formData) => {
            return dispatch(RegisterRequest(formData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
