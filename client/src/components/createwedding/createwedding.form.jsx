import React, { useState, useEffect } from "react"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import RemoveIcon from "@material-ui/icons/Remove"
import AddIcon from "@material-ui/icons/Add"
import Icon from "@material-ui/core/Icon"
import emailjs from "emailjs-com"
import { WEDDING_QUERY } from "../../utils/queries"
import { useMutation } from "@apollo/client"
import { ADD_WEDDING } from "../../utils/mutations"
import Auth from "../../utils/auth"

import { makeStyles } from "@material-ui/core/styles"
import ("./createwedding.css")

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

function CreateWedding() {
	const classes = useStyles()
	const [inputFields, setInputField] = useState([
		{
			brideFirstName: "",
			brideLastName: "",
			groomFirstName: "",
			groomLastName: "",
			venue: "",
			weddingDate: "",
			menuChoices: "",
		},
	])
	const [organiserState, setOrganiserSate] = useState(null)
	const [currentUser, setCurrentUser] = useState(null)
	const [ currentID, setCurrentID] = useState(null)
	useEffect(() => {
		const { organiser } = Auth.loggedIn()
		console.log(
			"this is the organiser from local storage",
			organiser
		)
		setCurrentUser(organiser.username)
		setCurrentID(organiser._id)
	}, [])
	const [addWedding, {error}] = useMutation(ADD_WEDDING)

	const handleSubmit = async (e) => {
		e.preventDefault()
		// console.log("input fields", inputFields)
		let i = 0
		try{
			const { data } = await addWedding({variables:{
				bride_first_name:inputFields[i].bride_first_name,
				bride_last_name:inputFields[i].bride_last_name,
				groom_first_name:inputFields[i].groom_first_name,
				groom_last_name:inputFields[i].groom_last_name,
				venue:inputFields[i].venue,
				date:inputFields[i].date,
				menu_choice:inputFields[i].menu_choice,
				wedding_owner:currentUser
			
		}})
		window.location.assign("/viewwedding")
		console.log(data)

	} catch(err){
		console.log (err)}
	}

	

	const handleChangeInput = (index, event) => {
		console.log(index, event.target.name)
		const values = [...inputFields]
		values[index][event.target.name] = event.target.value
		setInputField(values)
	}

	// const handleAddField = () => {
	// 	setInputField([
	// 		...inputFields,
	// 		{
	// 			firstName: "",
	// 			lastName: "",
	// 			email: "",
	// 			rsvp: "",
	// 			menue: "",
	// 		},
	// 	])
	// }

	// const handleRemoveField = (index) => {
	// 	const values = [...inputFields]
	// 	values.splice(index, 1)
	// 	setInputField(values)
	// }

	return (
		<Container className="bigcontainer">
			<h1 className="heading"> Fill in your wedding details</h1>
			<form
				className={classes.root}
				onSubmit={handleSubmit}
			>
				{inputFields.map((inputField, index) => (
					<div key={index}>
						<div>
							<TextField
								name="bride_first_name"
								label="Bride's First Name"
								value={inputField.bride_first_name}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
							<TextField
								name="bride_last_name"
								label="Bride's Last Name"
								value={inputField.bride_last_name}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
						</div>
						<div>
							<TextField
								name="groom_first_name"
								label="Groom's First Name"
								value={inputField.groom_first_name}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
							<TextField
								name="groom_last_name"
								label="Groom's Last Name"
								value={inputField.groom_last_name}
								onChange={(event) =>
									handleChangeInput(index, event)
								}
							/>
						</div>
						<div>
						    <TextField
    							name="venue"
    							label="Wedding Venue"
    							value={inputField.venue}
    							onChange={(event) =>
    								handleChangeInput(index, event)
    							}
    						/>
						</div>
                        <div>
						    <TextField
    							name="date"
    							label="Wedding Date"
    							value={inputField.date}
    							onChange={(event) =>
    								handleChangeInput(index, event)
    							}
    						/>
						</div>

						<TextField
							name="menu_choice"
							label="Menu Choices"
							value={inputField.menu_choice}
							onChange={(event) =>
								handleChangeInput(index, event)
							}
						/>

						{/* 
                   <IconButton
                   onClick={()=> handleRemoveField(index)}>
                       <RemoveIcon />
                   </IconButton>
                   <IconButton
                   onClick={() => handleAddField()}>
                       <AddIcon />
                   </IconButton> */}
					</div>
				))}
				<Button
					className={classes.button}
					vareient="contained"
					color="secondary"
					type="submit"
					onClick={handleSubmit}
					endIcon={<Icon>favorite</Icon>}
				>
					create your wedding
				</Button>
			</form>
		</Container>
	)
}

export default CreateWedding
