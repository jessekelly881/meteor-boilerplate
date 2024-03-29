import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

/**
 * createValidator
 * @desc Given a JSON schema, returns a validator for the schema.
 */
function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

export default createValidator;
