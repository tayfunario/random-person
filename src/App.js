import './App.css';
import { useEffect, useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { GrMail } from 'react-icons/gr'
import { HiIdentification } from 'react-icons/hi'
import { BsMapFill } from 'react-icons/bs'
import { AiTwotonePhone } from 'react-icons/ai'
import { BsFillChatLeftTextFill } from 'react-icons/bs'


function App() {
  const [chosen, setChosen] = useState('name')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()

    document.querySelectorAll('.icon').forEach(elem => {
      elem.addEventListener('mouseover', event => {
        setChosen(event.currentTarget.id)
      })
    })
  }, [])


  const load = async () => {
    setLoading(true)
    let response = await fetch('https://randomuser.me/api/')
    response = await response.json()
    setLoading(false)
    setChosen('name')
    setData({
      name: `${response.results[0].name.first} ${response.results[0].name.last}`,
      email: response.results[0].email,
      age: response.results[0].dob.age,
      country: response.results[0].location.country,
      phone: response.results[0].phone,
      username: response.results[0].login.username,
      image: response.results[0].picture.large
    })
  }



  return (
    <div id='container' className='container-fluid p-0'>
      <div id='background'>
        <div id='top'></div>
        <div id='bottom'></div>
      </div>



      <div id='front' className='container-fluid position-absolute'>
        <div className='row justify-content-center align-items-center m-0'>
          <div id='inner-container' className='col-lg-6 col-md-8 col-sm-10 col-12 shadow-lg p-0'>
            <div id='inner-top' className='border-bottom border-secondary position-relative d-flex justify-content-center'>
              {loading ?
                <div className='spinner-border text-light mt-5'></div>
                :
                <img src={data.image} alt={data.name} className='border border-secondary p-1 bg-white position-absolute rounded-circle shadow-lg' ></img>}
            </div>

            <div id='inner-bottom' className='pt-5'>
              <div id='text' className='text-center'>
                <h2 className='display-6 text-capitalize'>{`${chosen}: ${data[chosen]}`}</h2>
              </div>
              <div id='icons' className='d-flex justify-content-between px-sm-5 px-3'>
                <div className='icon' id='name'><BsFillPersonFill /></div>
                <div className='icon' id='email'><GrMail /></div>
                <div className='icon' id='age'><HiIdentification /></div>
                <div className='icon' id='country'><BsMapFill /></div>
                <div className='icon' id='phone'><AiTwotonePhone /></div>
                <div className='icon' id='username'><BsFillChatLeftTextFill /></div>
              </div>
              <div id='button'>
                <button id='random-btn' className='d-block mx-auto' onClick={load}>RANDOM!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
