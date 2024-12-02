import express, { Application, json } from "express";
import helmet from "helmet";
import cors from "cors";
import Logger from "@infra/service/logger/winston";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';

const app: Application = express();

app.use(json());
app.use(helmet());
app.use(cors());
app.use(express.static(path.resolve(process.cwd(), 'public')));

const swaggerDocument = YAML.load(path.resolve(process.cwd(), 'public/swagger.yaml'));
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerUrl: '/swagger.yaml',
}));


app.use('/users', userRoute);
app.use('/auth', authRoute);

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
