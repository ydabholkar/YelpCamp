//all the middleware goes here
var Campground=require("../models/campground");
var comment=require("../models/comment");
var middlewarObj={}
middlewarObj.checkCommentOwnership=function (req,res,next){
		if(req.isAuthenticated()){
				comment.findById(req.params.comment_id,function(err,foundComment){
				if(err){
					res.redirect("back");
				}else{
					// does the user own the comment
					if(foundComment.author.id.equals(req.user._id)){
						next();
					}else{
						res.redirect("back"); 
					}

				}
			})
		}else{
			res.redirect("back");
		}
}
middlewarObj.checkCampgroundOwnership=function (req,res,next){
		if(req.isAuthenticated()){
				Campground.findById(req.params.id,function(err,foundCampground){
				if(err){
					req.flash("error","Campground not found")
					res.redirect("back");
				}else{
					// does the user own the campground
					if(foundCampground.author.id.equals(req.user._id)){
						next();
					}else{
						req.flash("error","Permission Denied!!!")
						res.redirect("back"); 
					}

				}
			})
		}else{
			req.flash("error","You need to be LoggedIn")
			res.redirect("back");
		}
}
middlewarObj.isLoggedIn=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be LoggedIn")
	res.redirect("/login");
}
module.exports=middlewarObj;