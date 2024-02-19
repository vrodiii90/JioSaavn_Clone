import React, { useContext, useEffect, useState } from 'react'
import { FaRepeat } from "react-icons/fa6";
import { FaBackwardStep } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { BsArrowsAngleContract } from "react-icons/bs";
import { MainContext } from '../App';
import { FaPause } from "react-icons/fa";
import { BsShuffle } from "react-icons/bs";
import Songs from './AllSongs';


const MusicPlayer = ({ isPlaying, audioRef, formatTime }) => {

    const { navigate,
        playPause,
        currentTime,
        duration,
        currentSong,
        repeat,
        setRepeat,
        changeCurrentTime,
        setCurrentSong,
        songs,
        setsongs
    } = useContext(MainContext)
    const [arrows, setArrows] = useState(false)
    const [volume, setVolume] = useState(50)
    const [isMute, setMute] = useState()
    const [isShuffle, setIsShuffle] = useState(false)


    const navigateHome = () => {
        navigate(-1)
    }

    let shuffledArr = (songs) => {
        for (let i = songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const shu = songs[i]
            songs[i] = songs[j]
            songs[j] = shu;
        }
        return songs
    }

    const newArray = () => {
        setIsShuffle((state) => {
            let changed = !state
            return changed
        })
    }
    useEffect(() => {
        if (isShuffle) {
            setsongs(shuffledArr(songs))
        } else {
            let realSongs = songs.sort((a, b) => a.id - b.id)
            setsongs(realSongs)
        }
    }, [isShuffle])


    const PrevSong = () => {
        const index = songs.findIndex((x) => x.name == currentSong.name)

        if (index == 0) {
            setCurrentSong(songs[songs.length - 1])
        }
        else {
            setCurrentSong(songs[index - 1])
        }
        audioRef.current.currentTime = 0;
    }

    const NextSong = () => {
        const index = songs.findIndex((x) => x.name == currentSong.name)

        if (index == songs.length - 1) {
            setCurrentSong(songs[0])
        }
        else {
            setCurrentSong(songs[index + 1])
        }
        audioRef.current.currentTime = 0;
    }

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = isMute

        }
    }, [volume, isMute])


    return (
        <>
            <div className="container px-2 py-2 border-gray-400 h-20 fixed bottom-0 bg-gray-100 flex justify-between items-center ">
                <div className='absolute -top-4 w-full -ml-2'>
                    <input type="range" value={currentTime} max={duration} step='0.25' onChange={(e) => changeCurrentTime(e)} name="" className='range cursor-pointer text-teal-600 w-full  accent-teal-600' />
                </div>
                <div className="flex gap-2 items-center w-[30%] ">
                    <img className='w-16' src={currentSong.audioImg} alt="Error" />
                    <div className='w-52 mx-2'>
                        <h3 className='text-md font-semibold text-teal-600'>{currentSong.name}</h3>
                        <div>
                            <h3 className='truncate text-sm text-teal-600'>{currentSong.album}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex gap-10 items-center text-2xl">
                    <FaRepeat color={repeat ? 'teal' : 'gray'} onClick={() => setRepeat((prev) => !prev)} className='invisible xl:visible lg:visible md:visible cursor-pointer text-gray-700 hover:text-gray-500' />
                    <FaBackwardStep onClick={() => PrevSong()} className='cursor-pointer text-gray-700 hover:text-gray-500 invisible xl:visible lg:visible md:visible' />
                    <button className='cursor-pointer text-gray-700 hover:text-gray-500' onClick={() => playPause(currentSong.id)}>
                        {
                            !isPlaying || currentTime == duration ? <FaPlay /> : <FaPause />
                        }
                    </button>
                    <FaStepForward onClick={() => NextSong()} className='cursor-pointer text-gray-700 hover:text-gray-500 invisible xl:visible lg:visible md:visible' />
                    {
                        isShuffle ? <BsShuffle onClick={newArray} className='text-teal-600 cursor-pointer invisible xl:visible lg:visible md:visible' /> : <FaShuffle onClick={newArray} className='text-gray-600 cursor-pointer invisible xl:visible lg:visible md:visible' />
                    }
                </div>
                <div className="flex gap-10 mr- items-center invisible xl:visible lg:visible md:visible ">
                    <h3 className='text-xs'> {formatTime(currentTime)} / {formatTime(duration)} </h3>
                    <HiDotsHorizontal className='text-2xl cursor-pointer text-gray-700 hover:text-gray-500' />
                    <button onClick={() => setMute((prev) => !prev)}>
                        {
                            isMute || volume <= 0 ? <FaVolumeMute onClick={() => setVolume(50)} className='group text-2xl cursor-pointer text-gray-700 hover:text-gray-500' /> : <FaVolumeUp onClick={() => setVolume(0)} className='group text-2xl cursor-pointer text-gray-700 hover:text-gray-500' />
                        }
                    </button>
                    <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} className='w-20 cursor-grabbing text-teal-600 accent-teal-600' />
                    <NavLink className='invisible xl:visible lg:visible md:visible' to={'songs'} onClick={() => setArrows(!arrows)}>
                        {
                            arrows ? <BsArrowsAngleContract onClick={navigateHome} className='text-2xl cursor-pointer text-gray-700 hover:text-gray-500' /> : <BsArrowsAngleExpand className='text-2xl cursor-pointer text-gray-700 hover:text-gray-500' />
                        }</NavLink>

                </div>
            </div>
        </>
    )
}

export default MusicPlayer
