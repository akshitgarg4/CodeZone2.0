const mongoose = require ( "mongoose" );
mongoose.connect ( "mongodb://localhost/codezone2" );
const db = mongoose.connection;

db.on ( "error" , console.error.bind ( console , "Error in connecting with db" ) );
db.once ( "open" , function () {
    console.log ( "Successful connection with db" );
} );

module.exports = db;