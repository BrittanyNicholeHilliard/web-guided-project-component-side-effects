import React, { useState, useEffect } from 'react'
// 👉 TASK 1 - import the axios lib from node_modules
import axios from 'axios';
// 👉 TASK 2 - import the contents from constants/index.js

import Details from './Details'
import Friend from './Friend';

import { BASE_URL, API_KEY } from '../constants';

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState(null)

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  // 👉 TASK 3 - make an effect that runs after FIRST DOM surgery
  // caused by the first render only. You'll need `useEffect` from React.
  // The effect should consist of a call to the API using axios.
  // On success, set the array of friend objects from the API into state.
  useEffect(() => {
    axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`)
    .then(res => {
      setFriends(res.data);
    }).catch(err => console.error(err))
  }, [])

  return (
    <div className='container'>
      <h1>Some of my friends:</h1>
      {/* start by mapping over the friends array...*/}
      { friends.length ? friends.map(fr => {
        return <Friend key={fr.id} info={fr} open={openDetails} />
      }) : <p>LOADING COMING SOON PROOOOOOOMISE!!!</p>}
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}