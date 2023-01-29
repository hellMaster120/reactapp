import React from "react"
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./componets/Home"
import MainLayout from "./componets/MainLayout"
import About from "./componets/About"
import "./css/index.css"

const Renderer = () => {
	return (
		<React.StrictMode>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="About" element={<About TEST="TESTERWER234"></About>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	)
}

ReactDOM.createRoot(document.getElementById("Container") as HTMLElement).render(Renderer())
