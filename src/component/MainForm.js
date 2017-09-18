import React, { Component, PropTypes } from 'react';
import { HeaderForm } from 'component';
import { Icon, Button, List, Form, Grid, Header, Image, Label, Segment, Modal } from 'semantic-ui-react'

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
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column>
                            <Image centered={true} size='massive' shape='rounded' src='/developer.png'/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <h2>
                                이제 브라우저에서도 손쉽게 코딩을 할 수 있습니다.<br/>
                                지금 만나보세요!
                            </h2>
                            <h3>Support Language</h3>
                            <List>
                                <List.Item>C++</List.Item>
                                <List.Item>Java</List.Item>
                                <List.Item>Javascript</List.Item>
                                <List.Item>Python</List.Item>
                            </List>
                            <Label as='a' color='blue' image>
                                <Icon name='user' />
                                    Jeongki Kim
                                <Label.Detail color='red'>Developed by</Label.Detail>
                            </Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

MainForm.propTypes = propTypes;
MainForm.defaultProps = defaultProps;

export default MainForm;
