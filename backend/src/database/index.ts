import colors from "ansi-colors";
import { connect, Connection, connection } from "mongoose";
import dotenv from "dotenv";
import { dbUri } from "../constants";
dotenv.config();

const uri: string = dbUri + "";

connect(uri);

const db: Connection = connection;

db.on("open", (): void => {
  console.log(colors.bgCyan("\tConnected to the database successfully"));
});

db.once("error", (): void => {
  console.error(
    colors.red("\tThere was some problem connecting to the database")
  );
});
