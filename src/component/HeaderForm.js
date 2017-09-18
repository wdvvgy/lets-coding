import React, { Component, PropTypes } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom';

const propTypes = {
    handleLogout: PropTypes.func
};
const defaultProps = {
    handleLogout: () => { console.warn('handleLogout is not defined'); }
};
class HeaderForm extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleMovePage = this.handleMovePage.bind(this);
    }

    handleLogout(){
        localStorage.removeItem('auth');
        this.props.history.push('/');
    }

    handleMovePage(active){
        this.props.history.push(`/${active}`);
    }

    render() {
        const active = this.props.location.pathname.split('/')[1];
        return(
            <div>
                <Segment attached inverted floated='right' textAlign='center'>
                    <Header floated='left' size='medium'>Welcome to Let's Code!</Header>
                    <Button style={{marginRight: '100px'}} onClick={this.handleLogout} circular inverted floated='right' color='green'>Logout</Button>
                    <Button style={{marginRight: '10px'}} active={active === 'coding'} onClick={() => { this.handleMovePage('coding') }} circular inverted floated='right' color='blue'>Let's coding</Button>
                    <Button style={{marginRight: '10px'}} active={active === 'main'} onClick={() => { this.handleMovePage('main') }} circular inverted floated='right' color='red'>Home</Button>
                </Segment>
            </div>
        );
    }
}
HeaderForm.propTypes = propTypes;
HeaderForm.defaultProps = defaultProps;
export default withRouter(HeaderForm);
