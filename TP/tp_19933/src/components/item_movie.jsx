import React, { Component } from 'react';

class Item_Movie extends Component {

    getBackgroundImageStyle = () => ({
        width: "100%",
        maxWidth: "200px",
        minHeight: "300px",
        backgroundSize: "100% 100%",
        backgroundImage: `url(` + this.props.imageURL + `)`
    });
    
    render(){
        return (
            <React.Fragment>
                <a className="ml-2 mt-2 d-flex justify-content-center" href={ "/detailed/" + this.props.id}>
                    <div style={ this.getBackgroundImageStyle() }>
                        <div className="title-item">
                            <h1 className="badge m-2 badge-warning" >{ this.props.title }</h1> 
                        </div>
                    </div>
                </a>
            </React.Fragment>
        )
    }
}

export default Item_Movie;