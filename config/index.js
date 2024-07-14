const { env } = process;

const config = {
  port: +env.PORT || 8567,
  jwtSecretKey: env.JWT_SECRET_KEY,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
};

module.exports = config;
