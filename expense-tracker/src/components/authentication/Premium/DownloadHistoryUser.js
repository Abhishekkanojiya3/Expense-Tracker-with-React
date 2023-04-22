import { useSelector } from "react-redux";
import ShowDownloadHistory from "./ShowDownloadHistory";
import './ShowDownloadHistory.css'

const DownloadHistoryUser = () => {

    const downloadHistory = useSelector(state => state.expense.downloadHistory)

    return ( <
        div className = "downloadhistory" >

        {
            downloadHistory.map((data, index) => (

                <
                ShowDownloadHistory file = { data.fileURL }
                date = { data.createdAt }
                />
            ))
        } <
        /div>
    )

}
export default DownloadHistoryUser;