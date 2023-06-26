import express from "express";
import { router } from "./routes";
import { cors } from "./middlewares/cors";
import {resolve} from "path";

const app = express();

app.use("/tmp", express.static(resolve(__dirname, "..", "tmp")));
app.use(express.json());
app.use(cors);
app.use(router);

app.listen(3001, () => {
  console.log("Server rodando");
});
