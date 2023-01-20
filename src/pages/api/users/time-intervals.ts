import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession as unstableGetServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { BuildAuthOptions } from '../auth/[...nextauth]'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const session = await unstableGetServerSession(
    req,
    res,
    BuildAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval) => ({
      time_end_in_minutes: interval.endTimeInMinutes,
      time_start_in_minutes: interval.startTimeInMinutes,
      weekDay: interval.weekDay,
      user_id: session.user.id,
    })),
  })

  return res.status(201).end()
}

export default handler
