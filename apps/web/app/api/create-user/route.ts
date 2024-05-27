import { prisma } from '@repo/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'



export async function POST(request: NextRequest) {
  const { email, name, password } = (await request.json()) as {
    email: string
    name: string
    password: string
  }
  console.log('be email', email)
  debugger;
  const user = await prisma.apiUser.create({
    data: {
      email,
      name,
      password
    }
  })

  return NextResponse.json({ success: true, data: user }, { status: 200 })
}

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  console.log(session)

  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { email: String(session?.user?.email) } })

  return NextResponse.json({ success: true, data: user }, { status: 200 })

}