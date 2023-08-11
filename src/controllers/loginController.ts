import { Request, Response, Router } from "express";
import LoginService from "../services/loginService";

const router = Router();
const loginService = new LoginService();

router.post("/login", async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['Login']

    const { email, password } = req.body;

    loginService.login({ email, password });

    res.status(200).send("OK");
  } catch (error) {
    res.error(error as Error, "Error to get users");
  }
});

export default router;
