import { SignIn } from '@clerk/nextjs'

export default function Page() {
  try {
    console.log('atru you sign')
    return <SignIn />
  }
  catch (err : any) {
    console.log('atru you here')
    return <p>
      Iam erro
    </p>
  }
  
}