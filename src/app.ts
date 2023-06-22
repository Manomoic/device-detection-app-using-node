const express = require("express");
const cookieParser = require("cookie-parser");
const middleWare = require("./middleware/middleware");

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(middleWare());


app.get("/", (req: any, res: Response) => res.json(req.device));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
