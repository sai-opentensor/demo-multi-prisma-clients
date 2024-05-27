import { prisma } from '@repo/database';
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

  const user = await prisma.apiUser.findUnique({
    where: {
      email: 'skiran017@gmail.com'
    }
  })
  return NextResponse.json({ success: true, data: user }, { status: 200 })

}