const jwt = require("jsonwebtoken")
const Candidate = require("../model/candidate")

exports.authMiddleware1 = async (req, res, next) => {

    console.log("cookies", req.cookies)

    if (req.cookies.user) {

        const user = await Candidate.findOne( { email: req.cookies.user } )

        if(user) {
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorised!"
            })
        }

    } else {

        return res.status(401).json({
            message: "Unauthorised!"
        })

    }

}

exports.authMiddleware2 = async (req, res, next) => {

    if(req.body.token) {

        const token = jwt.verify(req.body.token, 'test')
        const candidate = await Candidate.findById(token.id)

        if(candidate) {
            next()
        }
        else {
            return res.status(401).json({
                message: "Unauthorised!"
            })
        }

    } else {
        return res.status(401).json({
            message: "Unauthorised!"
        })
    }

}