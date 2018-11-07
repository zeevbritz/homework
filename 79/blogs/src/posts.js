import React, { Component } from 'react';

class Posts extends Component {
    state = {}

    displayPosts = () => {
        return (
                this.props.posts.map((post, index) =>
                <div className={"postDiv"} key={index}>
                    <small>Post #: {index + 1}</small>
                    <h3>{post.title}</h3>
                    <h4>{post.body}</h4>
                </div>)
        )
    };

    render() {
        return (this.displayPosts());
    }
}

export default Posts;