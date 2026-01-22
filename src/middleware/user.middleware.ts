import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ msg: "authorization header missing" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "token missing" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthRequest["user"];

    req.user = decoded; // ✅ INI PENTING
    next();             // lanjut ke controller
  } catch (error) {
    return res.status(403).json({ msg: "invalid or expired token" });
  }
};

export default userMiddleware;
