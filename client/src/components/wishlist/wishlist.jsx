import React, { useState, useEffect } from "react"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import RemoveIcon from "@material-ui/icons/Remove"
import AddIcon from "@material-ui/icons/Add"
import Icon from "@material-ui/core/Icon"

import Auth from "../../utils/auth"
import {
	WEDDING_QUERY,
	GUEST_QUERY,
	WISH_QUERY,
} from "../../utils/queries"
import { ADD_GUESTS, ADD_ITEM } from "../../utils/mutations"
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

function Couplewishlist() {
	const classes = useStyles()

	const [inputFields, setInputField] = useState([
		{ item: "", website: "" },
	])

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

	const [addItem, { error }] = useMutation(ADD_ITEM)

	// handle the submit form
	const handleSubmit = async (e) => {
		e.preventDefault()

		let i
		for (i = 0; i < inputFields.length; i++) {
			console.log("i=", i, "input= ", inputFields[i])
			try {
				const { data } = await addItem({
					variables: {
						item: inputFields[i].item,
						website: inputFields[i].website,

						wedding_owner: currentUser,
					},
				})

				console.log(data)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const handleChangeInput = (index, event) => {
		console.log(index, event.target.name)
		const values = [...inputFields]
		values[index][event.target.name] = event.target.value
		setInputField(values)
	}

	const handleAddField = () => {
		setInputField([
			...inputFields,
			{
				item: "",
				website: "",
			},
		])
	}

	const handleRemoveField = (index) => {
		const values = [...inputFields]
		values.splice(index, 1)
		setInputField(values)
	}

	console.log("this is the current user", currentUser)

	const { loading, data } = useQuery(WISH_QUERY)
	if (loading) {
		return <p>Loading ....</p>
	}

	console.log("the WISH list is", data.wishes)

	const filteredWishList = data.wishes.filter((wish) => {
		return wish.wedding_owner == currentUser
	})

	console.log("the filtered wish list is", filteredWishList)

	return (
		<Container>
			<h1>This is your Wihs list</h1>
			<form className={classes.root}>
				{filteredWishList.map((wish, index) => (
					<div key={index}>
						<TextField
							name="item"
							label="Item"
							value={wish.item}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/>

						<TextField
							name="website"
							label="Website/shop"
							value={wish.website}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/>

						<span>
							{wish.accquired && (
								<i style={{padding:"20px"}}
									class="fa fa-check"
									aria-hidden="true"
								></i>
							)}
							{!wish.accquired && (
								<i style={{padding:"20px"}} class="fa fa-times" aria-hidden="true"></i>
							)}
						</span>
						{/* <TextField
							name="rsvp"
							label="RSVP"
							value={guest.rsvp}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/> */}

						<IconButton
							onClick={() => handleRemoveField(index)}
						>
							<RemoveIcon />
						</IconButton>
						<IconButton onClick={() => handleAddField()}>
							<AddIcon />
						</IconButton>
					</div>
				))}

				{inputFields.map((inputField, index) => (
					<div key={index}>
						<TextField
							name="item"
							label="Wishlist Item"
							value={inputField.item}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/>

						<TextField
							name="website"
							label="Website/shop"
							value={inputField.website}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/>
						{/* <TextField
							name="rsvp"
							label="RSVP"
							value={inputField.rsvp}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/> */}

						<IconButton
							onClick={() => handleRemoveField(index)}
						>
							<RemoveIcon />
						</IconButton>
						<IconButton onClick={() => handleAddField()}>
							<AddIcon />
						</IconButton>
					</div>
				))}
				<Button
					className={classes.button}
					vareient="contained"
					color="secondary"
					type="submit"
					onClick={handleSubmit}
					endIcon={<Icon>save</Icon>}
				>
					Save Wish List
				</Button>
			</form>
		</Container>
	)
}

export default Couplewishlist
