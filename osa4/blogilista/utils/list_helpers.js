var _ = require('loadsh');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    var likes = 0;
    for (var b in blogs) {
        likes += blogs[b].likes;
    }
    return likes;
}

const favoriteBlog = (blogs) => {
    var id = -1;
    var biggest = -1;
    for (var b in blogs) {
        if (blogs[b].likes >= biggest) {
            id = b;
            biggest = blogs[b].likes;
        }
    }
    return blogs[id];
}

const mostBlogs = (blogs) => {
    var qualities = _.countBy(blogs, 'author');
    var obj = {};
    var biggest = -1;
    for (var q in qualities) {
        if (qualities[q] >= biggest) {
            obj = {
                author: q,
                blogs: qualities[q]
            }
            biggest = qualities[q];
        }
    }
    return obj;
}

mostLikes = (blogs) => {
    var author;
    var likes = 0;
    var authors = [];

    for (var b in blogs) {
        authors.push(blogs[b].author);
    }

    

    return { author, likes };
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}