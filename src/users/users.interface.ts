export interface User<T> {
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
  devices: Array<T>,
  sports_data: {
    daily: Array<T>,
    total: Object
  },
  interactions: Array<T>,
  system_messages: Array<T>,
  following: Array<T>,
  blocked: Array<T>,
  posts: Array<T>,
}