import dotenv from 'dotenv'
// config env
dotenv.config()

const config = {
  // server
  port: process.env.PORT || 6969,

  // database
  dbUri: process.env.MONGODB_URI || '',
  defaultAvatar: process.env.DEFAULT_AVATAR || '',

  // jwt
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || '',
  refreshTokenTtl: '2d',

  // bcrypt
  saltWorkFactor: 10,
}

export default config
