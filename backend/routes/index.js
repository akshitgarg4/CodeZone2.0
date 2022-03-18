const express = require ( "express" );
const router = express.Router ();
const homeAPI = require ( "../controllers/home" );

router.get ( '/' , homeAPI.home );
module.exports = router;