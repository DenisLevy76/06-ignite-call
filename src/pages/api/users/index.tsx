// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { setCookie } from 'nookies'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { fullName, username } = req.body

  const isUserUnique = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (isUserUnique) {
    return res.status(400).json({
      message: 'Username already exists.',
    })
  }

  const user = await prisma.user.create({
    data: {
      fullName,
      username,
    },
  })

  const cookieExpiresIn7Days = 60 * 60 * 24 * 7 // 7 days

  setCookie({ res }, '@ignite-call:userid', user.id, {
    maxAge: cookieExpiresIn7Days,
    path: '/',
  })

  return res.status(201).json(user)
}

export default handler
