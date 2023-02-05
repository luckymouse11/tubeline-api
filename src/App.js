import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import logo from './assets/tfl-logo.jpg'

const App = () => {

  const [ tubes, setTubes ] = useState([])
  const dataFetchedRef = useRef(false)

  useEffect(() => {
    const getAPI = async() => {
      const { data } = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
      setTubes(data)
    }
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    getAPI()
  }, [])


  const handleClick = (collapsibleId) => {

    const reason = document.getElementById(collapsibleId).nextElementSibling

    if (reason.style.display === 'block') {
      reason.style.display = 'none'
    } else {
      reason.style.display = 'block'
    }
  }

  function timedRefresh(timeoutPeriod) {
    setTimeout('location.reload(true);',timeoutPeriod)
  }
  
  window.onload = timedRefresh(60000)

  return (
    <>
      <div className="title-head">
        <img src={logo} alt="tfl logo"/>
        <h1>Tube Line Status</h1>
      </div>
      <div className="container">
        {tubes.map((tube) => {
          return (
            <>
              <button onClick={()=>handleClick(tube.id)} type="button" key={tube.id} style={{ border: `3px solid ${tube.id}` }} id={tube.id} className="collapsible">
                <div className="tl-line">
                  <div>{tube.name}</div>
                </div>
                <div key="{tube.name}_status"className="tl-line">
                  <div>{tube.lineStatuses[0].statusSeverityDescription}</div>
                </div>
              </button>
              <div style={{ border: `3px solid ${tube.id}` }} id={tube.id} className="tl-reason">
                {tube.lineStatuses[0].reason ?
                  <div>{tube.lineStatuses[0].reason}</div>
                  :
                  <div>No update</div>
                }
              </div>
            </>
          )
        })}
      </div>
      <div id="refresh-timer">
        Page refreshes every 60 seconds
      </div>
    </>
  )
}

export default App