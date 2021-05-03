import React, { Component } from 'react';




class Nav extends Component {
    state = {};

    buttonHome = () => ({
        backgroundColor:"#2c254a", 
        marginLeft:"8px", 
        color:"white"
    });
    
    render() {
        return (
            <>
                <nav className="row navbar navbar-expand-lg navbar-light secondary-background-color " style={{width:"white"}}>
                        <div className="col-sm-0 col-md-1">

                        </div>
                        <div className="col-sm-1 col-md-1">
                            <a className="navbar-brand nav-link nav-items text-white" href="/" >Home</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="col-sm-2 col-md-8">
                            <div className="input-group align-middle">
                            
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                    {/*<button type="button" className="btn btn-outline-primary">search</button>*/}
                            </div>
                        </div>
                        <div className="col-sm-2 col-md-2">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <form method="get" action="/movies">
                                           <input type="submit" class="btn btn-light btn-home" style={this.buttonHome()} value="Filmes" />
                                        </form>
                                    </li>
                                    <li className="nav-item">
                                        <form method="get" action="/favorites">
                                            <input type="submit" class="btn btn-light btn-home" style={this.buttonHome()} value="Favoritos" />
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