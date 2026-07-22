import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

function OwnerCharts({ bookings }) {

    const monthly = {};

    bookings.forEach((b) => {

        const month = new Date(b.createdAt)
            .toLocaleString("default", {
                month: "short"
            });

        monthly[month] =
            (monthly[month] || 0) +
            Number(b.totalAmount || 0);

    });

    const monthlyData = Object.keys(monthly).map((m) => ({
        month: m,
        income: monthly[m]
    }));

    const statusData = [

        {
            name: "Pending",
            value: bookings.filter(
                b => b.status === "Pending"
            ).length
        },

        {
            name: "Accepted",
            value: bookings.filter(
                b => b.status === "Accepted"
            ).length
        },

        {
            name: "Completed",
            value: bookings.filter(
                b => b.status === "Completed"
            ).length
        }

    ];

    const COLORS = [
        "#f59e0b",
        "#3b82f6",
        "#22c55e"
    ];

    return (

        <div className="charts-grid">

            <div className="chart-box">

                <h2>Monthly Earnings</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={monthlyData}>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Bar
                            dataKey="income"
                            fill="#2563eb"
                            radius={[10,10,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-box">

                <h2>Booking Status</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie
                            data={statusData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >

                            {

                                statusData.map((item,index)=>(

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default OwnerCharts;