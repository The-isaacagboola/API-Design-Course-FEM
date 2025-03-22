import prisma from "../lib/prisma";
import { comparePassword, createJwt, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error("Please provide a username and password");
  } /* It is adviceable to make this a middleware to check for valid input fields like username and password */

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    const token = createJwt({ username: newUser.username, id: newUser.id });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error creating User",
    });
  }
};

export const signin = async (req, res) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        message: `User with username: ${username} not found`,
      });
    }

    const valid = await comparePassword(password, user.password);

    if (!valid)
      return res
        .status(400)
        .json({ message: "Incorrect Password. Check and try again" });

    const token = await createJwt({ id: user.id, username: user.username });
    req.headers["authorization"] = `Bearer ${token}`;
    res.status(201).json({
      message: "User Signed in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
