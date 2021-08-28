import React, {
	useEffect,
	useState,
	useContext,
} from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { useMutation } from "@apollo/client"
import { ADD_USER } from "../utils/mutations"
import Auth from "../utils/auth"
import { useHistory } from "react-router-dom"
// import { usePartyContext } from "../utils/partycontext"

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage:
			`url("./jeremy-wong-weddings-K8KiCHh4WU4-unsplash.jpg")`,
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn() {
	const classes = useStyles()
	const history = useHistory()
	// const { organiser, setOrganiser } = usePartyContext()

	// console.log("first set of organisers=" , organiser)

	const [userFormData, setUserFormData] = useState({
		username: "",
        email: "",
		password: "",
	})

    const [addUser,{error}] = useMutation(ADD_USER)
	// const [login, { error, data }] = useMutation(LOGIN_USER)

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setUserFormData({ ...userFormData, [name]: value })
		// setOrganiser(value)
		// console.log("data is", userFormData)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		console.log("the form data is", userFormData)

		try{
            const {data} = await addUser({
                variables:{...userFormData}
            })
            history.push("/home")
        } catch (error){
            console.log(error)
        }
		

		// setUserFormData({
		// 	username: "",
        //     email: "",
		// 	password: "",
		// })
	}

	return (
		<Grid
			container
			component="main"
			className={classes.root}
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				className={classes.image}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Create a new account
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={handleFormSubmit}
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="User Name"
							name="username"
							onChange={handleInputChange}
							value={userFormData.username}
							autoFocus
						/>
                        
                        
                        <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							onChange={handleInputChange}
							value={userFormData.email}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={handleInputChange}
							value={userFormData.password}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign UP
						</Button>
						<Grid container></Grid>
						<Box mt={5}></Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}