import React, {useState} from "react"
import {Outlet, NavLink} from "react-router-dom"
import "../css/MainLayout.css"
import logo from "../img/logo.svg"

const MainLayout = (props: any) => {
	const [Close, SetCloseState] = useState(false)

	return (
		<>
			<div id="App">
				<div id="NavContaner" className={Close ? "Close" : "Open"}>
					<nav id="AppNav">
						<NavLink replace to="/" className={(isActive) => "Link" + (isActive.isActive ? " Active" : "")}>
							<div>Home</div>
						</NavLink>
						<NavLink replace to="/About" className={(isActive) => "Link" + (isActive.isActive ? " Active" : "")}>
							<div>About</div>
						</NavLink>
					</nav>
					<div
						id="CloseButton"
						onClick={() => {
							SetCloseState(!Close)
						}}>
						<img src={logo} alt=""></img>
					</div>
				</div>
				<div id="AppBody">
					<Outlet />
				</div>
			</div>
		</>
	)
}

export default MainLayout
