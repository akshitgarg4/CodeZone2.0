
module.exports.home = function ( req , res ) {
    return res.status ( 200).json({ message : "Welcome to CodeZone2.0 from Backend" });
};