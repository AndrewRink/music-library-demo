import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])  //1273063 = Grateful Dead
    const albumDisplay = artistData.map(album => {
        return(
            <div key={album.collectionId}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            const albums = resData.results.filter(entry => entry.collectionType === 'Album')
            setArtistData(albums)
        }
        fetchData()
    }, [id])
    return (
        <div>
            {albumDisplay}
        </div>
    )
}

export default ArtistView