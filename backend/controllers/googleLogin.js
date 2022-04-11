const {OAuth2Client} = require("google-auth-library");
const {SECRET} = require("../config/credentials");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client(SECRET.CLIENT_ID);

module.exports.login = async function (req, res) {
  // console.log("Request Came",req.body.tokenId);
  const { tokenId } = req.body;
  client
    .verifyIdToken({ idToken: tokenId, audience: SECRET.CLIENT_ID })
    .then(async (response) => {
      // console.log(response.payload);
      if (response?.payload) {
        const { name, email, picture } = response?.payload;
        let user = await User.findOne({ email: email });
        if (user) {
          if(user.picture === ""){
            user.picture = picture;
            user = await user.save();
          }
          let tokenDetails = {
            name: user.name,
            _id: user._id,
            email: user.email,
            picture: user.picture,
          };
          return res.json(200, {
            message: "Sign up successful",
            success: true,
            data: {
              token: jwt.sign(tokenDetails, "CODEZONE2", {
                expiresIn: "28d",
              }),
              user: tokenDetails,
            },
          });
        } else {
          let user1 = User.create({ name, email, picture });
          if (user1) {
            let tokenDetails1 = {
              name: user1.name,
              _id: user1._id,
              email: user1.email,
              picture: user1.picture,
            };

            return res.json(200, {
              message: "Sign up successful",
              success: true,
              data: {
                token: jwt.sign(tokenDetails1, "CODEZONE2", {
                  expiresIn: "28d",
                }),
                user: tokenDetails1,
              },
            });
          }
        }
        return res.json(400, {
          message: "Sign up not successful",
        });
      } else {
        return res.json(400, {
          message: "Sign up not successful",
        });
      }
    });
};
