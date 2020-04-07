exports.dbSettings = {
  MONGO_USERNAME, 
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

exports.serverSettings = {
  port: process.env.PORT || 3000
};

exports.security = {
  secretKey: '12345-67890-09876-54321',
  facebook: {
      clientId: '1034092406940238',
      clientSecret: '883af7b00c8352e75df6a05d366dce99'
    }
};
