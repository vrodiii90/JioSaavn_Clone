import React from 'react'
import { NavLink } from 'react-router-dom'
import { GoHistory } from "react-icons/go";
import { IoIosMusicalNote } from "react-icons/io";
import { RiAlbumLine } from "react-icons/ri";
import { MdOutlinePodcasts } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { RiEnglishInput } from "react-icons/ri";
import { TfiMusicAlt } from "react-icons/tfi";
import { BiMaleFemale } from "react-icons/bi";
import { PiHandsPrayingBold } from "react-icons/pi";


const Sidebar = ({ children }) => {

  const menuItem = [
    {
      path: '/',
      name: 'Home',
      icon: <FaHome />
    },
    {
      path: 'newrelease',
      name: 'New Releases',
      icon: <MdNewReleases />
    },
    {
      path: 'toppunjabi',
      name: 'Top Punjabi',
      icon: <BsFillMusicPlayerFill />
    },
    {
      path: 'englishmusic',
      name: 'Best of English',
      icon: <RiEnglishInput />
    },
    {
      path: 'hindimusic',
      name: 'Bollywood',
      icon: <TfiMusicAlt />
    },
    {
      path: 'artists',
      name: 'Top Artists',
      icon: <BiMaleFemale />
    },
    {
      path: 'devotional',
      name: 'Devotional',
      icon: <PiHandsPrayingBold />
    },
  ]

  const menuItem1 = [
    {
      path: 'history',
      name: 'History',
      icon: <GoHistory />
    },
    {
      path: 'favsong',
      name: 'Liked Songs',
      icon: <IoIosMusicalNote />
    },
    {
      path: 'albums',
      name: 'Albums',
      icon: <RiAlbumLine />
    },
    {
      path: 'podcasts',
      name: 'Podcasts',
      icon: <MdOutlinePodcasts />
    },
    {
      path: 'artists',
      name: 'Artists',
      icon: <GiMicrophone />
    },
  ]
  return (
    <>
      <div className="container px-10 py-10 flex overflow-scroll">
        <div className="sidebar  fixed w-40 border-r-2" style={{ height: '80vh', overflow: 'auto' }}>
          <div>
            <h1 className='text-xs text-slate-500 font-semibold mb-5'>BROWSE</h1>
            {
              menuItem.map((item, index) => (
                <NavLink to={item.path} key={index} className='flex gap-2 items-center'>
                  <div className='mt-2 font-semibold text-2xl text-gray-700 '>{item.icon}</div>
                  <div className='mt-2 font-semibold text-gray-700 hover:text-black'>{item.name}</div>
                </NavLink>
              ))
            }
          </div>
          <div className=''>
            <h1 className='text-xs text-slate-500 font-semibold mb-4 mt-8'>LIBRARY</h1>
            {
              menuItem1.map((item, index) => (
                <NavLink to={item.path} key={index}>
                  <div className='flex gap-1 items-center'>
                    <div className='mt-2 font-semibold text-2xl text-gray-700 '>{item.icon}</div>
                    <div className='mt-2 font-semibold text-gray-700 '>{item.name}</div>
                  </div>

                </NavLink>
              ))
            }
          </div>
          <div className="mt-5">
            <button className=' text-teal-400 px-4 py-2 text-lg hover:text-teal-600 border-teal-400 transition-all duration-300 hover:border-teal-600 rounded-full border border-1'> + New Playlist</button>
          </div>
        </div>
        <main className='mx-36 px-10 ml-48'>{children}</main>
      </div>
    </>
  )
}

export default Sidebar
