import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function withProtect(handler) {
	return async(req, res) => {
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

export const passwordCheck = (password, options) => async (req) => {
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