import { Mail, Phone } from "lucide-react"
import GoogleMap from "../common/GoogleMap"

function Contact() {
  return (
    <div className="flex flex-col px-20 pt-24 justify-center items-center mx-auto pb-4">
      <div className="flex flex-col lg:flex-row w-full h-full justify-between">
        <div className="flex flex-col gap-4 lg:w-[65%]">
            <div className="pb-4">
                <h1 className="uppercase font-bold text-black text-3xl">Contactez nous</h1>
                <p className="font-light">L'équipe <span>rentcar</span> est disponible pour répondre à toutes vos questions</p>
            </div>
            <hr className="w-12 bg-orange-600 h-1 lg:w-16 rounded border-none" />
            <form action="" className="flex flex-col gap-4 lg:grid lg:grid-cols-3 pt-8">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="nom" className="uppercase font-semibold">Nom</label>
                    <input type="text" name="nom" id="nom" className="border py-1 px-4 lg:border-x-0 lg:border-t-0 focus:outline-none transition-all duration-300 focus:border-orange-500" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="uppercase font-semibold">Email</label>
                    <input type="email" name="email" id="email" className="border py-1 px-4 lg:border-x-0 lg:border-t-0 focus:outline-none transition-all duration-300 focus:border-orange-500"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="uppercase font-semibold">téléphone</label>
                    <input type="text" name="phone" id="phone" className="border py-1 px-4 lg:border-x-0 lg:border-t-0 focus:outline-none transition-all duration-300 focus:border-orange-500" />
                </div>
                <div className="flex flex-col gap-2 lg:col-span-3">
                    <label htmlFor="message" className="uppercase font-semibold">Message</label>
                    <textarea name="message" id="message" className="border resize-y h-28 lg:border-x-0 lg:border-t-0 focus:outline-none transition-all duration-300 focus:border-orange-500"></textarea>
                </div>
                <div className="lg:col-span-1"><button type="submit" className="bg-orange-500 uppercase text-white font-semibold text-xl p-2 rounded transition duration-200 hover:bg-orange-600">envoyer message</button></div>
            </form>
        </div>
        <div className="rounded flex gap-4 flex-col p-8 lg:w-[30%] lg:mt-6 mt-16 border border-orange-600">
            <div className="w-full">
                <select name="" id="" className="px-2 w-full py-2 font-light text-gray-400 border">
                    <option value="" selected>Selectionnez lieu de depart</option>
                </select>
            </div>
            <div className="w-full">
                <select name="" id="" className="px-2 w-full py-2 font-light text-gray-400 border">
                    <option value="" selected>Selectionnez lieu de depart</option>
                </select>
            </div>
            <div>
                <input type="datetime" name="debut" id="" className="w-[95%] px-2 py-2 border " placeholder="18-05-2025 10:36" />
            </div>
            <div>
                <input type="datetime" name="debut" id="" className="w-[95%] px-2 py-2 border" placeholder="18-05-2025 10:36"/>
            </div>
            <div>
                <button type="submit" className="bg-orange-500 text-xl p-2 rounded transition duration-200 hover:bg-orange-600 uppercase text-white font-semibold ">Chercher</button>
            </div>
            <hr className="w-full"/>
            <div className="flex flex-col gap-1">
                <p className="font-semibold text-xl flex flex-row gap-1"><Phone className="text-orange-500" />0123456789 / 0123456789</p>
                <a className="font-semibold text-lg flex flex-row gap-1" href="mailto:contact@rentcar.ma"><Mail className="text-orange-500"/>contact@rentcar.ma</a>
            </div>
        </div>
      </div>

      {/* Localisation via map de la localisation du l'entreprise */}
      <div>
        <GoogleMap />
      </div>
    </div>
  )
}

export default Contact
