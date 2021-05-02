 
module.exports = function (req, res, next) {
    
    console.log(req.role);
   
    return next();
}
