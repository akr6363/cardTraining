import { z } from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const cover = z.object({
  cover: z
    .any()
    .refine(
      files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
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
