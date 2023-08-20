export type meResponse = {
  email: string
  name: string
  id: string
  isEmailVerified: boolean
  avatar: string
  created: string
  updated: string
}

export type signUpArgs = {
  html?: string
  name?: string
  password: string
  email: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type signUpResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type updateUserDataArgs = {
  avatar?: File
  email?: string
  name?: string
}
// export type updatePhotoArgs = {
//   avatar?: File
//   email?: string
//   name?: string
// }
