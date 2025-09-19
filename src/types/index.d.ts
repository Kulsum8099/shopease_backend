/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { User } from './path/to/your/user/model'; // Adjust the import path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property to the Request interface
    }
  }
}
