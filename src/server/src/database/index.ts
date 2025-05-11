import { SQL } from "bun";

const db = new SQL({
  url: Bun.env.POSTGRES_URL, //Bun doesnt default to the env during tests
});
