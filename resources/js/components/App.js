import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ProjectsList from './Projects/ProjectsList';
import AddProject from './Projects/AddProject';
import ShowProject from './Projects/ShowProject';

class App extends Component {

    render() {        
        return(
            <BrowserRouter>                
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={ProjectsList} />
                        <Route path='/create' component={AddProject} />
                        <Route path='/:id' component={ShowProject} />
                    </Switch>
                </div>
            </BrowserRouter>
        )     
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
