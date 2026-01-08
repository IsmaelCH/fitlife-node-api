function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateCreateWorkout(body) {
  const errors = [];

  const { title, description, durationMinutes, userId } = body;

  if (!isNonEmptyString(title)) errors.push("title is required");
  
  // description is optional, but if provided must be non-empty
  if (description !== undefined && description !== null && !isNonEmptyString(description)) {
    errors.push("description cannot be empty if provided");
  }

  if (typeof durationMinutes !== "number" || Number.isNaN(durationMinutes)) {
    errors.push("durationMinutes must be a number");
  }

  if (typeof userId !== "number" || Number.isNaN(userId)) {
    errors.push("userId must be a number");
  }

  return errors;
}

function validateUpdateWorkout(body) {
  const errors = [];

  const { title, description, durationMinutes, userId } = body;

  if (title !== undefined && !isNonEmptyString(title)) errors.push("title cannot be empty");
  if (description !== undefined && !isNonEmptyString(description)) errors.push("description cannot be empty");

  if (durationMinutes !== undefined) {
    if (typeof durationMinutes !== "number" || Number.isNaN(durationMinutes)) {
      errors.push("durationMinutes must be a number");
    }
  }

  if (userId !== undefined) {
    if (typeof userId !== "number" || Number.isNaN(userId)) {
      errors.push("userId must be a number");
    }
  }

  return errors;
}

module.exports = {
  validateCreateWorkout,
  validateUpdateWorkout
};
