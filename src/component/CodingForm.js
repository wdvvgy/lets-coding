import React, { Component, PropTypes } from 'react';
import { HeaderForm, MyCodeForm } from 'component';
import { Divider, Label, Card, Grid, Button, Header, Dimmer, Loader, Segment, Modal, Input, Form } from 'semantic-ui-react'
import update from 'immutability-helper';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const propTypes = {
    onRun: PropTypes.func,
    runResult: PropTypes.object,
    saveResult: PropTypes.object,
    onGetCode: PropTypes.func
};
const defaultProps = {
    onRun: () => { console.error('onRun func not defined'); },
    runResult: { },
    saveResult: { },
    onGetCode: () => { console.error('onGetCode func not deinfed'); }
};

class CodingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: `#include<iostream>${'\n'}using namespace std;${'\n\n'}int main(){${'\n\t'}cout << "HelloWorld";${'\n\t'}return 0;${'\n'}}`,
            cpp_code:`#include<iostream>${'\n'}using namespace std;${'\n\n'}int main(){${'\n\t'}cout << "HelloWorld";${'\n\t'}return 0;${'\n'}}`,
            java_code:`public class Main {${'\n\t'}public static void main(String[] args){${'\n\t\t'}System.out.println("HelloWorld");${'\n\t'}}${'\n'}}`,
            js_code: `console.log('HelloWorld');`,
            py_code: `print 'Hello'`,
            mode: 'c_cpp',
            description: `C++11 (g++ 5.4.0)`,
            cpp_description: `C++11 (g++ 5.4.0)`,
            java_description: 'Java 8 (Oracle 1.8.0_131)',
            js_description: 'JavaScript (Node.js)',
            py_description: 'Python 2.7.6',
            result: '',
            cpp_result: '',
            java_result: '',
            js_result: '',
            py_result: '',
            ready: false,
            init_cpp_code:`#include<iostream>${'\n'}using namespace std;${'\n\n'}int main(){${'\n\t'}cout << "HelloWorld";${'\n\t'}return 0;${'\n'}}`,
            init_java_code:`public class Main {${'\n\t'}public static void main(String[] args){${'\n\t\t'}System.out.println("HelloWorld");${'\n\t'}}${'\n'}}`,
            init_js_code: `console.log('HelloWorld');`,
            init_py_code: `print 'Hello'`,
            mycode: [ ],
            requireRun: true,
            save: false,
            save_title: '',
            save_description: '',
            todo: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.modeChange = this.modeChange.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleInit = this.handleInit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentWillMount() {
        const id = JSON.parse(localStorage.getItem('auth')).id;
        this.props.onGetCode(id).then(
            (success) => {
                if(success){
                    if(this.props.mycode.length > 0){
                        this.setState({ mycode: this.props.mycode });
                        console.log(this.state.mycode);
                    }
                }
            }
        )
    }

    modeChange(mode){
        if(mode === this.state.mode) return;
        switch(mode){
            case 'c_cpp': this.setState({result: this.state.cpp_result, description: this.state.cpp_description, code: this.state.cpp_code}); break;
            case 'java': this.setState({result: this.state.java_result, description: this.state.java_description, code: this.state.java_code}); break;
            case 'javascript': this.setState({result: this.state.js_result, description: this.state.js_description, code: this.state.js_code}); break;
            case 'python': this.setState({result: this.state.py_reuslt, description: this.state.py_description, code: this.state.py_code}); break;
            default: break;
        }
        this.setState({ mode: mode, requireRun: true});
    }

    handleChange(newCode){
        this.setState({code: newCode, requireRun: true});
        switch(this.state.mode){
            case 'c_cpp': this.setState({cpp_code: newCode}); break;
            case 'java': this.setState({java_code: newCode}); break;
            case 'javascript': this.setState({js_code: newCode}); break;
            case 'python': this.setState({py_code: newCode}); break;
            default: break;
        }
    }

    handleRun(){
        const obj = { mode: this.state.mode, code: this.state.code };
        this.setState({ready: true});
        this.props.onRun(obj).then(
            (success) => {
                if(success){
                    if(this.props.runResult.run_status.status === 'AC'){
                        this.setState({result: this.props.runResult.run_status.output_html, requireRun: false});
                    } else if(this.props.runResult.run_status.status === 'RE') {
                        this.setState({result: `실행에 실패했습니다.${'\n'}<p>사유 : ${this.props.runResult.run_status.stderr}`});
                    } else {
                        this.setState({result: `컴파일에 실패했습니다.${'\n'}<p>사유 : ${this.props.runResult.compile_status}`});
                    }
                    if(obj.mode === 'c_cpp') this.setState({cpp_result: this.state.result});
                    else if(obj.mode === 'java') this.setState({java_result: this.state.result});
                    else if(obj.mode === 'javascript') this.setState({js_result: this.state.result});
                    else if(obj.mode === 'python') this.setState({py_result: this.state.result});
                } else {
                    this.setState({result: '알 수 없는 이유로 실행에 실패했습니다.'});
                }
                this.setState({ready: false});
            }
        );
    }

    handleInit(){
        this.setState({requireRun: true, result:''});
        switch(this.state.mode){
            case 'c_cpp': this.setState({cpp_code: this.state.init_cpp_code, code: this.state.init_cpp_code}); break;
            case 'java': this.setState({java_code: this.state.init_java_code, code: this.state.init_java_code}); break;
            case 'javascript': this.setState({js_code: this.state.init_js_code, code: this.state.init_js_code}); break;
            case 'python': this.setState({py_code: this.state.init_py_code, code: this.state.init_py_code}); break;
            default: break;
        }
    }

    handleSave(){
        console.log(this.state.requireRun);
        if(this.state.requireRun){
            this.setState({todo: true});
            return;
        }
        this.setState({save: true, requireRun: true});
    }

    handleModalClose(){
        if(this.state.save === false) return;
        this.setState({save: false});
        const obj = { };
        obj.id = JSON.parse(localStorage.getItem('auth')).id;
        obj.src = this.state.code;
        obj.title = this.state.save_title;
        obj.result = this.state.result;
        obj.desc = this.state.save_description;
        obj.lang = this.state.mode;
        this.props.onSave(obj).then(
            (success) => {
                if(success){
                    obj._id = this.props.saveId;
                    this.setState(update(this.state, {
                        mycode: {
                            $push: [ obj ]
                        }
                    }));
                    this.setState({ requireRun: true});
                }
            }
        );
    }

    handleModalChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    handleRemove(id, idx){
        console.log('handleRemove', id);
        this.props.onRemove(id).then(
            (success) => {
                if(success){
                    this.setState({
                        mycode: update(this.state.mycode, {
                            $splice: [[idx, 1]]
                        })
                    });
                    console.log(this.state.mycode);
                } else {
                    alert('삭제에 실패했습니다.');
                }
            }
        )
    }

    render() {
        const result = this.state.result;
        return(
            <div>
                <Modal basic size='small' open={this.state.todo} onClose={() => {this.setState({todo: false})}}>
                    <Header icon='warning' content='앗!'/>
                    <Modal.Content>
                        <p>소스코드를 작성하시고 Run 버튼을 먼저 눌러주세요!</p>
                    </Modal.Content>
                </Modal>
                <Modal size='small' open={this.state.save} onClose={() => { this.setState({save: false})}} closeOnDimmerClick={false}>
                    <Modal.Header>
                        Save Code!
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Input fluid icon='hashtag' iconPosition='left' name='save_title' placeholder='제목을 입력해주세요.' onChange={this.handleModalChange} />
                            <Form.Input fluid icon='edit' iconPosition='left' name='save_description' placeholder='설명을 해주세요.' onChange={this.handleModalChange}/>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' icon='checkmark' labelPosition='right' content='취소' onClick={() => { this.setState({save: false})} }/>
                        <Button color='blue' icon='checkmark' labelPosition='right' content='확인' onClick={this.handleModalClose}/>
                    </Modal.Actions>
                </Modal>
                <Dimmer active={this.state.ready}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <HeaderForm/>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Segment raised>
                                <Label as='a' color='red' ribbon>Language</Label>
                                <Button size='small' color={this.state.mode === 'c_cpp' ? 'green' : undefined} onClick={() => { this.modeChange('c_cpp') }}>C++</Button>
                                <Button size='small' color={this.state.mode === 'java' ? 'green' : undefined} onClick={() => {this.modeChange('java')}}>Java</Button>
                                <Button size='small' color={this.state.mode === 'javascript' ? 'green' : undefined} onClick={() => {this.modeChange('javascript')}}>Javascript</Button>
                                <Button size='small' color={this.state.mode === 'python' ? 'green' : undefined} onClick={() => {this.modeChange('python')}}>Python</Button>
                            </Segment>
                            <Segment raised>
                                <Label as='a' color='blue' ribbon>Description</Label>
                                <span dangerouslySetInnerHTML={{__html: this.state.description}}></span>
                            </Segment>
                            <Button primary floated='right' onClick={this.handleRun}>Run</Button>
                            <Button color='teal' floated='right' onClick={this.handleSave}>Save</Button>
                            <Button color='orange' floated='right' onClick={this.handleInit}>Init</Button>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Label color='red' size='large' horizontal style={{width:'100%', margin:'5px'}}>Code Area</Label>
                            <AceEditor
                                mode={this.state.mode}
                                theme="tomorrow"
                                name="UNIQUE_ID_OF_DIV"
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                height='500px'
                                width='100%'
                                onChange={this.handleChange}
                                editorProps={{$blockScrolling: true}}
                                value={this.state.code}
                                enableLiveAutocompletion={true}
                                enableBasicAutocompletion={true}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Label color='blue' size='large' horizontal style={{width:'100%', margin:'5px'}}>Result Area</Label>
                            <div style={{overflowY:'scroll', whiteSpace:'nowrap', height:'95%', maxHeight:'500px'}} dangerouslySetInnerHTML={{__html: result}}></div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <MyCodeForm onRemove={this.handleRemove} onGetCode={this.props.onGetCode} mycode={this.state.mycode}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

CodingForm.propTypes = propTypes;
CodingForm.defaultProps = defaultProps;

export default CodingForm;
