import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import { toggleFavouriteSchema } from "../schemas/property.schema";

const router = Router();

router.use(protect);

router.get("/", PropertyController.getAllProperties);
router.get("/my-favourites", PropertyController.getUserFavourites);
router.post(
  "/toggle-favourite",
  validate(toggleFavouriteSchema),
  PropertyController.toggleFavourite,
);

export default router;
