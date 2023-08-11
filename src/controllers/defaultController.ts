import { Request, Response, Router } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger/swagger_output.json";

const router = Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

router.get("/api/health", (request: Request, response: Response) => {
  response.status(200).send("OK");
});

export default router;
