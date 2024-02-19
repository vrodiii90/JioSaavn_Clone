import React, { useContext } from 'react'
import { MainContext } from '../App'
import { FaPlay } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

const SearchSongs = () => {

    const {filterItems, playPause,isFav, addtoFavlist} = useContext(MainContext)

    return (
        <>
            <div>
                <h3 className='text-xl font-semibold text-slate-700'>Searched Songs</h3>
                <div className='dashboard py-10 grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-8'>
                    {
                        filterItems.map((x) => {
                            return (
                                <div key={x.id} className="songs relative group cursor-pointer">
                                    <img className='group md:w-40' src={x.audioImg} alt="" />
                                    <h3 className='truncate font-semibold text-slate-700'>{x.name}</h3>
                                    <h3 className='truncate text-xs'>{x.singers}</h3>
                                    <div className='invisible group-hover:visible transition-all duration-500'>
                                        <div className='absolute top-12 left-14 text-4xl'>
                                            <FaPlay onClick={() => playPause(x.id)} className='hover:scale-125 text-white px-2 py-2 rounded-full bg-gray-900' />
                                        </div>
                                        <div className='text-xl'>
                                            <FaHeart onClick={() => addtoFavlist(x.id)} color={isFav ? 'red' : 'white'} className='absolute top-[62%] left-2 text-red-500' />
                                            <HiDotsHorizontal className='absolute top-[62%] right-2 text-white' />
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

export default SearchSongs