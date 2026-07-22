import { useEffect, useState } from "react";

import api from "../services/api";

import OwnerLayout from "../layouts/OwnerLayout";

import "../styles/Reports.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

function Reports() {

    const [works, setWorks] = useState([]);

    const [expenses, setExpenses] = useState([]);

    const [report, setReport] = useState({

        income: 0,

        expense: 0,

        profit: 0,

        acres: 0,

        totalWorks: 0

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const workRes = await api.get("/work");

            const expenseRes = await api.get("/expenses");

            const workData = workRes.data.data || [];

            const expenseData = expenseRes.data.data || [];

            setWorks(workData);

            setExpenses(expenseData);

            calculateReport(

                workData,

                expenseData

            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const calculateReport = (

        workData,

        expenseData

    ) => {

        let income = 0;

        let expense = 0;

        let acres = 0;

        workData.forEach((work) => {

            income += Number(

                work.totalAmount || 0

            );

            acres += Number(

                work.acres || 0

            );

        });

        expenseData.forEach((item) => {

            expense += Number(

                item.amount || 0

            );

        });

        setReport({

            income,

            expense,

            profit: income - expense,

            acres,

            totalWorks: workData.length

        });

    };
        const downloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text(

            "Tractor Manager Report",

            14,

            15

        );

        doc.setFontSize(12);

        doc.text(

            `Income : ₹${report.income}`,

            14,

            30

        );

        doc.text(

            `Expense : ₹${report.expense}`,

            14,

            38

        );

        doc.text(

            `Profit : ₹${report.profit}`,

            14,

            46

        );

        doc.text(

            `Total Acres : ${report.acres}`,

            14,

            54

        );

        doc.text(

            `Total Works : ${report.totalWorks}`,

            14,

            62

        );

        autoTable(doc, {

            startY: 72,

            head: [[

                "Farmer",

                "Village",

                "Work",

                "Acres",

                "Amount"

            ]],

            body: works.map((work) => [

                work.farmerName,

                work.village,

                work.workType,

                work.acres,

                work.totalAmount

            ])

        });

        doc.save("Farm_Report.pdf");

    };

    const downloadExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(

            works.map((work) => ({

                Farmer: work.farmerName,

                Village: work.village,

                Work: work.workType,

                Acres: work.acres,

                Amount: work.totalAmount

            }))

        );

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Report"

        );

        const excelBuffer = XLSX.write(

            workbook,

            {

                bookType: "xlsx",

                type: "array"

            }

        );

        const file = new Blob(

            [excelBuffer],

            {

                type: "application/octet-stream"

            }

        );

        saveAs(

            file,

            "Farm_Report.xlsx"

        );

    };

    return (

        <OwnerLayout>

            <div className="reports-page">

                <h1>📊 Reports</h1>

                <div

                    style={{

                        marginBottom: "20px",

                        display: "flex",

                        gap: "15px"

                    }}

                >

                    <button

                        onClick={downloadPDF}

                        className="download-btn"

                    >

                        📄 Download PDF

                    </button>

                    <button

                        onClick={downloadExcel}

                        className="download-btn"

                    >

                        📊 Download Excel

                    </button>

                </div>

                <div className="report-cards">
                                        <div className="report-card">

                        <h3>Total Income</h3>

                        <h2>₹{report.income}</h2>

                    </div>

                    <div className="report-card">

                        <h3>Total Expense</h3>

                        <h2>₹{report.expense}</h2>

                    </div>

                    <div className="report-card">

                        <h3>Total Profit</h3>

                        <h2>₹{report.profit}</h2>

                    </div>

                    <div className="report-card">

                        <h3>Total Acres</h3>

                        <h2>{report.acres}</h2>

                    </div>

                    <div className="report-card">

                        <h3>Total Works</h3>

                        <h2>{report.totalWorks}</h2>

                    </div>

                </div>

                <h2>📋 Work History</h2>

                <table className="report-table">

                    <thead>

                        <tr>

                            <th>Farmer</th>

                            <th>Village</th>

                            <th>Work</th>

                            <th>Acres</th>

                            <th>Amount</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            works.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}
                                    >
                                        No Records
                                    </td>

                                </tr>

                            ) : (

                                works.map((work) => (

                                    <tr key={work._id}>

                                        <td>{work.farmerName}</td>

                                        <td>{work.village}</td>

                                        <td>{work.workType}</td>

                                        <td>{work.acres}</td>

                                        <td>₹{work.totalAmount}</td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </OwnerLayout>

    );

}

export default Reports;