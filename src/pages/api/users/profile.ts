import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as unstableGetServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BuildAuthOptions } from '../auth/[...nextauth]'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') return res.status(405).end()

  const session = await unstableGetServerSession(
    req,
    res,
    BuildAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return res.status(204).end()
}

export default handler
