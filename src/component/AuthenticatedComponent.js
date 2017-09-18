import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkRequest } from 'action/auth';

export function requireAuthentication(Component){
    class AuthenticatedComponent extends Component {
        componentWillMount () {
            this.setState ({
                status: 'INIT'
            });
            this.checkAuth();
        }

        checkAuth(){
            let auth = JSON.parse(localStorage.getItem('auth'));

            if(!auth){
                this.props.history.push('/');
                return;
            }
            let token = auth.token;
            return this.props.checkRequest(token).then(
                () => {

                    this.setState({
                        status: this.props.status
                    });
                    if(this.props.status !== 'SUCCESS') this.props.history.push('/');
                }
            );
        }

        render(){
            return (
                <div>
                    { this.state.status === 'SUCCESS' ? <Component {...this.props} /> : <div/> }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            status: state.auth.check.status
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            checkRequest: (token) => {
                return dispatch(checkRequest(token));
            }
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthenticatedComponent));
}
