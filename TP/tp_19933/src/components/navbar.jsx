import React, { Component } from 'react';




class Nav extends Component {
    state = {};

    buttonHome = () => ({
        backgroundColor:"#2c254a",
        color:"white",
        textAlign:"center"
    });
    
    render() {
        return (
            <>
                <nav className="row navbar navbar-expand-lg navbar-light secondary-background-color nav justify-content-cente">
                        <div className="col-sm-0 col-lg-1"/>
                        <div className="col-sm-11 col-md-11 col-lg-8">
                            <div class="input-group rounded">
                                <a className="navbar-brand nav-link nav-items text-white" href="/" >Home</a>
                                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <span class="input-group-text border-0" id="search-addon">
                                    <i class="fas fa-search"></i>
                                </span>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-11 col-md-11 col-lg-4">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                                <ul className="navbar-nav mr-auto">
                                        <li className="nav-item col-sm-12 col-md-12 col-lg-6">
                                            <form method="get" action="/movies">
                                            <input type="submit" className="btn btn-light btn-home col-sm-12 col-md-12 col-lg-12" style={this.buttonHome()} value="Movies" />
                                            </form>
                                        </li>
                                        <li className="nav-item col-sm-12 col-md-12 col-lg-7">
                                            <form method="get" action="/favorites">
                                                <input type="submit" className="btn btn-light btn-home col-sm-12 col-md-12 col-lg-12" style={this.buttonHome()} value="Favorites" />
                                            </form>
                                        </li>
                                </ul>
                            </div>
                        </div> 
                </nav>
            </>
        )
    }
}

export default Nav;