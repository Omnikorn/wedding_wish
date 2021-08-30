import React, { useState, useEffect } from "react"
import "../vendor/bootstrap.css"
import { useMutation, useQuery } from "@apollo/client"
import { WEDDING_QUERY, GUEST_QUERY } from "../utils/queries"
import "./guestlanding.css"
import gl from "../gl.jpg"
import loc from "../loc.jpg"
import clock from "../clock.jpg"
import CountDown from "../components/countdown/Count.component"
import { UPDATE_RSVP, UPDATE_MENU } from "../utils/mutations"

function GuestLanding() {
  const [rsvpState, setRsvpState] = useState(null)
  const [menuState, setMenuState] = useState(null)
  const [correctGuest, setCorrectGuest] = useState([])
  const [loader, setloader] = useState(false)
  const [weddingResult, setweddingResult] = useState([])

  const searchWedding = useQuery(WEDDING_QUERY)
  console.log("all the weddings are :: ", searchWedding.data)

  // to retreive guest email from local storage
  const guestEmail = localStorage.getItem("guest")
  console.log("the stored email is ", guestEmail)

  const [update_rsvp, { error }] = useMutation(UPDATE_RSVP)
  const [update_menu] = useMutation(UPDATE_MENU)

  // search guest list for matching email
  const { loading, data } = useQuery(GUEST_QUERY)
  useEffect(() => {
    if (data) {
        setloader(true)
      const correctGuestResult = data.guests.filter((guest) => {
        return guest.email === guestEmail
        // return guest
      })
      
    
      if(correctGuestResult.length){
          
          const wedding_owner = correctGuestResult[0].wedding_owner
          const correctWedding = searchWedding && searchWedding.data.weddings.filter((wedding) => {
              return wedding.wedding_owner == wedding_owner
            })
            
            setCorrectGuest(correctGuestResult)
            setweddingResult(correctWedding)
            setloader(false)
        }else{

            setloader(false)
        }
    }
  }, [data])

  if (loader) {
    return <p>loading</p>
  }

  //   useEffect(() => {
  //     console.log("USFEEFFEC T WORKING --- ", searchWedding.data)
  //   }, [searchWedding.data])

  //   if (correctGuest.length) {
  //     console.log("the correct guest is ", correctGuest)
  //     console.log("the guest name is", correctGuest[0].name)
  //   }

  // settin wedding owner based on logged in guest

  //   console.log("the wedding owner is", wedding_owner)

  // / filter wedding according to wedding owner

  // console.log("the correct wedding is", correctWedding)

  // setgroom(correctWedding[0].groom_first_name)
  // setbride(correctWedding[0].bride_first_name)
  // setweddingdate(correctWedding[0].date)
  // setlocation(correctWedding[0].venue)
  //   console.log("the bride and groom are", bride, groom)

  console.log("menu options as ")

  const handleInput = (event) => {
    console.log("what is the rsvp choice ", event.target.value)
    setRsvpState(event.target.value)
  }

  const handleInputFood = (event) => {
    console.log("what is the food", event.target.value)
    setMenuState(event.target.value)
  }

  console.log("the rsvp state=", rsvpState)
  console.log("the menustate is", menuState)
  // const email = correctGuest[0].email

  // console.log("the emai is ", email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = correctGuest[0].email

    console.log("the emai is ", email)
    try {
      const { data } = await update_rsvp({
        variables: {
          rsvp: rsvpState,
          email: email,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitFood = async (e) => {
    e.preventDefault()
    const email = correctGuest[0].email

    console.log("the emai is ", email)
    try {
      const { data } = await update_menu({
        variables: {
          menu: menuState,
          email: email,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg container content d-flex flex-row p-2 justify-content-between">
          {
              weddingResult.length  ? 
      <div className="container content d-flex flex-row p-2 justify-content-between">
              <div className="row">
          <div className="col-sm- talk">
            <h1>
              {weddingResult.length && weddingResult[0].bride_first_name} &{" "}
              {weddingResult.length && weddingResult[0].groom_first_name}
            </h1>
            <h1>would love to welcome you to their wedding</h1>
            <h1>{weddingResult.length && weddingResult[0].name}</h1>
            <br />
            <img className="img" src={gl}></img>

            <div className="container content d-flex flex-column p-2">
              <form className="mb-5" onSubmit={handleSubmit}>
                <h1>
                  <label for="Menu">Please RSVP</label>
                </h1>
                <select id="rsvp" name="rsvp" onChange={handleInput}>
                  <option value="choose">Choose</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <input type="submit" value="Submit" />
              </form>

              <form onSubmit={handleSubmitFood}>
                <h1>
                  <label for="Menu">Choose your preferred Menu:</label>
                </h1>
                <select id="menu" name="mwnu" onChange={handleInputFood}>
                  <option vlaue="choose"> Choose</option>
                  <option value="vegan">Vegan</option>
                  <option value="vegeterian">Vegeterian</option>
                  <option value="meat">Meat</option>
                </select>
                <input type="submit" value="Submit" />
              </form>

              <div className="container content d-flex flex-column p-2">
                <h1>
                  We will Celebrate it at:
                  <br />
                  {weddingResult.length && weddingResult[0].location}
                </h1>

                <img className="location" src={loc}></img>
                <br />

                <h1>
                  On <br /> {weddingResult.length && weddingResult[0].date}
                </h1>
                <br />
                <h6 className="bold-four">
                  We would love it if you could join us in our celebration.
                  Please RSVP above to let us know. If you have any seperate
                  diatery requirements please send us a message and we will do
                  our best to accomnodate them.
                </h6>
                <img src={clock} className="clock" />
                <br />

                <h1>COUNTDOWN</h1>
                {
                    weddingResult.length &&
                <CountDown
                deadline={weddingResult[0].date}
                />
            }
            <a href="/#guestwishlist"><button>COUPLE WISH LIST</button></a>
              </div>
            </div>
          </div>
        </div> 
      </div>
        : null
        }
      </div>
      )
}

export default GuestLanding
