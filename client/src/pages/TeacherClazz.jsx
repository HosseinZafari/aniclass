import ClassLinkItem from "src/component/ClassLinkItem";
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AniClassApi from "../apis/AniClassApi";
import ScaleLoader from 'react-spinners/ScaleLoader';
import {LoadingContext} from "../context/LoadingContext";
import {convertProgressLengthToPercent} from "../common/Useful";
import {UserContext} from "../context/UserContext";
import AddSessionDialog from "../component/AddSessionDialog";
import jMoment from 'moment-jalali';

const TeacherClazz = () => {
    const {user, setUser} = useContext(UserContext);
    const {percent, setPercent} = useContext(LoadingContext);
    const [showDialog, setShowDialog] = useState(false);

    const [classItem, setClassItem] = useState();
    const [sessionItems, setSessionItems] = useState(null);
    const [classReserved, setClassReserved] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        fetchClass();
        fetchSessions();
    }, []);

    const fetchClass = async () => {
        try {
            setPercent(0);
            const result = await AniClassApi(`/class/${id}`, {
                method: "GET",
                onDownloadProgress: event => {
                    const percent = convertProgressLengthToPercent(event.loaded, event.total);
                    setPercent(percent);
                }
            });


            if (result.data.status === "success") {
                setClassItem(result.data.data.class);
            } else {
                alert('کلاس مورد نظر یافت نشد!!!');
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setPercent(100);
        }
    }

    const fetchSessions = async () => {
        try {
            const result = await AniClassApi(`/class/${id}/session/`, {
                method: "GET"
            });

            setSessionItems(result.data.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const removeSession = async (session_id) => {
        try {
            const result = await AniClassApi(`/delete-session/`, {
                method: "DELETE" ,
                data: {
                    session_id: session_id
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    const disableSession = (dated , sessionTime , timeNow) => {
        if(jMoment(dated).format('YYYY-M-D') < jMoment().format('YYYY-M-D')) {
            return true;
        } else if(jMoment(dated).format('YYYY-M-D') === jMoment().format('YYYY-M-D')) {
            if(sessionTime <= timeNow) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="columns full-height fit-footer container m-rl-auto mt-5 mb-4">
            <div className="column is-one-fifths">
                <div
                    className="is-flex box border-top-left is-flex-direction-column is-justify-content-space-between">
                    <span
                        className="mb-2 is-size-5 has-text-weight-bold has-text-primary">نام درس : </span>
                    <span
                        className="is-size-6 has-text-weight-light ">{classItem != null ? classItem.title : (
                        <ScaleLoader color={"#6200EA"} className="is-align-content-center ml-5"
                                     height={25} margin={2} width={4} radius={2}/>)}</span>

                    <span className="mb-2 mt-3 is-size-5 has-text-weight-bold has-text-primary">نام رشته : </span>
                    <span
                        className="is-size-6 has-text-weight-light ">{classItem != null ? classItem.department_name : (
                        <ScaleLoader color={"#6200EA"} className="is-align-content-center ml-5"
                                     height={25} margin={2} width={4} radius={2}/>)} </span>
                </div>

                <div
                    className="is-flex box  is-flex-direction-column is-justify-content-space-between">
                    <span className="mb-2 is-size-5 has-text-weight-bold has-text-primary">نام استاد : </span>
                    <span
                        className="is-size-6 has-text-weight-light ">{classItem != null ? 'استاد : ' + classItem.teacher_name + '\t' + classItem.teacher_family : (
                        <ScaleLoader color={"#6200EA"} className="is-align-content-center ml-5"
                                     height={25} margin={2} width={4} radius={2}/>)}</span>
                </div>
            </div>

            <div className="column is-four-fifths">
                <div className="box border-top-right">
                    <span className="is-size-4 has-text-weight-bold has-text-primary">
                        توضیحات
                    </span>

                    <p className="has-text-justified p-2">
                        {classItem != null ? classItem.description : (
                            <ScaleLoader color={"#6200EA"} className="is-align-content-center ml-5"
                                         height={25} margin={2} width={4} radius={2}/>)} </p>
                </div>

                <div className="box">
                    <div className="is-flex is-align-items-center">
                        <span
                            className="is-size-5 has-text-weight-bold">جلسه های ایجاد شده کلاس</span>
                        {
                            classItem != null && user != null && classItem.teacher_id === user.id ? (
                                <>
                                    <button className="button is-link mr-4"
                                            onClick={e => setShowDialog(true)}>
                                        ایجاد جلسه
                                        <FontAwesomeIcon className="ml-2 mr-2" icon={faPlus}/>
                                    </button>

                                    {
                                        showDialog ? (
                                            <AddSessionDialog classId={id}
                                                              onClose={e => setShowDialog(false)}
                                                              onCreated={() => {
                                                                  setShowDialog(false);
                                                                  fetchSessions();
                                                              }
                                                              }
                                            />
                                        ) : ''
                                    }
                                </>
                            ) : ''
                        }
                    </div>

                    <br></br>
                    <br></br>
                    <table className="table full-width is-hoverable is-striped ">
                        <thead>
                        <tr>
                            <th><abbr className="is-size-6">توضیح</abbr></th>
                            <th><abbr className="is-size-6">زمان</abbr></th>
                            <th><abbr className="is-size-6">تاریخ</abbr></th>
                            <th><abbr className="is-size-6">لینک ها</abbr></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sessionItems != null ? sessionItems.map(session => {
                            const sessionTime = parseInt(jMoment(session.dated).add(session.time, 'hours').format('H'));
                            const timeNow = parseInt(jMoment().add(-1, 'hours').format('H'));

                            return (
                                <ClassLinkItem
                                    key={session.session_id}
                                    session_id={session.session_id}
                                    disable={disableSession(session.dated , sessionTime , timeNow)}
                                    description={"ورود به کلاس"}
                                    time={session.time}
                                    date={jMoment(session.dated).format('jYYYY-jM-jD')}
                                    link={session.link}
                                    isTeacher={true}
                                    onDelete={(session_id) => {
                                        removeSession(session_id);
                                        fetchSessions();
                                    }}
                                />
                            )
                        }) : (<ScaleLoader
                            color={"#6200EA"}
                            className="is-align-content-center ml-5"
                            height={25}
                            margin={2}
                            width={4}
                            radius={2}
                        />)}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}


export default TeacherClazz;