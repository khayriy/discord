import NavigationSidebar from '@/components/navigation-sidebar'
import { ModalProviders } from '@/components/providers/modal-providers'
import {ReactNode} from 'react'
const MainLayout = async ({children} : { children : ReactNode}) => {
  return (
    <div className='h-full overflow-visible'>
        <div className="md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 ">
        <NavigationSidebar />
        </div>
        <main className='md:pl-[72px] h-full'>
        
         {children}
        </main>
       
    </div>
  )
}

export default MainLayout