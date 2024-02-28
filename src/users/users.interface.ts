export interface User {
  _id: String,
  email: String,
  password_hash: String,
  nickname: String,
  avatar_url: String,
  signature: String,
  personal_info: {
    gender: String,
    age: Number,
    location: String,
    bio: String
  },
  devices: Array<any>,
  sports_data: {
    daily: Array<any>,
    total: Object
  },
  interactions: Array<any>,
  system_messages: Array<any>,
  following: Array<any>,
  blocked: Array<any>,
  posts: Array<any>,
}