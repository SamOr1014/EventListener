import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import type { Schema } from "joi"

export const validateMiddleware =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "invalid input" })
      return
    }

    next()
  }
