import type { Response } from "express"

export const successResponse = (res: Response, message: string) => {
    return res.status(200).json({
        message,
        success: true
    })
}

export const errorResponse = (res: Response, error: unknown) => {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        message: "Unknown Internal Server Error",
      });
    }
};