import Razorpay from "razorpay"
import { NextResponse, NextRequest } from "next/server"


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string
})

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "USD",
      receipt: `receipt_${Date.now()}`
    })
    return NextResponse.json(
      { orderID: order.id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error occuring order", error)
    return NextResponse.json(
      { error: "Error occuring order" },
      { status: 500 }
    )
  }
}


