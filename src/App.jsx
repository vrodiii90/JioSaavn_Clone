import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Search from './components/Search'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import NewRelease from './pages/NewRelease'
import Artists from './pages/Artists'
import Songs from './components/AllSongs'
import MusicPlayer from './components/MusicPlayer'
import SingleSong from './components/SingleSong'
import TopPunjabi from './pages/TopPunjabi'
import EnglishMusic from './pages/EnglishMusic'
import Bollywood from './pages/Bollywood'
import Devotional from './pages/Devotional'
import Favourite from './pages/Favourite'
import SearchSongs from './components/SearchSongs'

export const MainContext = createContext()

function App() {


  const [songs, setsongs] = useState(Songs)
  let [isPlaying, setIsPlaying] = useState(false)
  let [currentSong, setCurrentSong] = useState(songs[0])
  let [currentTime, setCurrentTime] = useState(0)
  let [duration, setDuration] = useState(0)
  let [repeat, setRepeat] = useState(false)
  let [favSongs, setFavSongs] = useState([])
  let [isFav, setIsFav] = useState(0)
  let [searchItem, setSearchItem] = useState('')

  const audioRef = useRef()
  const navigate = useNavigate()

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCurrentSong(songs[0])
  //     // setCurrentSong(songs[currentSong.id + 1])
  //   }, 500)
  // }, [])

  const handleSearch = (e) => {
    setSearchItem(e.target.value)
  }

  const filterItems = songs.filter((x) => 
  x.name.toLowerCase().includes(searchItem.toLowerCase())
  )

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
    else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    const savedSongs = localStorage.getItem('MySongs')
    if (savedSongs) {
      setFavSongs(JSON.parse(savedSongs))
    }
  }, [])

  const playPause = (id) => {
    let SONG = songs.find((x) => x.id == id)
    if (isPlaying) {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
    setCurrentSong(SONG)
  }

  useEffect((id) => {
    let FAV = favSongs.find((x) => x.id == id)
    setIsFav(FAV)
  }, [])

  const addtoFavlist = (id) => {
    let fav = songs.find((x) => x.id == id)
    let existing = favSongs.find((y) => y.id == id)
    if (existing) {
      alert('This Song is already in your Fav List')
    }
    else {
      setFavSongs([...favSongs, fav])
      localStorage.setItem('MySongs', JSON.stringify([...favSongs, fav]))
      alert('Song Added')
    }
  }

  const removeFav = (id) => {
    let fav1 = favSongs.filter((x) => x.id != id)
    favSongs = fav1
    setFavSongs([...favSongs])
    localStorage.setItem('MySongs', JSON.stringify([...favSongs]))
    alert('Song Removed')

  }

  const changeCurrentTime = (e) => {
    let curTime = e.target.value
    audioRef.current.currentTime = curTime;
    setCurrentTime(curTime)
  }

  useEffect(() => {
    let Curtime = setInterval(() => {
      setCurrentTime(audioRef.current.currentTime)
    }, 1000)


    if (currentTime == duration) {
      clearInterval(Curtime)
    }

  }, [currentSong, isPlaying])


  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formateSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes} : ${formateSeconds}`
    }
    return '00 : 00'
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
    }
    return array
  }

  const shuffledSongs = shuffle(songs)

  const playNext = () => {
    setCurrentSong(songs[currentSong.id + 1])
  }

  const endedSongs = () => {
    playNext()
  }


  let value = {
    songs,
    navigate,
    repeat,
    setRepeat,
    currentSong,
    playPause,
    isPlaying,
    currentTime,
    setCurrentTime,
    duration,
    changeCurrentTime,
    addtoFavlist,
    favSongs,
    removeFav,
    isFav,
    setIsFav,
    setCurrentSong,
    shuffledSongs,
    shuffle,
    setsongs,
    searchItem,
    handleSearch,
    filterItems
  }



  return (
    <>
      <MainContext.Provider value={value}>
        <audio loop={repeat} onEnded={endedSongs} src={currentSong.path} ref={audioRef} onDurationChange={(e) => setDuration(e.currentTarget.duration)} />
        <Navbar formatTime={formatTime} duration={duration} />
        <Sidebar>
          <Routes >
            <Route path='/' element={<Home />}></Route>
            <Route path='newrelease' element={<NewRelease />}></Route>
            <Route path='toppunjabi' element={<TopPunjabi />}></Route>
            <Route path='englishmusic' element={<EnglishMusic />}></Route>
            <Route path='hindimusic' element={<Bollywood />}></Route>
            <Route path='artists' element={<Artists />}></Route>
            <Route path='devotional' element={<Devotional />}></Route>
            <Route path='favsong' element={<Favourite />}></Route>
            <Route path='songs' element={<SingleSong />}></Route>
            <Route path='searchsongs' element={<SearchSongs />}></Route>

          </Routes>
        </Sidebar>
        <MusicPlayer isPlaying={isPlaying} formatTime={formatTime} audioRef={audioRef} />
        <Routes>
          {/* <Route path='search' element={<Search />}></Route> */}
        </Routes>
      </MainContext.Provider>
    </>
  )
}

export default App
