import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'local'),
  PORT: Joi.number().default(3000),
  DB_URL: Joi.string().required(),
});
