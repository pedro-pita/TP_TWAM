import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Nav from './components/navbar';
import Movies from './pages/list_movies';
import Home from './pages/home';
import Favorites from './components/fav_movies';
import Footer from './components/footer';
import Detailed from './pages/detailed_movie';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {Auth: false};
        const prop = props;
    }

    componentDidMount() {
        //ajax call
    }
    
    render() {
        const PrivatRoute = ({ component:Component, ...rest }) => ( 
            <Route {...rest} render={ (props) => (
              this.state.Auth === true ?
              <Component { ...rest} />
             :<Redirect to='/404' />
            ) } />
        )

        return (
            <React.Fragment>
                <Nav />
                <Router>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/movies/:value" component={ Movies } />
                        <Route exact path="/detailed/:value" component={ Detailed } />
                        <Route path="*" render= {() => <h1>404</h1>} />
                    </Switch>
                </Router>
                <Footer />
            </React.Fragment>
        )
    }
}

export default App;