import Razorpay from "razorpay"
import { NextResponse ,NextRequest } from "next/server"
import { console } from "inspector"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string 
})

export async function route (request: NextRequest) {
  try {
    const order = await razorpay.orders.create({
      amount : 100 * 100 as number,
      currency : "INR" as string,
      receipt : "receipt" as string  
    })

    return NextResponse.json(
        {orderID: order.id},
        {status: 200}
    )

} catch (error) {
    console.error("Error occuring order",error)
    return NextResponse.json(
        {error : "Error occuring order"},
        {status : 500}
    )
}


    return (
    <div>
      
    </div>
  )
}


