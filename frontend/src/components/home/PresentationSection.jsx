import Description from '../common/Description'
import DescriptionPicture from './../../assets/Vehicule/description.webp'

function PresentationSection() {
  return (
    <div className="bg-white pt-0 mt-0 px-16 pb-8">
      <div className="py-10">
        <h1 className="uppercase text-4xl font-semibold pb-2">
            <span className="text-orange-500 tracking-wide">rent car</span>: louez l'excellence, Vivez le confort.<br />
            Découvrez le luxe, le confort et la liberté dès votre première réservation.
        </h1>
        <hr className="w-24 h-1 my-3 bg-black border-0 rounded-sm md:my-10"/>
      </div>

      {/* Description de l'entreprise */}
      <div className="flex flex-col gap-3 md:gap-2 md:flex-row align-top">
        <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 gap-2">
            <div className="col-span-2 p-4 text-justify font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum cumque quisquam repellendus nostrum. Necessitatibus sunt delectus similique excepturi animi debitis dolorem illo quibusdam rerum minus deleniti laudantium quasi expedita, dolores architecto explicabo adipisci ducimus quaerat maxime praesentium labore quam assumenda enim. Unde veritatis vel officia repellat quis dolores praesentium.</div>
            <Description title='qualité' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam magni expedita ducimus, ratione nulla consequuntur!' />
            <Description title='flexibilité' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam magni expedita ducimus, ratione nulla consequuntur!' />
            <Description title='disponibilité' content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam magni expedita ducimus, ratione nulla consequuntur!' />
        </div>
        <div className='p-4'>
            <img src={DescriptionPicture} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PresentationSection
