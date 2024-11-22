import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
var blogTitles = [];
var blogTexts = [];
var checker = false;
var emailText = [];
var messageText = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    console.log("Adresy: " + emailText);
    console.log("Spravy: " + messageText);
    console.log("Nazvy blogov: " + blogTitles);
    res.render("home.ejs", {was_submitted: "nothing"});
})

app.use(express.static("public"));

app.get("/write", (req, res) => {
    res.render("write.ejs");
})

app.get("/read", (req, res) => {
    res.render("read.ejs", {
        blogTitles: blogTitles,
    });
});

app.get("/about", (req, res) => {
    res.render("about_contact.ejs", 
        {section: "about"}
    )});

app.get("/contact", (req, res) => {
    res.render("about_contact.ejs",
        {section: "contact"}
    )});

app.post("/submit_blog", (req, res) => {
    const title = req.body.title;
    const blog = req.body.blog;
    blogTitles.push(title);
    blogTexts.push(blog);
    res.render("home.ejs", { 
        was_submitted: "blog" 
    });
});

app.post("/submit_email", (req, res) => {
    const email = req.body.email;
    const message = req.body.message;
    emailText.push(email);
    messageText.push(message);
    res.render("home.ejs", {
        was_submitted: "email"
    });
});


app.post("/update_blog", (req, res) => {
    const index = req.body.index;
    console.log("Received index: ", index);
    var titleToRender = blogTitles[index];
    var blogToRender = blogTexts[index];
    res.json({
        titleToRender: titleToRender,
        blogToRender: blogToRender,
    });
});


// initialization of the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


blogTitles[0] = "Some first blog";
blogTexts[0] = "This is the first blog Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat. Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat. Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat"
blogTitles[1] = "Random second blog";
blogTexts[1] = "This is th`e second blog Lorem ipsum nascetur massa dolor platea eu. Liberec. Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat Lorem ipsum odor amet, consectetuer adipiscing elit. Conubia maximus justo erat."