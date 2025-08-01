import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const AdminLayout = () => {
   return (
      <div className="font-inter text-secondary bg-gray-50 flex flex-row h-screen">
         <Sidebar />

         <main className="flex-1 flex flex-col p-8 overflow-x-hidden overflow-y-auto">
            <div className="h-16 md:hidden" />
            <Outlet />
         </main>
      </div>
   )
}
export default AdminLayout
