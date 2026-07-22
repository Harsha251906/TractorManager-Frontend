import { useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import OwnerLayout from "../layouts/OwnerLayout";

import FarmerDetails from "../components/FarmerDetails";
import WorkDetails from "../components/WorkDetails";
import PaymentDetails from "../components/PaymentDetails";
import Notes from "../components/Notes";
import SaveButton from "../components/SaveButton";

import "../styles/Form.css";

function Work() {

    const [form, setForm] = useState({

        date: "",

        farmerName: "",

        village: "",

        mobile: "",

        workType: "",

        calculationType: "hour",

        startTime: "",

        endTime: "",

        hours: 0,

        acres: 0,

        ratePerHour: 0,

        ratePerAcre: 0,

        totalAmount: 0,

        dieselUsed: 0,

        driverName: "",

        paymentStatus: "Pending",

        notes: ""

    });

    const calculateHours = (

        start,

        end

    ) => {

        if (!start || !end)

            return 0;

        const s = new Date(

            `1970-01-01T${start}`

        );

        const e = new Date(

            `1970-01-01T${end}`

        );

        let diff =

            (e - s) /

            (1000 * 60 * 60);

        if (diff < 0)

            diff += 24;

        return Number(

            diff.toFixed(2)

        );

    };
        const handleChange = (e) => {

        let updated = {

            ...form,

            [e.target.name]: e.target.value

        };

        if (

            updated.calculationType === "hour"

        ) {

            updated.hours = calculateHours(

                updated.startTime,

                updated.endTime

            );

            updated.totalAmount =

                updated.hours *

                Number(updated.ratePerHour);

        }

        if (

            updated.calculationType === "acre"

        ) {

            updated.totalAmount =

                Number(updated.acres) *

                Number(updated.ratePerAcre);

        }

        setForm(updated);

    };

    const saveWork = async (e) => {

        e.preventDefault();

        try {

            await api.post(

                "/work",

                form

            );

            toast.success(

                "✅ Work Saved Successfully"

            );

            setForm({

                date: "",

                farmerName: "",

                village: "",

                mobile: "",

                workType: "",

                calculationType: "hour",

                startTime: "",

                endTime: "",

                hours: 0,

                acres: 0,

                ratePerHour: 0,

                ratePerAcre: 0,

                totalAmount: 0,

                dieselUsed: 0,

                driverName: "",

                paymentStatus: "Pending",

                notes: ""

            });

        }

        catch (error) {

            console.log(error);

            toast.error(

                "❌ Error Saving Work"

            );

        }

    };

    return (

        <OwnerLayout>

            <div

                style={{

                    padding: "30px"

                }}

            >

                <form onSubmit={saveWork}>

                    <h1>

                        🚜 Add Tractor Work

                    </h1>
                                        <FarmerDetails

                        form={form}

                        handleChange={handleChange}

                    />

                    <hr />

                    <WorkDetails

                        form={form}

                        handleChange={handleChange}

                    />

                    <hr />

                    <PaymentDetails

                        form={form}

                        handleChange={handleChange}

                    />

                    <hr />

                    <Notes

                        form={form}

                        handleChange={handleChange}

                    />

                    <SaveButton />

                </form>

            </div>

        </OwnerLayout>

    );

}

export default Work;