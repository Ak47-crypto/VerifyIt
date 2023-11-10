const jwt = require('jsonwebtoken')
const secreatKey = "akisdon"

let fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token')
        const user = jwt.verify(token, secreatKey)
        req.userId = user.id
        next()
    } catch (err) {
        res.status(401).send({ error: "please authenticate" })
    }
}

module.exports = fetchUser;