const { admin } = require("../../firebase-admin");
const userModel = require("../../model/userModel");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const [scheme, token] = authHeader.split(" ");

    admin
      .auth()
      .verifyIdToken(token)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;
        console.log(uid);
        let userData = await userModel.getUserDataByID(uid);

        let role = userData?.role;

        if (role === "Supervisor") {
          next();
        } else {
          res.json({
            message: "Error",
            status: false,
            desc: "Unautherized action",
          });
        }
      });
  } catch (err) {
    res.json({ message: "Error", status: false, desc: "Invalid token" });
  }
};

module.exports = { verifyToken };
