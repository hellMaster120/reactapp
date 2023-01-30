import {resolve} from "path"
import React, {useState} from "react"
import {Outlet, NavLink} from "react-router-dom"
import "../css/MainLayout.css"
import logo from "../img/logo.svg"

const APIUrl = "https://api.github.com"
const RepoAPI = APIUrl + "/repos"
const ReposUrl = "/users/hellMaster120/repos"
const LangUrl = "/languages"
const FileUrl = "/contents"
var FileData: FileDataInterface[] | string = []
var LocalStorage = window.localStorage
//https://api.github.com/repos/hellMaster120/BaseController
interface FileDataInterface {
	Pushed: string
	Created: string
	ID: number
	Name: string
	FullName: string
	Has_Pages: boolean
	Branch: string
	Visibility: string
	Url: {
		Lang: string
		File: string
	}
}
const GetData = async (): Promise<FileDataInterface[] | string> => {
	var ArrayData: FileDataInterface[] = []
	const APIUrl = "https://api.github.com"
	const RepoAPI = APIUrl + "/repos"
	const ReposUrl = "/users/hellMaster120/repos"
	const LangUrl = "/languages"
	const FileUrl = "/contents"
	await fetch(APIUrl + ReposUrl, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		method: "GET"
	})
		.then((Data) => Data.json())
		.then((Data) => {
			Data.forEach((File: any) => {
				let Pushed: string = File.pushed_at
				let Created: string = File.created_at
				let ID: number = File.id
				let Name: string = File.name
				let FullName: string = File.full_name
				let Has_Pages: boolean = File.has_pages
				let Branch: string = File.default_branch
				let Visibility: string = File.visibility
				let Url: {
					Lang: string
					File: string
				} = {
					Lang: RepoAPI + "/" + FullName + LangUrl,
					File: RepoAPI + "/" + FullName + FileUrl
				}
				ArrayData.push({
					Pushed: Pushed,
					Created: Created,
					ID: ID,
					Name: Name,
					FullName: FullName,
					Has_Pages: Has_Pages,
					Branch: Branch,
					Visibility: Visibility,
					Url: Url
				})
			})
		})
		.catch((error) => {
			console.log(error)
			return error
		})
	return ArrayData
}

const CheckNewData = (): void => {
	const Cookie = document.cookie.replace(" ", "").search("CheckData")
	if (Cookie == -1) {
		const d = new Date()
		d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000)
		let expires = "expires=" + d.toUTCString()
		document.cookie = "CheckData " + "=" + ";" + expires + ";path=/"
		GetData().then((Data) => {
			FileData = Data
			if (typeof FileData == "string") {
				return
			} else {
				LocalStorage.setItem("Data", JSON.stringify(FileData))
			}
		})
	}
}

CheckNewData()
const GetFileDataHTML = () => {
	var HTMLData: JSX.Element[] = []
	var FileData = JSON.parse(LocalStorage.getItem("Data") as string)
	FileData.forEach((File_: FileDataInterface) => {
		if (File_.Has_Pages) {
			console.log(File_)
			HTMLData.push(
				<a className="Link" key={File_.ID} href={"https://hellmaster120.github.io/" + File_.Name}>
					<div>{File_.Name}</div>
				</a>
			)
		}
	})
	return HTMLData
}
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
						{GetFileDataHTML()}
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
