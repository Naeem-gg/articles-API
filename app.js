const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB");
const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

const article = new Article({
    title: "Python",
    content: "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming"
});

/*****************REQUESTS TARGETING ALL RECORDS ********************/
app.route("/articles")

.get((req, res) => {
    Article.find({}, (err, found) => {
        if (found.length === 0) {
            console.log("Inserting...");
            article.save();
            console.log("...inserted")
        }
        res.send(found);


    })
})

.post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const postArticle = new Article({
        title: title,
        content: content
    });
    postArticle.save();
    Article.find({ title: title, content: content }, (err, found) => {
        res.send(found);
    });
})

.delete((req, res) => {
    Article.deleteMany({}, (err) => {
        if (err)
            res.send(err);
        else
            res.send("Successfully deleted every records..");
    })
})

app.listen(3000, () => {
    console.log("listenig on port 3000\nhttp://localhost:3000");
});