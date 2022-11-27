const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB");
const articleSchema = mongoose.Schema({
    title:String,
    content:String
});

const Article = mongoose.model("Article",articleSchema);

const article = new Article({
    title:"Python",
    content:"Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming"
});

app.get("/",(req,res)=>{
    Article.find({},(err,found)=>{
        if(found.length === 0)
        {
            console.log("Inserting...");
            article.save();
            console.log("...inserted")
        }
        res.send("<h1>"+found[0].title+"</h1><p>"+found[0].content+"</p>");
        

    })
});

app.listen(3000,()=>{
    console.log("listenig on port 3000\nhttp://localhost:3000");
});