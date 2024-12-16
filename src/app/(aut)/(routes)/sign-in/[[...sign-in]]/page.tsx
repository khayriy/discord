import { SignIn } from '@clerk/nextjs'

export default function Page() {
  try {
   
    return <SignIn />
  }
  catch (err : any) {
    
    return <p>
      Iam the error 
    </p>
  }
  
}