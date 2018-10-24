import React, { Component } from 'react';

class Student extends Component{

    render(){
        return (
            <div>
                <div>Name: {this.props.name}</div>
                <div>Address: {this.props.add}</div>
            </div>
        );
    }
}
export default Student;