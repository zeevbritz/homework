import React, { Component } from 'react';
import './form.css';

class Form extends Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>Enter a US zip code: <input name="zip" type="text" pattern="\d*" minLength="5" maxLength="5" onChange={this.props.handleInputChange} value={this.props.zip} required /></label>
                <button>Submit!</button>
            </form>);
    }
}

export default Form;