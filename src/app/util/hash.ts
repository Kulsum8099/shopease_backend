import bcrypt from 'bcryptjs';

// ? Hashing a password

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Number of salt rounds
  return await bcrypt.hash(password, saltRounds);
};

// ? Comparing hashed password

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
