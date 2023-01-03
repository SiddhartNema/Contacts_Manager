import { useContext, useState } from "react";
import { parse } from "papaparse";
import tick from "./images/tick.png";
import file from "./images/file.png";
import "./import.css";
import deleteCom from "./images/deleteCom.png";


const Importfile = () => {
    const [button, setButton] = useState(false)
    const [deleteButton, setDeleteButton] = useState(false);
    const [popupDel, setPopupDel] = useState(true)
    const [popupImport, setPopupImport] = useState(true)
    const handledrag = (e) => {
        e.preventDefault()
    }
    const handledrop = (e) => {
        e.preventDefault()
        const convertarr = Array.from(e.dataTransfer.files) //converting object to array
        convertarr.map(async file => { //
            let text = await file.text() //convertion to object to csv text
            let result = parse(text, { header: true }) //converting csvtext to json object // header is for field headings
            console.log(result.data)
        })
        setPopupImport(false)
    }
    let set = new Set()
    const handledelete = (e) => {
        setPopupDel(false)
    }
    const deletefinal = () => {
        setDeleteButton(false);
        document.location.reload()
    }

return (
        <>
            <div className="main">
                <div className="row">
                    <div className="controls pb-3" style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "0px" }}>
                        <div className="right" style={{ display: "flex", width: "30%", justifyContent: "space-between" }}>
                            <span> <button type="button" onClick={() => { setDeleteButton(true) }} className="btn btn-default shadow-lg bg-body rounded"><i className="bi bi-trash"></i> Delete</button></span>
                            <span> <button type="button" onClick={() => { setButton(true) }} className="btn btn-default shadow-lg bg-body rounded"><i className="bi bi-arrow-down-up"></i> Import</button></span>
                        </div>
                    </div>
                </div>      
                {button &&
                    <>
                        {(popupImport) ? (
                            <div id="page" onDragOver={handledrag} onDrop={handledrop}>
                                <div id="card">
                                    <div id="importimg">
                                        <img src={file} alt="PopUp" className="popup-img"/>
                                    </div>
                                    <div id="import">Import File</div>
                                    <button id="drop">
                                        <div id="upload" onClick={() => { setButton(false) }}>Upload</div>
                                    </button>
                                    <button id="butmainimp">
                                        <div id="cancel" onClick={() => { setButton(false) }}>Cancel</div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div id="page" >
                                <div id="card">
                                    <div id="importcompleteimg"><img src={tick} alt="PopUp" /></div>
                                    <div id="importcom">Import completed</div>
                                    <div id="dropcom">CSV File is Uploaded</div>
                                    <button id="butmainimp">
                                        <div id="cancel" onClick={() => { setButton(false); document.location.reload() }}>Ok</div>
                                    </button>
                                </div>
                            </div>)}
                    </>
                }
                {deleteButton &&
                    <>
                        {(popupDel) ? (
                            <div id="page" >
                                <div id="card">
                                    <div id="importimg">
                                        <img src={deleteCom} alt="PopUp" className="del-img"/>
                                    </div>
                                    <div id="del">Delete Contacts</div>
                                    <div id="dropdel">Sure you want to delete this Contacts?</div>
                                    <button id="butmain">
                                    <div id="cancel" onClick={() => { setDeleteButton(false) }}>Cancel</div>
                                    </button>
                                    <button id="ok" onClick={handledelete}>Ok</button>
                                </div>
                            </div>
                        ) : (
                            <div id="page" >
                                <div id="card">
                                    <div id="deliconimg">
                                        <img src={tick} alt="PopUp" />
                                    </div>
                                    <div id="delcon">Deleted Contacts</div>
                                    <button id="delbutt">
                                        <div id="delok" onClick={deletefinal}>OK</div>
                                    </button>
                                </div>
                            </div>
                        )
                        }
                    </>
                }
            </div>
        </>
    )
}
export default Importfile;