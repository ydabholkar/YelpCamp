
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
	passport    =require("passport"),
	localStrategy=require("passport-local"),
	methodOverride=require("method-override"),
    mongoose    = require("mongoose"),
	flash       = require("connect-flash"),
	Campground  =  require("./models/campground"),
	comment     = require("./models/comment"),
	User        = require("./models/user")
	seedDB      = require("./seeds")
	
var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campground"),
	indexRoutes=require("./routes/index")


mongoose.connect("mongodb://localhost:27017/yelp_camp",{
				 useNewUrlParser: true,
				useUnifiedTopology: true
				 })
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seedDB(); seed the database


app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");
	next();
});
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


    






app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});