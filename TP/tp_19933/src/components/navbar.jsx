import React, { Component } from 'react';
import Search from './search_form'
import Redirect from 'react'


class Nav extends Component {
    state = {};

    buttonHome = () => ({
        backgroundColor:"#2c254a",
        color:"white",
        textAlign:"center"
    });

    searchMovie = () => {
        
    };
    
    render() {
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-light secondary-background-color">
                    <div class="container-fluid secondary-background-color">
                    <div className="col-12 col-lg-8 col-xl-9 ">
                        <div className="row">
                            <div class="input-group rounded">
                                <div className="col-4 col-sm-2 col-md-2 col-lg-2 col-xl-3" align="rigth">
                                    <div className="row">
                                        <div className="col-xl-6"/>
                                        <div className="col-12 col-xl-6">
                                            <a className="navbar-brand nav-link nav-items text-white" href="/" >HOME</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8 col-sm-10 col-md-10 col-lg-10 col-xl-9">   
                                    <Search/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-3" align="left">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item col-sm-12 col-md-12 col-lg-6">
                                    <form method="get" action="/movies/list">
                                        <input type="submit" className="btn btn-light btn-home col-sm-12 col-md-12 col-lg-12" style={this.buttonHome()} value="Movies" />
                                    </form>
                                </li>
                                <li className="nav-item col-sm-12 col-md-12 col-lg-7">
                                    <form method="get" action="/movies/favorites">
                                        <input type="submit" className="btn btn-light btn-home col-sm-12 col-md-12 col-lg-12" style={this.buttonHome()} value="Favorites" />
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div> 
                    </div> 
                </nav>
            </>
        )
    }
}

export default Nav;