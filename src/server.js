const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

app.use("/api/v1/tickets", require("./routes"));

app.get("/health", (_req, res) => {
  res.status(200).json({ Message: "Success" });
});

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: "Something went wrong" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});
