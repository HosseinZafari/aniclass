import React, {Component, useState} from 'react'
import { Calendar , DatePicker} from 'react-persian-datepicker';
import jMoment from 'moment-jalali';
import AniClassApi from "../apis/AniClassApi";

const AddSessionDialog = (props) => {
    const [dateSession , setDateSession] = useState(jMoment().format('YYYY-MM-DD'));
    const [times , setTimes] = useState([]);
    const [timeSelectedId , setTimeSelectedId] = useState(-1);

    const styles = {
        selected: "selected",
        calendarContainer: "calendarContainer",
        dayPickerContainer: "dayPickerContainer",
        monthsList: "monthsList",
        daysOfWeek: "daysOfWeek",
        dayWrapper: "dayWrapper",
        heading: "heading",
        next: "next",
        prev: "prev",
        title: "title",
    };


    const submit = async () => {
        try {
            const result = await AniClassApi('/create-session/' , {
                method: "POST" ,
                data: {
                    class_id: parseInt(props.classId) ,
                    date: dateSession ,
                    time_id: timeSelectedId
                }
            });

            if(result.data.status === 'success') {
                props.onCreated();
            }
        } catch (err) {
            console.log(err.message);

        }

    }

    const onSelectHandle = async (value) => {
        const newDate = String(jMoment(value).format('YYYY-MM-DD'));
        setDateSession(newDate);
        // restart availible times
        setTimes(null);
        setTimeSelectedId(-1);
        fetchSessionTimeOneDay(newDate);
    }

    const fetchSessionTimeOneDay = async (date) => {
        try {
            const result = await AniClassApi('/teacher-get-session/' , {
                method: "POST" ,
                data: {
                    date: date ,
                    class_id: parseInt(props.classId)
                }
            });

            setTimes(result.data.data);
        } catch (err) {
            // TODO : ERROR HANDLE
            console.log(err.message)
        }
    }


    const placeHolderTime = () => {
        if(times == null) {
            return <option value={-1}>در حال بارگذاری...</option>
        } else if(times.length === 0) {
            return <option value={-1}>هیچ زمانی در این تاریخ در دسترس نیست!</option>
        }
    }

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content  box">
                <p className="is-size-4 has-text-weight-bold is-center-text mb-4 has-text-primary">لطفا
                    زمان و تاریخ جلسه بعدی را مشخص کنید.</p>
                <div className="is-flex  is-align-items-center ">
                    <Calendar
                        className="mb-2"
                        inputFormat="jYYYY/jM/jD"
                        value={dateSession}
                        styles={styles}
                        onSelect={onSelectHandle}
                        min={jMoment().subtract(1, 'days')}
                        max={jMoment().add(50, 'days')}
                    />

                    <div className="control mr-3 is-flex">
                        <div className="select is-success">
                            <select defaultValue={-1} onChange={el => setTimeSelectedId(el.target.value)}>
                                <option value={-1}>انتخاب ساعت های دردسترس</option>
                                {
                                    times == null || times.length === 0 ?
                                        placeHolderTime() : times.map(value => {
                                       return <option key={value.id} value={value.id}>{value.time}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button onClick={submit} className="button is-success mr-2">ایجاد کلاس</button>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" onClick={props.onClose} aria-label="close">
            </button>
        </div>
    );
}


export default AddSessionDialog;