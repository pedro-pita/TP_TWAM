import React, { Component } from 'react';
import Search from './search_form'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: (window.innerWidth > 820) ? "http://localhost:3000/logo.png" : "http://localhost:3000/logo_small.png"
        };
        this.changeLogo = this.changeLogo.bind(this);
    }
    
    buttonHome = () => ({
        backgroundColor:"#2c254a",
        color:"white",
        textAlign:"center"
    });

    changeLogo(e){
        this.setState({url: (window.innerWidth > 820) ? "http://localhost:3000/logo.png" : "http://localhost:3000/logo_small.png" });
    }
  
    componentDidMount(){
        window.addEventListener('resize', (e) => this.changeLogo(e));
    }

    render() {
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-light secondary-background-color" style={{height:"100px"}} >
                    <div class="container-fluid secondary-background-color">
                    <div className="col-12 col-lg-8 col-xl-9 ">
                        <div className="row">
                            <div class="input-group rounded">
                                <div className="col-3 col-sm-3 col-md-3 col-lg-5 col-xl-4" align="right">
                                    <div className="row">
                                        <div className="col-1 col-xxl-6"/>
                                        <div className="col-12 col-xxl-6">
                                            <a className="navbar-brand nav-link nav-items text-white" href="/" ><img className="" style={{maxHeight:"50px"}} src={this.state.url }/></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-9 col-sm-9 col-md-9 col-lg-7 col-xl-8 align-self-center" align="left">   
                                    <Search/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-12 col-xl-12 secondary-background-color align-self-center" align="left">
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