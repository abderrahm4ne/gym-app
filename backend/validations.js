export function validateMemberData(data) {
  const requiredFields = [
    "firstname",
    "lastname",
    "membership",
    "phonenumber",
    "monthsOfMemberShips",
    "endDate",
  ];

  const missing = requiredFields.filter((field) => !data[field]);

  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missing.join(", ")}`,
    };
  }

  if (isNaN(Number(data.monthsOfMemberShips))) {
    return {
      valid: false,
      error: "monthsOfMemberShips must be a number.",
    };
  }

  return { valid: true };
}
