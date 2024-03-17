const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection succesful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//mongodb+srv://eliog28:KiU0Dd9rnGOl3uj0@goittask.ftvle7g.mongodb.net/?retryWrites=true&w=majority&appName=GoitTask