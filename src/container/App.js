import React, { Component, PropTypes } from 'react';
import { Login, Main, Register, Coding } from 'container';
import { NotFound, requireAuthentication } from 'component';
import { BrowserRouter as Router, Link, Route, Switch, Redirect, Miss } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/main' component={requireAuthentication(Main)}/>
                        <Route path='/coding' component={requireAuthentication(Coding)}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
