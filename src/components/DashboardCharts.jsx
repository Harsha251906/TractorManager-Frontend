import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

function DashboardCharts({ works, expenses }) {

    const income = works.reduce(
        (sum, w) => sum + Number(w.totalAmount || 0),
        0
    );

    const expense = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
    );

    const workTypes = {};

    works.forEach((work) => {
        workTypes[work.workType] =
            (workTypes[work.workType] || 0) + 1;
    });

    const incomeExpenseData = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                label: "Amount",
                data: [income, expense],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }
        ]
    };

    const workTypeData = {
        labels: Object.keys(workTypes),
        datasets: [
            {
                data: Object.values(workTypes),
                backgroundColor: [
                    "#16a34a",
                    "#f59e0b",
                    "#3b82f6",
                    "#ec4899",
                    "#9333ea",
                    "#06b6d4",
                    "#84cc16"
                ]
            }
        ]
    };

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "25px",
                marginTop: "40px"
            }}
        >

            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 20px rgba(0,0,0,.08)"
                }}
            >
                <h2>Income vs Expense</h2>

                <Bar data={incomeExpenseData} />
            </div>

            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 20px rgba(0,0,0,.08)"
                }}
            >
                <h2>Work Types</h2>

                <Pie data={workTypeData} />
            </div>

        </div>

    );

}

export default DashboardCharts;