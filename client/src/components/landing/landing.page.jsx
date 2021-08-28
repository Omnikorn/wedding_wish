import React from "react"
import { Parallax, Background } from "react-parallax"
import { Link } from "react-router-dom"

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center",
}

const insideStyles = {
	// background: "white",
	padding: 20,
	position: "absolute",
	fontFamily: "ballada",
	color: "palevioletred",
	fontSize: "5rem",
    width:"100vw",
	top: "50%",
	left: "50%",
	transform: "translate(-50%,-50%)",
}

const paragraphStyle = {
	padding: 10,
	position: "absolute",
	color: "white",
	backgroundColor: "palevioletred",
    borderRadius:"25px",
	fontSize: "1rem",
	top: "90%",
	left: "50%",
	transform: "translate(-50%,-70%)",
}


const image1 =
	require("./newimages/helena-lopes-Vrb_vtQAxJU-unsplash.jpg").default

const image2 =
	require("./newimages/coplerunning.png").default
const image3 =
	require("./newimages/hearts.png").default
const image4 =
	require("./newimages/cake2.png").default

const image5 = require("./newimages/flowers.png").default




    const Landing = () => {
        return (
            <div>
                <Parallax
                    // blur={{min:-15, max:15}}
                    bgImage={
                        image5
                    }
                    strength={-200}
                >
                    <div style={{ height: "140vh" }} />
                    <h1 style={insideStyles}>The Big Day</h1>
                </Parallax>
                {/* <h1>
                    {" "}
                    ------------------------------------------------
                </h1> */}
                <div style={styles}>
                    <Parallax bgImage={image1} strength={500}>
                        <div style={{ height: "100vh" }}>
                            <div style={insideStyles}>
                                We are here to help!
                            </div>
                            <div style={paragraphStyle}>
                                <p>
                                    Planning a wedding can be a very magical but
                                    strssful time.
                                </p>
                                <p>
                                    {" "}
                                    Let us take the stress out of it for you and
                                    leave you to enjoy the magic
                                </p>
                            </div>
                        </div>
                    </Parallax>
                    {/* <h2>| | |</h2> */}
                    <Parallax
                        bgImage={image2}
                        blur={{ min: -1, max: 3 }}
                    >
                        <div style={{ height:"120vh" }}>
                            <div style={insideStyles}>
                                Send it in an Email
                            </div>
                            <div style={paragraphStyle}>
                            <p>Save time (and the planet) and send all your invites electronically from one place</p> 
                            </div>
                        </div>
                    </Parallax>
                    {/* <h2>| | |</h2> */}
                    <Parallax bgImage={image3} strength={1000}>
    
                    <div style={{ height: 500 }}>
                            <div style={insideStyles}>Track it all</div>
                            <div style={paragraphStyle}>
                            <p>For your peace of mind, track your guests' RSVPs and Menu choices from our app</p>
                            </div>
                        </div>
                        
                    </Parallax>
                    {/* <h2>| | |</h2> */}
                    <Parallax
                        bgImage={image4}
                        strength={200}
                        
                        renderLayer={(percentage) => (
                            <div>
                               
                                    <div
                                        style={{
                                            position: "absolute",
                                            background: `rgba(255, 125, 0, ${
                                                percentage * 1
                                            })`,
                                            left: "50%",
                                            top: "50%",
                                            borderRadius: "50%",
                                            transform: "translate(-50%,-50%)",
                                            width: percentage * 500,
                                            height: percentage * 500,
                                        }}
                                    />
                                
                            </div>
                        )}
                    >
                        <div style={{ height: 1000 }}>
                            <div style={insideStyles}> <Link to="/createuser">Sign up now</Link></div>
                        </div>
                    </Parallax>
                    {/* <h2>| | |</h2> */}
                    {/* <Parallax strength={500}>
                        <Background className="custom-bg">
                            <div
                                style={{
                                    height: 2000,
                                    width: 2000,
                                    backgroundImage:
                                        "url('https://i.imgur.com/8CV5WAB.png')",
                                }}
                            />
                        </Background>
                        <div>
                            <br />
                            custom background component
                            <br />
                            <br />
                            custom background component
                            <br />
                            <br />
                            custom background component
                            <br />
                            <br />
                        </div>
                    </Parallax> */}
                    <div style={{ height: 500 }} />
                    <h2>{"\u2728"}</h2>
                </div>
            </div>
        )
    }





export default Landing