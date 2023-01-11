import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Searchbar from './Components/Searchbar';
import Gallery from './Components/Gallery';
import ArtistView from './Components/ArtistView';
import AlbumView from './Components/AlbumView';
import { DataContext } from './Context/DataContext';


function App() {
 const [search, setSearch] = useState('')
 const [message, setMessage] = useState('Search for Music!')
 const [data,setData] = useState([])

 const handleSearch = (e, term) => {
        e.preventDefault()
        setSearch(term)
 }

useEffect(() => {
  if (search) {
  const fetchData = async () => {
    const BASE_URL = 'https://itunes.apple.com/search?term='
    const encodedSearchTerm = encodeURIComponent(search)
    const url = BASE_URL + encodedSearchTerm
    const response = await fetch(url)
    const data = await response.json()

    if (data.results.length > 0) {
      setData(data.results)
    } else {
      setMessage('Results not found')
    }
    console.log(data)
  }

    fetchData()
  }
}, [search])


  return (
    <div>
      {message}
        <Router>
          <Routes>
              <Route path = '/' element={
                <Fragment>
                  <Searchbar handleSearch={handleSearch} />
                  <DataContext.Provider value={data}>
                  <Gallery />
                  </DataContext.Provider>
                </Fragment>
              } />
              <Route path = '/album/:id' element={<AlbumView />} />
              <Route path = '/artist/:id' element={<ArtistView />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
