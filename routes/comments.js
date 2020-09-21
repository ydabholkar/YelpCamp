var express=require("express");
var router=express.Router();
var Campground=require("../models/campground")
var comment=require("../models/comment");
var middleware=require("../middleware");
//creating new comments
router.get("/campgrounds/:id/comment/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
		}else{
			res.render("comment/new",{campground:campground})
		}
	})
	
})
router.post("/campgrounds/:id/comment",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds");
		}else{
			comment.create(req.body.comment,function(err,comment){
						   if(err){
							   res.flash("error","campgrounds not found");
							   console.log(err)
						   }else{
							   comment.author.id=req.user._id;
							   comment.author.username=req.user.username;
							   comment.save();
							  campground.comment.push(comment);
							  campground.save();
							    req.flash("success","successfully added comment");
							   res.redirect("/campgrounds/" + req.params.id)
						   }
						   })
			
		}
	})
})
//editing comments
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back")
		}else{
			res.render("comment/edit",{campground_id: req.params.id,
									  comment: foundcomment})
		}
	})
})
//updating comments
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundcomment){
		if(err){
			res.redirect("back")
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	} )
})
//deleting comments
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndDelete(req.params.comment_id,function(err){
		if(err){
			res.redirect("back")
		}else{
			req.flash("success","comment deleted")
			res.redirect("back")
		}
	})
	
})



module.exports=router;