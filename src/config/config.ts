import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });


const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  DB: {
    url: envVars.DATABASE_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
  }
};

export default config;