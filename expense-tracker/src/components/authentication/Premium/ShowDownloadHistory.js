import { Button } from 'react-bootstrap';
import './ShowDownloadHistory.css'
const ShowDownloadHistory = (props) => {
    return ( <
        div style = {
            { display: "flex", justifyContent: "space-between", borderBottom: "1px solid grey", alignItems: "center" } } >

        <
        div > Downloaded on: < p style = {
            { display: "inline", fontWeight: "bold", fontStyle: "italic" } } > { props.date.split('T')[0] } < /p></div >
        <
        button className = 'my-3'
        size = "sm" > < a href = { props.file }
        style = {
            { textDecoration: "none", color: "white" } } > Download Again < /a></button >

        <
        /div>
    )
}
export default ShowDownloadHistory;