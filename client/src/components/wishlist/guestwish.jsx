import React, { useState, useEffect } from "react"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import RemoveIcon from "@material-ui/icons/Remove"
// import AddIcon from "@material-ui/icons/Add"
// import Icon from "@material-ui/core/Icon"

// import Auth from "../../utils/auth"
import {
	WEDDING_QUERY,
	GUEST_QUERY,
	WISH_QUERY,
} from "../../utils/queries"
import { UPDATE_ITEM } from "../../utils/mutations"
import { makeStyles } from "@material-ui/core/styles"
import { useQuery, useMutation } from "@apollo/client"

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
		},
	},

	button: {
		margin: theme.spacing(1),
	},
}))

function GuestWish() {
	const classes = useStyles()

	const [inputFields, setInputField] = useState([
		{ item: "", website: "" },
	])

	// const [currentUser, setCurrentUser] = useState(null)
	// const [currentID, setCurrentID] = useState(null)

	const [itemState, setItemState] = useState(null)
	// const [correctGuest, setCorrectGuest] = useState([])
	// const [loader, setloader] = useState(false)
	// const [wishResult, setWishResult] = useState([])

	const handleBuy = async (id) => {
		setItemState(true)
		const itemId = id
		console.log("the item id is", itemId)
		try {
			const { data } = await update_item({
				variables: {
					_id: itemId,
					accquired: itemState,
				},
			})
		} catch (err) {
			console.log(err)
		}
	}

	// to retreive guest email from local storage
	const guestEmail = localStorage.getItem("guest")
	console.log("the stored email is ", guestEmail)

	const searchWishList = useQuery(WISH_QUERY)
	const update_item = useMutation(UPDATE_ITEM)
	const searchguest = useQuery(GUEST_QUERY)
	

const guestlist = searchguest.data.guests
console.log("the guest list is", guestlist)


const correct_guest = guestlist.filter((guest) =>{
	return guest.email === guestEmail
})

console.log("the correct guest is", correct_guest)


 const correct_wedding_owner = correct_guest[0].wedding_owner

console.log("the wedding owner now is", correct_wedding_owner)



console.log("the wishlist now is ", searchWishList)
const wish_list = searchWishList.data.wishes
console.log("the wishlist now is ", wish_list)

		// if (data) {
		// 	setloader(true)
		// 	const correctGuestResult = data.guests.filter(
		// 		(guest) => {
		// 			return guest.email === guestEmail
		// 			// return guest
		// 		}
		// 	)

		// 	if (correctGuestResult.length) {
		// 		const wedding_owner =
		// 			correctGuestResult[0].wedding_owner
		// 			console.log("the correct owner is", wedding_owner )
		// 		const correctWishList =
		// 			searchWishList &&
		// 			searchWishList.data.wishes.filter((wish) => {
		// 				return wish.wedding_owner == wedding_owner
		// 			})

		// 		setCorrectGuest(correctGuestResult)
		// 		setWishResult(correctWishList)
		// 		setloader(false)
		// 	} else {
		// 		setloader(false)
		// 	}
		// }
	

	

	
	

	return (
		<Container>
			<h1>This is the happy couple's Wihs list</h1>
			<form className={classes.root}>
				{wish_list.map((wish) => (
					<div key={wish._id}>
						<TextField
							name="item"
							label="Item"
							value={wish.item}
						/>

						<TextField
							name="website"
							label="Website/shop"
							value={wish.website}
						/>

						<span>
							{!wish.accquired && (
								<a
									onClick={handleBuy(wish._id)}
									class="btn btn-danger"
									href={`https://${wish.website}`}
									target="_blank"
								>
									<i class="fa fa-shopping-cart fa-lg"></i>{" "}
									BUY
								</a>
							)}
							{wish.accquired && (
								<span>Albready bought</span>
							)}
						</span>
					</div>
				))}
			</form>
		</Container>
	)
}

export default GuestWish
