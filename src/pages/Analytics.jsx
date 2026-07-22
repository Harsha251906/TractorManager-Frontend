import { useEffect, useState } from "react";

import api from "../services/api";

import OwnerLayout from "../layouts/OwnerLayout";

import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    ArcElement,

    BarElement,

    Tooltip,

    Legend

} from "chart.js";

import {

    Line,

    Pie,

    Bar

} from "react-chartjs-2";

import "../styles/Analytics.css";

ChartJS.register(

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    ArcElement,

    BarElement,

    Tooltip,

    Legend

);

function Analytics() {

    const [works, setWorks] = useState([]);

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const workRes = await api.get("/work");

            const expenseRes = await api.get("/expenses");

            console.log("WORKS =>", workRes.data);

            console.log("EXPENSES =>", expenseRes.data);

            setWorks(workRes.data.data || []);

            setExpenses(expenseRes.data.data || []);

        }

        catch (err) {

            console.log(err);

        }

    };

    const months = [

        "Jan",

        "Feb",

        "Mar",

        "Apr",

        "May",

        "Jun",

        "Jul",

        "Aug",

        "Sep",

        "Oct",

        "Nov",

        "Dec"

    ];

    const income = new Array(12).fill(0);

    works.forEach((work) => {

        const m = new Date(work.date).getMonth();

        if (!isNaN(m))

            income[m] += Number(work.totalAmount || 0);

    });

    const expense = new Array(12).fill(0);

    expenses.forEach((exp) => {

        const m = new Date(exp.date).getMonth();

        if (!isNaN(m))

            expense[m] += Number(exp.amount || 0);

    });

    const profit = income.map(

        (inc, i) => inc - expense[i]

    );

    const tractorUsage = {};

    works.forEach((work) => {

        const tractor =

            work.tractorName || "Unknown";

        tractorUsage[tractor] =

            (tractorUsage[tractor] || 0) + 1;

    });

    return (

        <OwnerLayout>

            <div className="analytics-page">

                <h1>📊 Analytics Dashboard</h1>

                <div className="chart-grid">
                                  <div className="chart-card">

                    <h2>📈 Monthly Income</h2>

                    <Line

                        data={{

                            labels: months,

                            datasets: [

                                {

                                    label: "Income (₹)",

                                    data: income,

                                    borderWidth: 3,

                                    tension: 0.4,

                                    fill: true

                                }

                            ]

                        }}

                    />

                </div>

                <div className="chart-card">

                    <h2>💸 Monthly Expenses</h2>

                    <Bar

                        data={{

                            labels: months,

                            datasets: [

                                {

                                    label: "Expenses (₹)",

                                    data: expense,

                                    borderWidth: 2

                                }

                            ]

                        }}

                    />

                </div>

                <div className="chart-card">

                    <h2>💰 Income vs Expense</h2>

                    <Pie

                        data={{

                            labels: [

                                "Income",

                                "Expense"

                            ],

                            datasets: [

                                {

                                    data: [

                                        income.reduce(

                                            (a, b) => a + b,

                                            0

                                        ),

                                        expense.reduce(

                                            (a, b) => a + b,

                                            0

                                        )

                                    ]

                                }

                            ]

                        }}

                    />

                </div>

                <div className="chart-card">

                    <h2>🚜 Tractor Usage</h2>

                    <Bar

                        data={{

                            labels: Object.keys(

                                tractorUsage

                            ),

                            datasets: [

                                {

                                    label: "Total Works",

                                    data: Object.values(

                                        tractorUsage

                                    ),

                                    borderWidth: 2

                                }

                            ]

                        }}

                    />

                </div>

                <div className="chart-card">

                    <h2>📊 Monthly Profit</h2>

                    <Line

                        data={{

                            labels: months,

                            datasets: [

                                {

                                    label: "Profit (₹)",

                                    data: profit,

                                    borderWidth: 3,

                                    tension: 0.4,

                                    fill: true

                                }

                            ]

                        }}

                    />

                </div>

            </div>

        </div>

    </OwnerLayout>

);

}

export default Analytics;