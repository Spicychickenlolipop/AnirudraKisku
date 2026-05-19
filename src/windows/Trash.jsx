// import { WindowControls } from '#components'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useLocationStore from '#store/location'
import { useEffect } from 'react'
import { Trash2 } from 'lucide-react' // ✅ fixed import
import { WindowControls } from '#components';

const Trash = () => {
  const { setActiveLocation } = useLocationStore()

  useEffect(() => {
    // set active location to trash when opened
    setActiveLocation(locations.trash)
  }, [setActiveLocation])

  return (
    <section className="w-[700px] h-[450px] flex flex-col">

      {/* ✅ HEADER */}
      <div
        id='window-header'
        className="flex items-center gap-3 p-2 bg-gray-200 relative"
      >
        <WindowControls target="trash" />

        <Trash2 size={18} className='text-gray-600' />

        {/* ✅ perfectly centered title */}
        <h2 className="absolute left-1/2 -translate-x-1/2 pointer-events-none font-medium">
          Trash
        </h2>
      </div>

      {/* ✅ BODY */}
      <div className='flex bg-white flex-1 overflow-hidden'>
        
        {/* SIDEBAR */}
        <div className='sidebar p-2'>
          <h2 className="text-sm font-semibold mb-2">Favorites</h2>

          <ul>
            <li className='flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-blue-100 text-blue-700'>
              <img
                src={locations.trash.icon}
                className='w-4'
                alt='Trash'
                loading='lazy'
              />
              <p className='text-sm font-medium truncate'>
                {locations.trash.name}
              </p>
            </li>
          </ul>
        </div>

        {/* CONTENT */}
        <ul className='content flex-1 p-4 grid grid-cols-3 gap-4 overflow-y-auto'>
          
          {(locations.trash.children || []).map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <img src={item.icon} alt={item.name} className="w-10 h-10" />
              <p className="text-sm text-center">{item.name}</p>
            </li>
          ))}

        </ul>
      </div>
    </section>
  )
}

const TrashWindow = WindowWrapper(Trash, 'trash')

export default TrashWindow