import app from "./app";
import { config } from "./config/env";
import { globalErrorHandler } from "./middleware/error.middleware";

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
