import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../App'
import { FaRegHeart } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlay } from "react-icons/fa6";

const TopPunjabi = () => {

  const { songs, playPause } = useContext(MainContext)

  let [punjabi, setPunjabi] = useState([])

  useEffect(() => {
    let PUN = songs.filter((x) => x.language == 'Punjabi')
    setPunjabi(PUN)
  }, [])

  return (
    <>
      <div>
        <h3 className='text-xl font-semibold text-slate-700'>Punjabi Music</h3>
        <div className='py-10 grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-8'>
          {
            punjabi.map((x) => {
              return (
                <div key={x.id} className="songs relative group cursor-pointer">
                  <img className='group' src={x.audioImg} alt="" />
                  <h3 className='truncate font-semibold text-slate-700'>{x.name}</h3>
                  <h3 className='truncate text-xs'>{x.singers}</h3>
                  <div className='invisible group-hover:visible transition-all duration-500'>
                    <div className='absolute top-12 left-14 text-4xl'>
                      <FaPlay onClick={() => playPause(x.id)} className='hover:scale-125 text-white px-2 py-2 rounded-full bg-gray-900' />
                    </div>
                    <div className=' text-white text-xl'>
                      <FaRegHeart className='absolute top-[62%] left-2' />
                      <HiDotsHorizontal className='absolute top-[62%] right-2' />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default TopPunjabi
