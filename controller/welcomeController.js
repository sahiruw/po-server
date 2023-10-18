const welcomeUser = async (req, res) => {
    res.json({ message: "Hello User!" });
}

module.exports = welcomeUser

