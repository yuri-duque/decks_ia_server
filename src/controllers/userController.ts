import { Request, Response, Router } from "express";
import UserService from "../services/userService";

const router = Router();
const userService = new UserService();

router.post("/user", async (req: Request, res: Response) => {
  try {
    // #swagger.tags = ['User']

    const { name, email, password, confirmPassword } = req.body;

    await userService.create({ name, email, password, confirmPassword });

    res.status(200).send("OK");
  } catch (error) {
    res.error(error as Error, "Error to get users");
  }
});

export default router;
