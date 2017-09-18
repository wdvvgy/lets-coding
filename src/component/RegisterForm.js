import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal } from 'semantic-ui-react'

const propTypes = {
    onRegister : React.PropTypes.func
};
const defaultProps = {
    onRegister : () => { console.error('register function not defined'); }
};

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            pw : '',
            confirm : '',
            open : false,
            active : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRegister(e){
        e.preventDefault();
        this.setState({active: true});
        if( this.state.pw !== this.state.confirm) {
            this.setState({
                open : true,
                active: false
            });
            return;
        }
        let formData = {
            id : this.state.id,
            pw : this.state.pw
        };

        this.props.onRegister(formData).then(
            (success) => {
                console.log('success: ' + success);
                if(success) {
                    this.setState({
                        open : false,
                        active: false
                    });
                    this.props.history.push('/');
                } else {
                    this.setState({
                        open : true,
                        active: false
                    });
                }
            }
        );
    }

    show(){ this.setState({ open: true }); }
    close(){ this.setState({ open: false }); }


    render() {
        const { formData, active, open } = this.state;
        const registerForm = (
            <div>
                <Modal size='small' open={open} onClose={this.close}>
                    <Modal.Header>
                        회원가입 실패!
                    </Modal.Header>
                    <Modal.Content>
                        <p>등록정보가 올바르지 않습니다.</p>
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
                                {' '}Regist to your account
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
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='비밀번호 확인'
                                        type='password'
                                        name='confirm'
                                        onChange={this.handleChange}/>
                                    <Button color='teal' fluid size='large' onClick={this.handleRegister}>회원가입</Button>
                                    <Message>
                                        이미 계정이 있다면 <Link to='/'>여기를</Link>
                                    </Message>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        );

        return(
            <div>
                {registerForm}
            </div>
        );
    }
}

RegisterForm.propTypes = propTypes;
RegisterForm.defaultProps = defaultProps;

export default withRouter(RegisterForm);
