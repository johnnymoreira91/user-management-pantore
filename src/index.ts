import { app } from "@infra/server";
import Logger from "@infra/service/logger/winston";
import { ENV } from "@infra/config/params";
import ip from "ip";

app.listen(3001, () => {
  Logger.info("Server ON");
  Logger.info(`Server is running on http://${ip.address()}:${ENV.PORT}`);
});
