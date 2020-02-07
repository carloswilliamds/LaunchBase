const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const postsVideo = require("./data")


server.use(express.static("public"))

server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) =>{
    const aboutData = {
        avatar_url: "https://avatars1.githubusercontent.com/u/17861439?s=460&v=4",
        name: "Carlos William",
        occupation: "Dev Full Stack Galaxy",
        bio: "Fascinado pelo cosmos, vivendo uma vida que vale apena ser vivida.",
        link: [
            {name: "facebook", url: "https://www.facebook.com/carloswilliamds"},
            {name: "github", url: "https://github.com/carloswilliamds"},
            {name: "instagram", url: "https://www.instagram.com/carloswilliamds/"}   
        ]

    }

    return res.render("about", {about : aboutData})
})


server.get("/portifolio", (req, res) =>{
    return res.render("portifolio", {items: postsVideo})
})

server.get("/video", (req, res) =>{
    const id = req.query.id
    const video  = postsVideo.find(function(video){
       return video.id === id
    })


    if(!video){
        return res.send("Nao tem ese video nao ze")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function() {
    console.log("Ta rolando a")
})