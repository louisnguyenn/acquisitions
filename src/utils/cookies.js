export const cookies = {
  // default cookie options
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  }),
  // set a cookie
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },
  // clear a cookie
  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookies.getOptions(), ...options });
  },
  // get a cookie
  get: (req, name) => req.cookies[name],
};
