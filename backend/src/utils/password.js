import bcrypt from "bcryptjs";

export const verifyPassword = (reqPassword, hashedPassword) => {
  return bcrypt.compare(reqPassword, hashedPassword);
};

export const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
