import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import instance from "@/utils/Axios";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MapTable = () =>  {

    const [data, setData] = useState([]);
    const getData = async() => {
        try {
            const response = await instance.get("/user/getAllReports");
            if(response.data.success){
                setData(response.data.data);
            }
            } catch (error) {
            toast.error("An Error Occurred.")
            console.log(error);
            }
    };
    useEffect(() => {
        getData();
    },[])

    return (
        <Table className="overflow-x-auto w-5/6 " >
            <TableCaption>A list of your recent cases.</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead>CaseId</TableHead>
                <TableHead>Victim Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bully Behavior</TableHead>
                <TableHead>Evidence</TableHead>
                <TableHead>View</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {data && data.map((invoice) => (
                <TableRow key={invoice.caseId}>
                    <TableCell className="font-medium">{invoice.caseId}</TableCell>
                    <TableCell>{invoice.nameOFVictim}</TableCell>
                    <TableCell>{invoice.isResolved === true ? "Resolved" : "Pending"}</TableCell>
                    <TableCell>{invoice.reportedBy}</TableCell>
                    <TableCell>{invoice.incidentType[0]}</TableCell>
                    <TableCell>{invoice.bullyBehaviors[0]}</TableCell>
                    <TableCell>{invoice.evidence[0]}</TableCell>
                    <TableCell> 
                        <Link to={`/dashboard/case/${invoice._id}`} >
                            <EyeIcon className="h-6 w-6 text-blue-600"/> 
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
}

export default MapTable;