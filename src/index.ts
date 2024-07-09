import config from "./config/config";
import app from './app';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
