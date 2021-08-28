import React, {
	useContext,
	useEffect,
	useState,
} from "react"
import { PartyContext } from "../../utils/partycontext"
import { useQuery } from "@apollo/client"
import { WEDDING_QUERY } from "../../utils/queries"

import { useHistory } from "react-router-dom"
import { magic } from "../../lib/magic"
import { UserContext } from "../../lib/UserContext"
import Auth from "../../utils/auth"
import CountDown from "../countdown/Count.component"
import "./viewweddingstyle.css"


// import Loading from './loading';
const Callback = (props) => {
	const history = useHistory()

	const [user, setUser] = useContext(UserContext)
	const [organiserState, setOrganiserState] = useState(null)
	const [currentUser, setCurrentUser] = useState(null)
	const [currentID, setCurrentID] = useState(null)

	useEffect(() => {
		const { organiser } = Auth.loggedIn()
		console.log(
			"this is the organiser from local storage",
			organiser
		)
		setCurrentUser(organiser.username)
		setCurrentID(organiser._id)
	}, [])

	console.log("the currentUser is ", currentUser)
	console.log("the current ID is", currentID)
	// function ViewWedding() {}

	// `loginWithCredential()` returns a didToken for the user logging in
	const finishEmailRedirectLogin = () => {
		const magicCredential = new URLSearchParams(
			props.location.search
		).get("magic_credential")
		if (magicCredential)
			magic.auth
				.loginWithCredential()
				.then((didToken) =>
					authenticateWithServer(didToken)
				)
	}

	// Send token to server to validate
	const authenticateWithServer = async (didToken) => {
		const res = await fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + didToken,
				},
			}
		)

		if (res.status === 200) {
			// Set the UserContext to the now logged in user
			const userMetadata = await magic.user.getMetadata()
			await setUser(userMetadata)
			//   history.push('/profile');
		}
	}

	const { loading, data } = useQuery(WEDDING_QUERY)
	if (loading) {
		return <p> loading ...</p>
	}

	console.log(
		"the wedding data from wedding query is",
		data
	)
		
	const weddingData = data.weddings.filter((wedding) => {
		// const weddingID = "61110f69077f5da76492affa"
		return wedding.wedding_owner == currentUser
	})

	console.log("the wedding data is ", data.weddings)
	console.log("the filtered wedding data is ", weddingData)
	return (
		<div className="bigcontainer">
			<h1> Welcome to your wedding</h1>

			<div>
				{weddingData.map((wedding) => (
					<div>
						<div>
							<h2 className="heading" style={{marginBottom: "5vh"}}>{wedding.bride_first_name} & {wedding.groom_first_name}</h2>
						</div>
						<p>you are getting married on</p>
						<h3 style={{marginBottom: "5vh"}}>{wedding.date}</h3>
						<p>that's in</p>
						
						<CountDown style={{marginBottom: "5vh"}} deadline={wedding.date} />
						<p> You have invited your friends and family to join you at </p>
						<h3>{wedding.venue}</h3>
						<p> and you have offered them a menu choice of</p>
						<h2>{wedding.menu_choice}</h2>
					</div>
				))}
			</div>
		</div>
	)
}

export default Callback
