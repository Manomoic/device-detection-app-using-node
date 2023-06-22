const express = require("express");
import { middleWare } from "./Middleware/middleware";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(middleWare());

app.get("/", (req: any, res: Response) => {
  res.json(req.device);
  console.log(req.device);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
