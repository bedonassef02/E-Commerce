class StaticController {

    index(request, response) {
        response.json("Index Page")
    }
    about(request, response) {
        response.json("About Us Page")
    }
    contact(request, response) {
        response.json("Contact Us Page")
    }

}

module.exports = StaticController