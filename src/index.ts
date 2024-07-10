import config from "./config/config";
import app from './app';
import { prismaClient } from "./client/prisma";

const PORT = config.port;

prismaClient.$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process with failure
  });

