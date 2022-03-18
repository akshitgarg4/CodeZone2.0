const jwt = require ( "jsonwebtoken" );

module.exports.authenticateToken = function ( req , res , next ) {
    const authHeader = req.headers[ "authorization" ];
    const token = authHeader && authHeader.split ( " " )[ 1 ];
    if ( token == null ) {
        return res.json ( 422 , {
            message : "Server Error token not found" ,
        } );
    }
    jwt.verify ( token , "CODEZONE2.0" , ( err , user ) => {
        if ( err ) {
            return res.json ( 422 , {
                message : "Server Error while retrieving token" ,
            } );
        }
        req.user = user;
        next ();
    } );
};