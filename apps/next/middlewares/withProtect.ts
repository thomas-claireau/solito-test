import { NextApiRequest, NextApiResponse } from "next";

const cookie = require('cookie');
const jwt = require('jsonwebtoken');

interface OptionsObject {
	cookieName: string;
}

export default function withProtect(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
	return async(req: NextApiRequest, res: NextApiResponse) => {
		const check = await passwordCheck(process.env.NEXT_PASSWORD);
		const checkRes = await check(req, res);
		if (!checkRes) {
			res.statusCode = 401;
			res.end(JSON.stringify({ error: "Unauthorized" }));
			return;
		}

		await handler(req, res);
	}
}

export const passwordCheck = (password: String, options?: OptionsObject) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      throw new Error("Invalid method.");
    }

    if (req?.headers?.cookie) {
      const cookies = cookie.parse(req.headers.cookie);
      const cookieName = options?.cookieName || "next-password-protect";
      jwt.verify(cookies?.[cookieName], password);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};