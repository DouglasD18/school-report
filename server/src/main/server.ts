import firstSeed from "../utils/first-seed/first-seed";
import app from "./config/app";
import env from "./config/env";

app.listen(env.port, async () => {
  await firstSeed();
  console.log("Server is Running!");
})
