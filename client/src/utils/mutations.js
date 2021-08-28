import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`

export const ADD_USER = gql`
	mutation addUser(
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
			}
		}
	}
`

export const ADD_GUESTS = gql`
	mutation addGuests(
		$name: String!
		$email: String!
		$rsvp: String!
		$menu: String!
		$wedding_owner: String!
	) {
		addGuests(
			name: $name
			email: $email
			rsvp: $rsvp
			menu: $menu
			wedding_owner: $wedding_owner
		)
		{
			name 
			}
		}
	
`

export const ADD_ITEM = gql`
mutation addItem(
	$item: String
	$website: String
	$wedding_owner: String
){
	addItem(
		item: $item
		website: $website
		wedding_owner: $wedding_owner
	)
	{
		item
	}
}
`


export const ADD_WEDDING = gql`
mutation addWedding ( 
	$bride_first_name: String
    $bride_last_name: String
	$groom_first_name: String
	$groom_last_name: String
	$date: String
	$venue: String
	$menu_choice: [String]
	$wedding_owner: String
)
{ addWedding(bride_first_name: $bride_first_name, bride_last_name: $bride_last_name, groom_first_name: $groom_first_name, groom_last_name: $groom_last_name, date: $date, venue: $venue, menu_choice: $menu_choice, wedding_owner: $wedding_owner)
{
	bride_first_name
}
}

`


export const UPDATE_RSVP = gql`
mutation update_rsvp (
	$rsvp:String, $email:String
){
	update_rsvp(rsvp: $rsvp, email:$email)
	{
		name
	}
}
`

export const UPDATE_MENU= gql`
mutation update_menu(
	$menu:String, $email:String)
	{
		update_menu(menu:$menu, email:$email)
		{
			name
		}
	}

`

export const UPDATE_ITEM= gql`
mutation update_item(
	$_id:ID, $accquired:Boolean)
	{
		update_menu(_id:$_id, accquired:$accquired)
		{
			item
		}
	}

`