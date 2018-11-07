import React, { Component } from 'react';
import './blogs.css'
import Blogs from './blogs';

class App extends Component {

  state = {
    showingPosts: false
    // blogs: []
  }



  handleShowingPosts = () => {
    this.setState({ showingPosts: !this.state.showingPosts })
    // this.setState.showingPosts = !this.state.showingPosts
  }

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        const error = new Error('OOPS');
        error.response = response;
        throw error;
      }
      const data = await response.json();
      this.setState({
        blogs: data.map(blog => ({
          id: blog.id,
          name: blog.name,
          website: blog.website,
          company: {
            name: blog.company.name,
            catchPhrase: blog.company.catchPhrase,
            bs: blog.company.bs
          }
        }))
      })
    }
    catch (error) {
      this.setState({
        error: error.response ? 404
          : 'Unable to fetch Blogs'
      })
    }
  }

  renderBlogs = () => {
    this.setState({ blogs: null, currentPosts: null });
    this.handleShowingPosts();
    this.getBlogs();
  }

  handleCurrentPosts = posts => {
    this.setState({ currentPosts: posts });
  }

  handleNext = () => {

  }

  handlePrevious = () => {
    
  }

  render() {
    return (
      <div id={"outerContainer"}>
        <header>
          <h1>ZB's Blog</h1>
          {this.state.showingPosts ?
            <>
              <button id="home" onClick={this.renderBlogs}>Home</button>
              {/* <button className="nav">Previous</button>
              <button className="nav">Next</button> */}
            </> : null}
        </header>
        {/* {this.state.blogs ? <div id={"container"}>{this.displayBlogs()} </div> : null} */}
        {this.state.blogs ? <div id={"container"}><Blogs blogs={this.state.blogs} handleShowingPosts={this.handleShowingPosts} handleCurrentPosts={this.handleCurrentPosts} posts={this.state.currentPosts}/></div> : null}
      </div>
    )
  }
}

export default App;
