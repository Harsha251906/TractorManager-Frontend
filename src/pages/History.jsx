import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import Loading from "../components/Loading";
import OwnerLayout from "../layouts/OwnerLayout";

import "../styles/History.css";

function History() {

    const [works, setWorks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedDate, setSelectedDate] = useState("");

    const loadWorks = async () => {

        try {

            setLoading(true);

            const res = await api.get("/work");

            setWorks(res.data.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadWorks();

    }, []);

    const deleteWork = async (id) => {

        if (!window.confirm("Delete this work?"))

            return;

        try {

            await api.delete(`/work/${id}`);

            loadWorks();

        }

        catch {

            toast.error("Delete failed");

        }

    };

    const togglePayment = async (id) => {

        try {

            await api.put(`/work/${id}/payment`);

            loadWorks();

        }

        catch {

            toast.error("Unable to update payment");

        }

    };
        const filteredWorks = works.filter((work) => {

        const farmer =

            (work.farmerName || "")

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                );

        const date =

            selectedDate === "" ||

            work.date === selectedDate;

        return farmer && date;

    });

    if (loading) {

        return <Loading />;

    }

    return (

        <OwnerLayout>

            <div className="history-page">

                <div className="history-card">

                    <h1 className="history-title">

                        📜 Tractor Work History

                    </h1>

                    <div className="filter-box">

                        <input

                            type="text"

                            placeholder="🔍 Search Farmer..."

                            value={search}

                            onChange={(e) =>

                                setSearch(

                                    e.target.value

                                )

                            }

                        />

                        <input

                            type="date"

                            value={selectedDate}

                            onChange={(e) =>

                                setSelectedDate(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <table className="history-table">

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Farmer</th>

                                <th>Village</th>

                                <th>Work</th>

                                <th>Amount</th>

                                <th>Payment</th>

                                <th>Delete</th>

                            </tr>

                        </thead>

                        <tbody>
                                                      {filteredWorks.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center",
                                            padding: "30px"
                                        }}
                                    >
                                        No work found.
                                    </td>

                                </tr>

                            ) : (

                                filteredWorks.map((work) => (

                                    <tr key={work._id}>

                                        <td>{work.date}</td>

                                        <td>{work.farmerName}</td>

                                        <td>{work.village}</td>

                                        <td>{work.workType}</td>

                                        <td>
                                            ₹{Number(work.totalAmount).toLocaleString()}
                                        </td>

                                        <td>

                                            <button
                                                className={
                                                    work.paymentStatus === "Paid"
                                                        ? "paid"
                                                        : "pending"
                                                }
                                                onClick={() =>
                                                    togglePayment(work._id)
                                                }
                                            >
                                                {work.paymentStatus}
                                            </button>

                                        </td>

                                        <td>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteWork(work._id)
                                                }
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </OwnerLayout>

    );

}

export default History;