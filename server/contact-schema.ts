import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom.').max(100, 'Le nom est trop long.'),
  email: z.string().trim().max(254, 'Adresse email trop longue.').email('Adresse email invalide.'),
  subject: z.string().trim().min(3, 'L’objet doit contenir au moins 3 caractères.').max(160, 'L’objet est trop long.'),
  message: z.string().trim().min(10, 'Le message doit contenir au moins 10 caractères.').max(5000, 'Le message est trop long.'),
  website: z.string().max(200).optional(),
})

export type ContactMessage = z.infer<typeof contactSchema>
