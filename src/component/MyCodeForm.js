import React, { Component, PropTypes } from 'react';
import { Divider, Label, Card, Grid, Button, Header, Dimmer, Loader, Segment, Item, Modal, Icon } from 'semantic-ui-react'
import update from 'immutability-helper';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const propTypes = {
    mycode: PropTypes.array,
    onGetCode: PropTypes.func,
    onRemove: PropTypes.func
};
const defaultProps = {
    mycode: [ ],
    onGetCode: () => { console.log('getCode is not defined'); },
    onRemove: () => { console.log('onRemove is not defined'); }
};
class MyCodeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mycode: this.props.mycode,
            show: { },
            show_mode: false,
            show_src: '',
            show_rs: '',
            show_btn: '결과보기',
            show_id: '',
            show_idx: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({mycode: nextProps.mycode});
    }

    handleClick(index){
        this.setState({
            show: this.state.mycode[index],
            show_mode: true,
            show_src: this.state.mycode[index].src,
            show_rs: this.state.mycode[index].result,
            show_btn: '결과보기',
            show_id: this.state.mycode[index]._id,
            show_idx: index
        });
    }

    handleRemove(){

        const id = this.state.show_id;
        const idx = this.state.show_idx;
        console.log('mycodeform handleRemove', id, idx);
        this.props.onRemove(id, idx);
        this.setState({show_mode: false});
    }


    render() {
        const styles = {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '200px',
            overflow: 'hidden'
        };

        const ace = (
            <AceEditor
                mode={this.state.show.lang}
                readOnly={true}
                theme="tomorrow"
                name="UNIQUE_ID_OF_DIV"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                height='500px'
                width='100%'
                value={this.state.show_src}
            />
        );

        const rs = (
            <div style={{overflowY:'scroll', whiteSpace:'nowrap', height:'500px', maxHeight:'500px'}} dangerouslySetInnerHTML={{__html: this.state.show_rs}}></div>
        );

        const compo = (
            <Segment>
                <Modal open={this.state.show_mode} onClose={() => {this.setState({show_mode: false})}}>
                    <Modal.Header>
                        {this.state.show.title} - {this.state.show.lang === 'c_cpp' ? 'C++' : this.state.show.lang === 'java' ? 'Java' : this.state.show.lang === 'javascript' ? 'JavaScript' : 'Python'}
                    </Modal.Header>
                    <Modal.Content image scrolling>
                        <Modal.Description>
                            <p>{this.state.show.desc}</p>
                            <Grid celled>
                                <Grid.Row>
                                    <Grid.Column>
                                        { this.state.show_btn === '결과보기' ? ace : rs }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleRemove}>
                            삭제
                        </Button>
                        <Button primary onClick={() => {this.setState({show_mode: false})}}>
                            닫기
                        </Button>
                        <Button color='green' onClick={() => {this.setState({show_btn: this.state.show_btn === '소스보기' ? '결과보기' : '소스보기'})}}>
                            {this.state.show_btn}
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Label as='a' color='pink' ribbon>My Code</Label>
                <Grid>
                    { this.state.mycode.map((code, index) => (
                        <Grid.Column key={index} width={3}>
                            <Segment color='teal'>
                                <Item.Group divided>
                                    <Item>
                                        <Item.Content style={{cursor: 'pointer'}} onClick={() => this.handleClick(index)}>
                                            <Item.Header as='a' style={styles}>{code.title}</Item.Header>
                                            <Item.Meta>
                                                <span className='stay'>
                                                    {code.lang === 'c_cpp' ? 'C++' : code.lang === 'java' ? 'Java' : code.lang === 'javascript' ? 'JavaScript' : 'Python'}
                                                </span>
                                            </Item.Meta>
                                            <Item.Description style={styles}>{code.desc}</Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                    ))}
                </Grid>
            </Segment>
        );

        return(
            <div>
                { this.state.mycode.length > 0 ? compo : undefined }
            </div>
        );
    }
}

MyCodeForm.propTypes = propTypes;
MyCodeForm.defaultProps = defaultProps;
export default MyCodeForm;
