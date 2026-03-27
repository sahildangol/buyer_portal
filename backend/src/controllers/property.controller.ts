import { NextFunction, Request, Response } from "express";
import { PropertyService } from "../services/property.service";
import { AppError } from "../utils/AppError";
import { successResponse } from "../utils/successResponse";

const getAuthenticatedUserId = (req: Request): string => {
  if (!req.user?.id) {
    throw new AppError("Unauthorized", 401);
  }

  return req.user.id;
};

export class PropertyController {
  static async getAllProperties(req: Request, res: Response, next: NextFunction) {
    try {
      const properties = await PropertyService.getAllProperties();

      return successResponse(res, 200, "Properties fetched successfully", {
        properties,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getUserFavourites(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getAuthenticatedUserId(req);
      const favourites = await PropertyService.getUserFavourites(userId);

      return successResponse(res, 200, "Favourites fetched successfully", {
        favourites,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async toggleFavourite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = getAuthenticatedUserId(req);
      const { propertyId } = req.body as { propertyId: string };

      const result = await PropertyService.toggleFavourite(userId, propertyId);
      const message =
        result.action === "added"
          ? "Property added to favourites"
          : "Property removed from favourites";

      return successResponse(res, 200, message, result);
    } catch (error) {
      return next(error);
    }
  }
}
