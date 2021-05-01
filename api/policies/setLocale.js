 
module.exports = function (req, res, next) {
    
	var lang = req.header('lang');

	if (lang) {
		 req.setLocale(lang);
    }
    console.log(lang," is set for this request")
    return next();
}
