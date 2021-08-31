import React, { useState, useEffect } from "react"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"

import {
	
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
	// const [inputFields, setInputField] = useState([
	// 	{ item: "", website: "" },
	// ])
	const [loader, setloader] = useState(false)
	const [itemState, setItemState] = useState(null)
	const [wishList, setWishList]=useState([])
	const update_item=useMutation(UPDATE_ITEM) 
	const searchguest = useQuery(GUEST_QUERY)
	const { loading, data } = useQuery(WISH_QUERY)
if (loading) {
return <p>LOADING</p>
}
		
		console.log("the WISH list is", data.wishes);
		


	const handleBuy = async (e,id) => {
		e.preventDefault()
		console.log("the buy button has been clicked")
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

	// const searchWishList = useQuery(WISH_QUERY)
	
	
	

const guestlist = searchguest.data.guests
console.log("the guest list is", guestlist)


const correct_guest = guestlist.filter((guest) =>{
	return guest.email === guestEmail
})

console.log("the correct guest is", correct_guest)


 const correct_wedding_owner = correct_guest[0].wedding_owner

console.log("the wedding owner now is", correct_wedding_owner)

// useEffect (() )
const filteredWishList = data.wishes.filter((wish) => {
		return wish.wedding_owner == correct_wedding_owner
		
		})
		console.log("the final wish list is", filteredWishList)
	// if (filteredWishList.lnegth){
	// 	setWishList(filteredWishList)
	// 	console.log("the final wish list is", wishList)
	// 	setloader(false)
	// }


	

	


	// console.log("the filtered wish list is", filteredWishList)

//console.log("the wishlist now is ", searchWishList)
// const wish_list = searchWishList.data.wishes
// console.log("the wishlist now is ", wish_list)

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
			<h1>This is the happy couple's Wish list</h1>
			<form className={classes.root}>
				{filteredWishList.map((wish) => (
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
