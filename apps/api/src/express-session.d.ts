import "express-session";

declare module "express-session" {
  interface SessionData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expiry: any;
    user?: { email: string, role: string, name: string };
  }
}
