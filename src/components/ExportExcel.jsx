import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportExcel({ works }) {

    const exportToExcel = () => {

        const data = works.map((work, index) => ({

            "S.No": index + 1,

            "Date": work.date,

            "Farmer Name": work.farmerName,

            "Village": work.village,

            "Mobile": work.mobile,

            "Tractor": work.tractorName,

            "Tractor Number": work.tractorNumber,

            "Work Type": work.workType,

            "Calculation": work.calculationType,

            "Hours": work.hours,

            "Acres": work.acres,

            "Rate/Hour": work.ratePerHour,

            "Rate/Acre": work.ratePerAcre,

            "Diesel Used (L)": work.dieselUsed,

            "Driver": work.driverName,

            "Amount (₹)": work.totalAmount,

            "Payment": work.paymentStatus,

            "Notes": work.notes

        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Tractor Works"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

        saveAs(
            file,
            `Tractor_Work_Report_${new Date().toLocaleDateString().replace(/\//g,"-")}.xlsx`
        );

    };

    return (

        <button
            onClick={exportToExcel}
            style={{
                background:"#198754",
                color:"white",
                border:"none",
                padding:"12px 22px",
                borderRadius:"10px",
                cursor:"pointer",
                fontSize:"16px",
                fontWeight:"bold",
                marginBottom:"20px"
            }}
        >
            📊 Export Excel
        </button>

    );

}

export default ExportExcel;