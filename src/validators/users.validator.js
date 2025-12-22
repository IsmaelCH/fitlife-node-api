function hasDigits(str) {
  return /\d/.test(str);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateCreateUser(body) {
  const errors = [];

  const { firstName, lastName, email, age } = body;

  if (!isNonEmptyString(firstName)) errors.push("firstName is required");
  if (isNonEmptyString(firstName) && hasDigits(firstName)) errors.push("firstName cannot contain numbers");

  if (!isNonEmptyString(lastName)) errors.push("lastName is required");
  if (!isNonEmptyString(email)) errors.push("email is required");

  if (typeof age !== "number" || Number.isNaN(age)) errors.push("age must be a number");

  return errors;
}

function validateUpdateUser(body) {
  const errors = [];

  // En update aceptamos campos opcionales, pero si vienen, deben ser válidos
  const { firstName, lastName, email, age } = body;

  if (firstName !== undefined) {
    if (!isNonEmptyString(firstName)) errors.push("firstName cannot be empty");
    if (isNonEmptyString(firstName) && hasDigits(firstName)) errors.push("firstName cannot contain numbers");
  }

  if (lastName !== undefined && !isNonEmptyString(lastName)) errors.push("lastName cannot be empty");
  if (email !== undefined && !isNonEmptyString(email)) errors.push("email cannot be empty");

  if (age !== undefined) {
    if (typeof age !== "number" || Number.isNaN(age)) errors.push("age must be a number");
  }

  return errors;
}

module.exports = {
  validateCreateUser,
  validateUpdateUser
};
