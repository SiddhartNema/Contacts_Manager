// import { Children } from "react"
import Navbar from "./Navbar"

const Layout = ({ navbar=true, Children})=>{
    return (
        <>
        {navbar && <Navbar/>}
        <div className="container mt-3" >{Children}</div>
        </>
    )
}

export default Layout