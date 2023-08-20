import { z } from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const imgValidation = z
  .any()
  .refine(files => {
    if (!files || !files[0] || typeof files === 'string') {
      return true
    }

    return ACCEPTED_IMAGE_TYPES.includes(files[0].type)
  }, 'The file type is not supported')
  .refine(files => {
    if (!files || !files[0] || typeof files === 'string') {
      return true
    }

    return files[0].size <= MAX_FILE_SIZE
  }, 'Max file size is 5MB.')

export const cover = z.object({
  cover: imgValidation,
})

export const password = z.object({
  password: z
    .string()
    .nonempty('The field is required')
    .min(3, 'Password must be more than 3 characters'),
})
export const email = z.object({
  email: z.string().nonempty('The field is required').email(),
})

export const name = z.object({
  name: z.string().nonempty('The field is required').min(3).max(20),
})
