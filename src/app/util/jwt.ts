import jwt from 'jsonwebtoken';
import config from '../../config';

type JwtPayload = {
  id: string;
  email: string;
  role: string
  // Add any other properties you include in your token
};

const secretKey = config.access_token || 'your_default_secret_key'; // Ensure this is defined

// ? Generate access token

const generateAccessToken = (payload: any) => {
  if (!config.access_token) {
    throw new Error('Access token secret is undefined');
  }

  return jwt.sign(payload, config.access_token, { expiresIn: '356d' });
};

// ? Generate refresh token

const generateRefreshToken = (payload: any) => {
  if (!config.refresh_token) {
    throw new Error('Refresh token secret is undefined');
  }

  return jwt.sign(payload, config.refresh_token, { expiresIn: '356d' });
};

// ?  Verify access token

const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey);

    // * Check if the decoded token has the expected properties

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'id' in decoded &&
      'email' in decoded
    ) {
      return decoded as JwtPayload; // Cast to JwtPayload after checking
    }

    return null; // Return null if the properties are not present
  } catch (error) {
    return null; // Return null if verification fails
  }
};

// ? Verify refresh token

const verifyRefreshToken = (token: string) => {
  if (!config.refresh_token) {
    throw new Error('Refresh token secret is undefined');
  }

  return jwt.verify(token, config.refresh_token) as JwtPayload;
};

export const jwtHelper = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
