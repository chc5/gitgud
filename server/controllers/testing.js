const authentication = ('../authentication');
exports.getTesting = (req, res) => res.status(200).send("logged in == " + req.isAuthenticated());

