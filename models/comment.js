var mongoose=require("mongoose");
var Campground=require("./campground");
var commentSchema= mongoose.Schema({
	text: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		
		},
		username: String
	}
	
})


module.exports=mongoose.model("comment",commentSchema);