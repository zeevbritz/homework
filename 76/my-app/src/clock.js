import React, { Component } from 'react';

class Clock extends Component{
    constructor(props){
        super(props);

        this.state = {
            counter: 0
        };

        setInterval(() => this.setState({
            counter: this.state.counter + 1
        }),1000);
    }
    render(){
        return (
            <h1>{new Date().toLocaleTimeString()}</h1>
        );
    }

}
export default Clock;