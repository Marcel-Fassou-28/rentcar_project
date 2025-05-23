import { Settings } from "lucide-react"
import SidebarClient from "./SidebarClient"

function Setting() {
  return (
    <div className="pt-16 flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
        <SidebarClient />
        <main className="flex-1 p-6">
            <div className=" bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6  text-white mx-auto my-4 w-[95%]">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Settings</h1>
                        <p className="text-orange-100">Gérer votre compte !!</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                        <div className="bg-white text-orange-600 p-2 rounded-full">
                        <Settings size={24} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                
            </div>

        </main>
    </div>
  )
}

export default Setting
