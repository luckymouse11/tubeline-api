import axios from 'axios'
import React, { useState, useEffect } from 'react'
import logo from './assets/tfl-logo.jpg'

const App = () => {

  const [ tubes, setTubes ] = useState([])

  useEffect(() => {
    
    const getAPI = async() => {
      const { data } = await axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
      setTubes(data)
    }
    getAPI()
  }, [])


  // const coll = document.getElementsByClassName('collapsible')
  // let i

  // for (i = 0; i < coll.length; i++) {
  //   console.log(i)
  //   coll[i].addEventListener('click', function() {
  //     this.classList.toggle('active')
  //     const content = this.nextElementSibling
  //     console.log('show me content')
  //     console.log(content)
  //     console.log(content.style.display)
  //     if (content.style.display === 'none') {
  //       console.log('display 1' +  content.style.display)
  //       content.style.display = 'block'
  //     } else {
  //       console.log('display 2' +  content.style.display)
  //       content.style.display = 'none'
  //     }
  //   })
  // }

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
              <button type="button" key={tube.id} style={{ border: `3px solid ${tube.id}` }} id={`${tube.id}`} className="collapsible">
                <div className="tl-line">
                  <div>{tube.name}</div>
                </div>
                <div className="tl-line">
                  <div>{tube.lineStatuses[0].statusSeverityDescription}</div>
                </div>
              </button>
              <div style={{ border: `3px solid ${tube.id}` }}  id={`${tube.id}`} className="tl-reason">
                <div>{tube.lineStatuses[0].reason}</div>
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