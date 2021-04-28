import React, { Component } from 'react';

class Item_Movie extends Component {

    state = {
        count: this.props.value,
        imgUrl: 'https://picsum.photos/200',
        tags: ['tag1','tag2','tag3']
    };

    RenderTags(){
        if(this.state.tags.length === 0) 
            return <p> They are no tags </p>;
        return <ul>{this.state.tags.map(tag => <li key={tag}> { tag } </li>)}</ul>;
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps);
        console.log(prevState);
        if(prevProps.value !== this.props.value){
            //ajax request
        }
    }

    componentWillUnmount(prevProps, prevState) {
        console.log('component unmount'); //make before remove component "If we have timers or listeners, for example, we can clean those subs before this component is removed"
    }

    styles = {
        fontSize: 30
    }

    handleIncrement = () => {
        console.log('Increment Clicked', this);
        this.setState({
            count: this.state.count + 1
        });
    }

    handleDecrement = () => {
        console.log('Increment Clicked', this);
        this.setState({
            count: this.state.count - 1
        });
    }
    
    render(){
        return (
            <React.Fragment>
                { this.props.children } @ { this.props.id }
                <a href={ "/detailed/" + this.props.id}>
                    <img width="200px" src={ this.props.imageURL } alt="" />
                    <h1 style = { this.styles } className={ this.GetClass() }>{ this.props.title }</h1> 
                </a>
                {/*<span style = { this.styles } className={ this.GetClass() }>{ this.Change() }</span>*/}
                {/*<button onClick={ () => { this.handleIncrement({id:1}) } }>Increment</button>*/}
                <button className="btn btn-success btn-sm m-2" onClick={ this.handleIncrement }>Add Favorite</button>
                <button className="btn btn-danger btn-sm m-2" onClick={  () => this.props.onDelete(this.props.id) }>Delete</button>
            </React.Fragment>
        )
    }

    GetClass () {
        let classes = "badge m-2 badge-"
        classes += this.state.count === 0 ? 'warning' : 'primary';
        return classes;
    }

    Change(){
        return this.state.count === 0 ? 'Zero' : this.state.count
    }
}

export default Item_Movie;