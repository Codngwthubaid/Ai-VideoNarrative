import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className='flex justify-center items-center py-8'>
      <SignUp />
    </section>
  )
}