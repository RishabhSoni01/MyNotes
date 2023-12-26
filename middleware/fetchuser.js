var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET_KEY;

const fetchuser = (req, res, next) => {
  // get the user from jwt token and append user_id to req object
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ error: "Please use a valid token" });
  }
  try {
    // here data is the payload(user_id) from which token is formed
    // here we take token from request header and then we verify with secret_key
    // and take out the payload(user_id) from token using secret_key
    // add user_id in request body

    const data = jwt.verify(token, secret);
    // when we decode jwt token we get user_id in data
    // and some extra data like iat, exp
    // iat(This stands for "Issued At.") is the time when token is issued 
    // exp(This stands for "Expiration Time.") is the time when token will expire
    // console.log("data", data);
    req.user = data.user;

    next(); // then process the next step
  } catch (error) {
    res.status(401).send({ error: "Please use a valid token" });
  }
};

module.exports = fetchuser;
