import express, { Application, json } from "express";
import helmet from "helmet";
import cors from "cors";
import Logger from "@infra/service/logger/winston";
import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './swagger.config';
import YAML from 'yamljs';
import path from 'path';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';

const app: Application = express();

app.use(json());
app.use(helmet());
app.use(cors());

const swaggerDocument = YAML.load(path.resolve(__dirname, 'swagger.yaml'));

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const shutdown = (signal: string) => {
  return (err?: Error) => {
    if (err) Logger.error(`Erro recebido: ${err.message}`, err);

    Logger.info(`Recebido sinal ${signal}. Fechando servidor...`);

    process.exit(err ? 1 : 0);
  };
};

process.on("SIGTERM", shutdown("SIGTERM"));
process.on("SIGINT", shutdown("SIGINT"));

process.on("uncaughtException", shutdown("uncaughtException"));
process.on("unhandledRejection", shutdown("unhandledRejection"));

export { app };
