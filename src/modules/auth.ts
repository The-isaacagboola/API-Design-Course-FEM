import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const createJwt = (user: { id: string; username: string }) => {
  const token = jwt.sign(user, process.env.JWT_SCRET);

  return token;
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  const [_, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({
      message: "Provided token is incorrect",
    });
  }
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
