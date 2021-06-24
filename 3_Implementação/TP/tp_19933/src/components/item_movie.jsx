import React, { Component } from 'react';

class Item_Movie extends Component {

    getBackgroundImageStyle = () => ({
        minWidth: "190px",
        minHeight: "290px",
        backgroundSize: "100% 100%",
        backgroundImage: `url(` + this.props.imageURL + `)` + `,url(` + "https://dummyimage.com/190x290/c2c2c2/fafafa&text=Image" + `)`
    });

    imageStyle = () => ({
        height: "400px",
        objectFit: "cover"
    });
    
    render(){
        return(
            <React.Fragment>
                <a className="ml-1 mt-2 d-flex justify-content-center" href={ "/detailed/" + this.props.id}>
                    <div class="card secondary-background-color">
                        <img alt={"Capa do filme " + this.props.title} class="card-img-top img-fluid" src={this.props.imageURL} style={ this.imageStyle()} onError={(e)=>{e.target.onerror = null; e.target.src="https://dummyimage.com/400x600/bdbdbd/ffffff&text=Image+not+found"}} />
                        <div class="card-body secondary-background-color">
                            <h5 class="card-title">
                                { (this.props.title.length > 17) ? this.props.title.slice(0,14) + "..." : this.props.title}
                            </h5>
                        </div>
                    </div>
                </a>
            </React.Fragment>
        )
    }
}

export default Item_Movie;