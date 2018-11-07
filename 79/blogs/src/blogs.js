import React, { Component } from 'react';
import Posts from './posts';

class Blogs extends Component {
    state = {}

    componentDidMount() {
        // this.props.handleShowingPosts();
      }

    displayBlogs = () => {
        return this.props.blogs.map(blog =>
            <div id={"blogDiv"} key={blog.id} onClick={this.getPosts(blog)}>
                <h3>{blog.name}</h3>
                <a href={`https://www.${blog.website}`} target={'_Blank'}>{blog.website}</a>
                <h4>{blog.company.name}</h4>
                <h5>{blog.company.catchPhrase}</h5>
                <h6>{blog.company.bs}</h6>
            </div>)
    }
    getPosts = blog => {
        return async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blog.id}`)
                if (!response.ok) {
                    const error = new Error('OOPS');
                    error.response = response;
                    throw error;
                }
                const data = await response.json();
                // this.setState({ currentPosts: data, currentBlogName: blog.name })           
                this.props.handleCurrentPosts(data);
                this.setState({ currentBlogName: blog.name })                
                this.props.handleShowingPosts();
            }
            catch (error) {
                this.setState({
                    error: error.response ? 404
                        : 'Unable to fetch Blogs'
                })
            }
        }
    }

    render() {
        return (
            <>
                {this.props.posts ? <div id={"container"}><h1>{this.state.currentBlogName}</h1><Posts posts={this.props.posts} /></div> : this.displayBlogs()}
                {/* {this.state.currentPosts ? <div id={"container"}><h1>{this.state.currentBlogName}</h1><Posts posts={this.state.currentPosts} /></div> : this.displayBlogs()} */}
            </>
        )
    }
}

export default Blogs;