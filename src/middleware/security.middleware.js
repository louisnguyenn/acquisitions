import aj from '#config/arcjet.js';
import logger from '#config/logger.js';
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
  try {
    // Process the request through Arcjet middleware
    const role = req.user?.role || 'guest';

    let limit;
    let message;

    // Set different rate limits based on user role
    switch (role) {
      case 'admin':
        limit = 20;
        message = 'Admin request limit exceeded (20 per minute). Slow down.';
        break;
      case 'user':
        limit = 10;
        message = 'User request limit exceeded (10 per minute). Slow down.';
        break;
      case 'guest':
        limit = 5;
        message = 'Guest request limit exceeded (5 per minute). Slow down.';
        break;
    }

    // Create a client with sliding window rule based on role
    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        name: `${role}-rate-limit`,
      })
    );

    const decision = await client.protect(req);

    // IThis if statement checks if the request is denied due bot detection
    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Automated requests are not allowed',
      });
    }

    // This if statement checks if the request is denied due to shield rules
    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield block request', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by security policy',
      });
    }

    // This if statement checks if the request is denied due to rate limiting
    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res.status(429).json({
        error: 'Too many requests',
        message,
      });
    }

    next();
  } catch (error) {
    console.error('Security middleware error:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error', message: error.message });
  }
};

export default securityMiddleware;
