/**
 * Return a box that contain a title and content
 * @param {string} title
 * @param {string} content 
 * @returns 
 */
function Description({title, content}) {
  return (
    <div className='p-4'>
        <h1 className='uppercase font-semibold text-xl mb-1'>{title}</h1>
        <p className='text-justify'>{content}</p>
    </div>
  )
}

export default Description
