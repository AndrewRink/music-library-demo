import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    const songDisplay = albumData.map(song => {
        return (
            <div key={song.trackId}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            console.log(resData)
            const songs = resData.results.filter(entry => entry.wrapperType === 'track')
            setAlbumData(songs)
        }
        fetchData()
    }, [id])

    return (
        <div>
            {songDisplay}
        </div>
    )
}

export default AlbumView
