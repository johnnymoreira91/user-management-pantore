import { app } from "@infra/server";
import Logger from "@infra/service/logger/winston";

app.listen(3001, () => {
  Logger.info("Server ON");
});
