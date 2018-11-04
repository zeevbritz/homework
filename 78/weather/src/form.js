import React, { Component } from 'react';
import './form.css';

class Form extends Component {

    handleInputChange = event => { this.props.handleInputChange(event) };

    handleSubmit = event => { this.props.handleSubmit(event) };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Enter a US zip code: <input name="zip" type="text" pattern="\d*" minLength="5" maxLength="5" onChange={this.handleInputChange} value={this.props.zip} required /></label>
                <button>Submit!</button>
            </form>);
    }
}

export default Form;