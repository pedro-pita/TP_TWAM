import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/navbar';
import Movies from './pages/list_movies';
import Home from './pages/home';
import Footer from './components/footer';
import Detailed from './pages/detailed_movie';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {Auth: false};
    }
    
    render() {

        return (
            <React.Fragment>
                <Nav />
                <Router>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/movies/:value" component={ Movies } />
                        <Route exact path="/movies/search/:value" component={ Movies } />
                        <Route exact path="/detailed/:value" component={ Detailed } />
                        <Route path="*" render= {() => <div className="container d-flex align-items-center justify-content-center"><img src="http://localhost:3000/404.png" width="70%"></img></div>} />
                    </Switch>
                </Router>
                <Footer />
            </React.Fragment>
        )
    }
}

export default App;