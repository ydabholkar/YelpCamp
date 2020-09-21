var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});



//CREATE - add new campground to DB


router.get("/register",function(req,res){
	res.render("register");
})
router.post("/register",function(req,res){
	var newUsername=new User({username: req.body.username});
	User.register(newUsername,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message)
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to Yelpcamp"+user.username)
			res.redirect("/campgrounds");
		})
	});
})


//show login page
router.get("/login",function(req,res){
	res.render("login") 
})
//handling login logic
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),function(req,res){
	
})




router.get("/logout",function(req,res){
	req.flash("error","logged you out");
	req.logout();
	res.redirect("/campgrounds");
})
module.exports=router;