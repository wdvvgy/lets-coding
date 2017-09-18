import React, { Component, PropTypes } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom';

const propTypes = {
    onLogin : React.PropTypes.func,
    auth : React.PropTypes.object
};

const defaultProps = {
    onLogin : (contents) => { console.error('onLogin function not defined'); },
    auth : {}
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pw: '',
            open: false,
            active: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        localStorage.removeItem('auth');
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin(e){
        e.preventDefault();
        this.setState({ active: true});
        let formData = {
            id: this.state.id,
            pw: this.state.pw
        };
        this.props.onLogin(formData).then(
            (success) => {
                if(success){
                    this.setState({ open: false, active: false });
                    localStorage.setItem('auth', JSON.stringify(this.props.auth));
                    this.props.history.push('/main');
                } else {
                    this.setState({
                        open: true,
                        active: false
                    });
                }
            }
        );
    }

    show(){ this.setState({ open: true }); }
    close(){ this.setState({ open: false }); }

    render() {
        const { formData, token, active, open } = this.state;

        const loginForm = (
            <div>
                <Modal size='small' open={open} onClose={this.close}>
                    <Modal.Header>
                        로그인 실패!
                    </Modal.Header>
                    <Modal.Content>
                        <p><b>ID</b>나 <b>PASSWORD</b>가 올바르지 않습니다.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative icon='checkmark' labelPosition='right' content='확인' onClick={this.close}/>
                    </Modal.Actions>
                </Modal>

                <div className='center-div-login'>
                    <Grid
                        textAlign='center'
                        style={{ height: '100%' }}
                        verticalAlign='middle' >
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/logo.png' />
                                {' '}Log-in to your account
                            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='아이디'
                                        name='id'
                                        onChange={this.handleChange}/>
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='비밀번호'
                                        type='password'
                                        name='pw'
                                        onChange={this.handleChange}/>
                                    <Button color='teal' fluid size='large' onClick={this.handleLogin}>로그인</Button>
                                </Segment>
                            </Form>
                            <Message>
                                처음이시면 <Link to='/register'>여기를</Link>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );

        return(
            <div>
                {loginForm}
            </div>
        );
    }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default withRouter(LoginForm);
