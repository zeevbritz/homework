/* jshint strict: false */
import $ from 'jquery';
import './normalize.css';
import './style.css';


    const container = $('#container');
    const header = $('header');
    const home_button = $('<button id="home">Home</button>').appendTo(header).hide();
    const nav = $('<span id= "nav"></span>').appendTo(header).hide();
    const blogContainer = $('<div id= "blogContainer"></div>').appendTo(container);
    const postContainer = $('<div id= "postContainer"></div>').appendTo(container);

    $('<button class="nav">Previous</button>').appendTo(nav);
    $('<button class="nav">Next</button>').appendTo(nav);

    let blogs;
    let min;
    let max;
    let currentBlogName;
    let currentPosts;

    header.on('click', '#home', () => {
        home_button.hide();
        nav.hide();
        postContainer.hide();
        blogContainer.show();
    });

    header.on('click', '.nav', event => {
        if (event.target.innerHTML === 'Next') {
            if (min === currentPosts.length - 1) {
                return;
            } else {
                min = max;
                max += 3;
            }
        } else {
            if (min === 0) {
                return;
            } else if (min <= 2) {
                min = 0;
                max = 3;
            } else {
                min -= 3;
                max -= 3;
            }
        }
        displayPosts(min, max, currentPosts);
    });

    postContainer.on('click', '#showComments', event => {
        if (event.target.innerHTML === 'SHOW COMMENTS') {
            $(event.target.parentElement.children.commDiv).show();
            event.target.innerHTML = 'HIDE COMMENTS';
        } else {
            event.target.innerHTML = 'SHOW COMMENTS';
            $(event.target.parentElement.children.commDiv).hide();
        }
    });

    $.getJSON('https://jsonplaceholder.typicode.com/users', blog => {
        blogs = blog.map(blog => ({
            id: blog.id,
            name: blog.name,
            website: blog.website,
            company: {
                name: blog.company.name,
                catchPhrase: blog.company.catchPhrase,
                bs: blog.company.bs
            }
        }));
        displayBlogs();
    });

    function displayBlogs() {
        blogs.forEach(blog => {
            let blogDiv = $(`<div id= "blogDiv"><h3>${blog.name}</h3><a href="https://www.${blog.website}" target=_Blank>${blog.website}</a><h4>${blog.company.name}</h4><h5>${blog.company.catchPhrase}</h5><h6>${blog.company.bs}</h6></div>`)
                .appendTo(blogContainer);
            getPosts(blogDiv, blog);
        });
    }

    function getPosts(blogDiv, blog) {
        blogDiv.click(() => {
            $.getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${blog.id}`, posts => {
                min = 0;
                max = 3;
                currentPosts = posts;
                currentBlogName = blog.name;
                displayPosts(min, max, currentPosts);
                blogContainer.hide();
                postContainer.show();
            });
        });
    }

    function displayPosts(min, max, posts) {
        postContainer.empty();
        home_button.show();
        nav.show();
        $(`<h1>${currentBlogName}</h1>`).appendTo(postContainer);
        for (let i = min; i < max && i < posts.length; i++) {
            let postDiv = $(`<div class= "postDiv"><small>Post #: ${i + 1}</small><h3>${posts[i].title}</h3><h4>${posts[i].body}</h4></div>`)
                .appendTo(postContainer);
            $('<span id= "showComments">SHOW COMMENTS</span>').appendTo(postDiv);
            let commDiv = $('<div id= "commDiv"></div>').appendTo(postDiv).hide();
            getComments(posts[i], commDiv);
        }
    }

    function getComments(post, commDiv) {
        if (!post.comments) {
            $.getJSON(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`, comments => {
                post.comments = comments;
                post.comments.forEach(comment => {
                    $(`<div id= "comment"><small>comment #: ${comment.id}</small><h3>${comment.name}</h3><h5>${comment.email}</h5><section>${comment.body}</section></div>`).appendTo(commDiv);
                });
            });
        } else {
            post.comments.forEach(comment => {
                $(`<div id= "comment"><small>comment #: ${comment.id}</small><h3>${comment.name}</h3><h5>${comment.email}</h5><section>${comment.body}</section></div>`).appendTo(commDiv);
            });
        }
    }