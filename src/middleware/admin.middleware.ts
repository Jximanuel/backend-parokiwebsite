import { Response, NextFunction } from "express"
import { AuthRequest } from "./user.middleware"

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Belum login" })
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses admin ditolak" })
  }

  next()
}
