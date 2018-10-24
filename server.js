const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ msg: "Hello on Cup Shop" }));

const app = express();
app.use(router);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
