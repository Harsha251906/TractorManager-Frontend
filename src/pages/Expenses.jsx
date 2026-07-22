import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import Loading from "../components/Loading";
import OwnerLayout from "../layouts/OwnerLayout";

import "../styles/Form.css";
import "../styles/Expenses.css";

function Expenses() {

    const [expense, setExpense] = useState({

        category: "",

        amount: "",

        date: "",

        notes: ""

    });

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadExpenses = async () => {

        try {

            setLoading(true);

            const res = await api.get("/expenses");

            setExpenses(res.data.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadExpenses();

    }, []);

    const handleChange = (e) => {

        setExpense({

            ...expense,

            [e.target.name]: e.target.value

        });

    };

    const saveExpense = async (e) => {

        e.preventDefault();

        try {

            await api.post(

                "/expenses",

                expense

            );

            toast.success(

                "Expense Saved Successfully"

            );

            setExpense({

                category: "",

                amount: "",

                date: "",

                notes: ""

            });

            loadExpenses();

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Error saving expense"

            );

        }

    };

    if (loading) {

        return <Loading />;

    }

    return (

        <OwnerLayout>

            <div className="expense-page">

                <form onSubmit={saveExpense}>

                    <h1>⛽ Tractor Expenses</h1>
                                        <select
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option>Diesel</option>

                        <option>Repair</option>

                        <option>Service</option>

                        <option>Oil</option>

                        <option>Other</option>

                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        rows="5"
                        name="notes"
                        placeholder="Notes"
                        value={expense.notes}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        💾 Save Expense
                    </button>

                </form>

                <div className="expense-table">

                    <h2>Expense History</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Category</th>

                                <th>Amount</th>

                                <th>Date</th>

                                <th>Notes</th>

                            </tr>

                        </thead>

                        <tbody>
                                                      {expenses.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}
                                    >
                                        No expenses found.
                                    </td>

                                </tr>

                            ) : (

                                expenses.map((item) => (

                                    <tr key={item._id}>

                                        <td>{item.category}</td>

                                        <td>₹{item.amount}</td>

                                        <td>{item.date}</td>

                                        <td>{item.notes}</td>

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

export default Expenses;