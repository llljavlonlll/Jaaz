const isAdmin = function(req, res, next) {

    if(req.user.category == "admin") {
        return next();
    } 
    
    res.send({error: "Access denied!"});
    
}

module.exports = isAdmin;