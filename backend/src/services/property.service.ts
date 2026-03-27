import { Prisma } from "@prisma/client";
import prisma from "../config/db";
import { AppError } from "../utils/AppError";

const propertySelect = {
  id: true,
  title: true,
  description: true,
  price: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.PropertySelect;

type PropertyResponse = Prisma.PropertyGetPayload<{
  select: typeof propertySelect;
}>;

type ToggleFavouriteResponse = {
  action: "added" | "removed";
  propertyId: string;
};

export class PropertyService {
  static async getAllProperties(): Promise<PropertyResponse[]> {
    return prisma.property.findMany({
      select: propertySelect,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getUserFavourites(userId: string): Promise<PropertyResponse[]> {
    return prisma.property.findMany({
      where: {
        favouritedBy: {
          some: {
            userId,
          },
        },
      },
      select: propertySelect,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async toggleFavourite(
    userId: string,
    propertyId: string,
  ): Promise<ToggleFavouriteResponse> {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      select: {
        id: true,
      },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const existingFavourite = await prisma.favourite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingFavourite) {
      await prisma.favourite.delete({
        where: {
          userId_propertyId: {
            userId,
            propertyId,
          },
        },
      });

      return {
        action: "removed",
        propertyId,
      };
    }

    await prisma.favourite.create({
      data: {
        userId,
        propertyId,
      },
    });

    return {
      action: "added",
      propertyId,
    };
  }
}
