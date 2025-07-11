// app/api/products/add/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, price, categoryId , imageUrl} = body

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        imageUrl
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Если нужно обрабатывать другие методы, добавьте: