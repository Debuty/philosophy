import type { NextFunction, Request, Response } from "express";
import {
  bookIdParamSchema,
  listBooksQuerySchema,
} from "./books.schemas.js";
import * as booksService from "./books.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listBooksQuerySchema.parse(req.query);
    const result = await booksService.listBooks(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = bookIdParamSchema.parse(req.params);
    const data = await booksService.getBookById(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function updateCover(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = bookIdParamSchema.parse(req.params);
    const data = await booksService.updateBookCover(id, req.file);
    res.status(200).json({ data, message: "Book cover updated" });
  } catch (error) {
    next(error);
  }
}
