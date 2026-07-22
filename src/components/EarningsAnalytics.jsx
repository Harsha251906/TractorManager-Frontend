import CountUp from "react-countup";

function EarningsAnalytics({ bookings }) {

    let earnings = 0;
    let completed = 0;
    let pending = 0;

    bookings.forEach((booking) => {

        if (booking.status === "Completed") {

            completed++;
            earnings += Number(booking.totalAmount || 0);

        }

        if (booking.status === "Pending") {

            pending++;

        }

    });

    const completionRate =
        bookings.length === 0
            ? 0
            : Math.round((completed / bookings.length) * 100);

    return (

        <div className="analytics-grid">

            <div className="analytics-card">

                <h4>Total Earnings</h4>

                <h1>

                    ₹

                    <CountUp

                        end={earnings}
                        duration={2}

                    />

                </h1>

            </div>

            <div className="analytics-card">

                <h4>Completed Jobs</h4>

                <h1>

                    <CountUp

                        end={completed}
                        duration={2}

                    />

                </h1>

            </div>

            <div className="analytics-card">

                <h4>Pending Requests</h4>

                <h1>

                    <CountUp

                        end={pending}
                        duration={2}

                    />

                </h1>

            </div>

            <div className="analytics-card">

                <h4>Completion Rate</h4>

                <h1>

                    <CountUp

                        end={completionRate}
                        duration={2}

                    />

                    %

                </h1>

                <div className="progress">

                    <div

                        className="progress-fill"

                        style={{

                            width: `${completionRate}%`

                        }}

                    />

                </div>

            </div>

        </div>

    );

}

export default EarningsAnalytics;