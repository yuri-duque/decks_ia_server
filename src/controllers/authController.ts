import { Request, Response, Router } from "express";
import AuthService from "../services/authService";
import { auth } from "../middlewares/authMiddleware";

const router = Router();
const authService = new AuthService();

router.post("/login", auth, async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Login']

    const { email, password } = req.body;

    authService.login({ email, password });

    res.status(200).send("OK");
  } catch (error) {
    res.error(error as Error, "Error to get users");
  }
});

export default router;
