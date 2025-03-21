import rateLimiter from "express-rate-limit";

const reqLimit = Number(process.env.REQ_LIMIT) || 5;
const windowMs = Number(process.env.REQ_MS) || 60000;

const LimiterHandler = rateLimiter({
  windowMs,
  limit: reqLimit,
  message: "You can't make any more request at the moment. Try again later.",
});

export default LimiterHandler;
