import React, { Component, PropTypes } from 'react';
import { LoginForm } from 'component';
import { connect } from 'react-redux';
import { loginRequest } from 'action/auth';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(formData){
        return this.props.loginRequest(formData).then(
            () => {
                return (this.props.status === 'SUCCESS' ? true : false);
            }
        )
    }

    render() {
        return(
            <LoginForm
                onLogin={this.handleLogin}
                auth={this.props.auth} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.auth.login.status,
        auth: state.auth.login.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (formData) => {
            return dispatch(loginRequest(formData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
