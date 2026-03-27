import { FavouriteSchema } from "../generated/zod";
import { z } from "zod";

export const toggleFavouriteSchema = z.object({
  body: FavouriteSchema.pick({
    propertyId: true,
  }).extend({
    propertyId: z.string().uuid("Invalid Property Id"),
  }).strict(),
});
