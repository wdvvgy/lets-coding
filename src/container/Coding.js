import React, { Component, PropTypes } from 'react';
import { CodingForm } from 'component';
import { connect } from 'react-redux';
import { runRequest, saveCodeRequest, getCodeRequest, removeCodeRequest } from 'action/code';

class Coding extends Component {
    constructor(props) {
        super(props);
        this.handleRun = this.handleRun.bind(this);
        this.handleSaveCode = this.handleSaveCode.bind(this);
        this.handleGetCode = this.handleGetCode.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRun(obj){
        return this.props.runRequest(obj).then(
            () => {
                return (this.props.runStatus === 'SUCCESS' ? true : false);
            }
        )
    }

    handleSaveCode(obj){
        return this.props.saveCodeRequest(obj).then(
            () => {
                return (this.props.saveStatus === 'SUCCESS' ? true : false);
            }
        )
    }

    handleGetCode(obj){
        return this.props.getCodeRequest(obj).then(
            () => {
                return (this.props.getCodeStatus === 'SUCCESS' ? true : false);
            }
        )
    }

    handleRemove(obj){
        return this.props.removeCodeRequest(obj).then(
            () => {
                return (this.props.removeCodeStatus === 'SUCCESS' ? true : false);
            }
        )
    }

    render() {
        return(
            <div>
                <CodingForm
                    onRun={this.handleRun}
                    runResult={this.props.runResult}
                    onSave={this.handleSaveCode}
                    onGetCode={this.handleGetCode}
                    mycode={this.props.mycode}
                    onRemove={this.handleRemove}
                    saveId={this.props.saveId}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        runStatus: state.code.run.runStatus,
        runResult: state.code.run.runResult,
        saveStatus: state.code.code.saveStatus,
        getCodeStatus: state.code.code.getStatus,
        mycode: state.code.code.myCode,
        removeCodeStatus: state.code.code.removeStatus,
        saveId: state.code.code.saveId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        runRequest: (obj) => {
            return dispatch(runRequest(obj));
        },
        saveCodeRequest: (obj) => {
            return dispatch(saveCodeRequest(obj));
        },
        getCodeRequest: (obj) => {
            return dispatch(getCodeRequest(obj));
        },
        removeCodeRequest: (obj) => {
            return dispatch(removeCodeRequest(obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coding);
