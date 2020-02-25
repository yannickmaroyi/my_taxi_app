var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var url = "mongodb://yannick:yannick@cluster0-shard-00-00-6h8fi.gcp.mongodb.net:27017,cluster0-shard-00-01-6h8fi.gcp.mongodb.net:27017,cluster0-shard-00-02-6h8fi.gcp.mongodb.net:27017/taxiApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
var db = mongojs(url,["bookings"]);
router.get("/bookings",function(req,res,next){
    console.log("bad load 1 data");
    db.bookings.find(function(err,booking){
        if(err){
            res.send(err);
        }
        res.json(booking); 
    });
});

router.post("/bookings", function(req,res,next){
    console.log("bad load data");
    var booking = req.body.data;
    if(!booking){
        res.status(400).json({error: "bad data"});
        console.log("bad data");
    } else{
        db.bookings.save(booking, function(err, savedBooking){
            if(err){
               res.send(err);
               console.log("save error data");
            } else {
               res.json(savedBooking);
               console.log("data saved");
            }
        });
    }
});
module.exports = router;