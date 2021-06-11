import React, {useContext, useEffect, useState} from 'react';
import SearchMain from 'src/component/SearchMain';
import AniClassApi from "../apis/AniClassApi";
import {convertProgressLengthToPercent, useQuery} from "../common/Useful";
import {useHistory} from 'react-router-dom';
import { LoadingContext }from "../context/LoadingContext";
import ClassItem from "../component/ClassItem";
import ScaleLoader from "react-spinners/ScaleLoader";

const Home = (props) => {
    const [user , setUser] = useState(null);
    const history = useHistory();
    const [notify , setNotify] = useState('');
    const {percent , setPercent} = useContext(LoadingContext);
    const [classItems , setClassItems] = useState([]);
    const [department , setDepartment] = useState([]);
    const [province , setProvince] = useState([]);
    const [uni , setUni] = useState([]);
    const query = useQuery();


    useEffect(() => {
        try {
            loggindRedirect();
            registerdRedirect();
            updatedRedirect();
            getLastClasses();
            getDepartments();
            getProvince();
            getUni();
        } catch (err) {
            console.log(err)
        }

    } , []);

    const registerdRedirect = () => {
        if(query.get('registerd')) {
            setNotify(
                <div className={"columns"}>
                    <div className="column is-6 is-offset-3 notification is-success is-light">
                        <button onClick={ () => setNotify('') } className="delete" />
                        شما با موفقیت ثبت نام شدید !!! شما اکنون میتوانید در کلاس های ایجاد شده شرکت کنید .
                    </div>
                </div>
            );
        }
    }

    const loggindRedirect = () => {
        if(query.get('loggind')) {
            setNotify(
                <div className={"columns"}>
                    <div className="column is-6 is-offset-3 notification is-success is-light">
                        <button onClick={ () => setNotify('') } className="delete" />
                        شما با موفقیت وارد حساب خود شده اید.
                    </div>
                </div>
            );
        }
    }
    const updatedRedirect = () => {
        if(query.get('updated')) {
            setNotify(
                <div className={"columns"}>
                    <div className="column is-6 is-offset-3 notification is-success is-light">
                        <button onClick={ () => setNotify('') } className="delete" />
                        اطلاعات حساب کاربری شما با موفقیت بروز شد.
                    </div>
                </div>
            );
        }
    }

    const getLastClasses = async () => {
        try {
            setPercent(0);
            const result = await AniClassApi('/classes' , {
                method: 'GET' ,
                onDownloadProgress: event => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });

            if(result.data.status === 'success') {
                setClassItems(result.data.data);
            } else {
                setClassItems(null);
            }
        } catch (err) {
            console.log(err.message);
            setClassItems(null);
        } finally {
            setPercent(100)
        }
    }

    const getDepartments = async () => {
        try {
            const result = await AniClassApi('/departments' , {
                method: 'GET'
            });
            if(result.data.status === 'success') {
                setDepartment(result.data.data);
            } else {
                setDepartment(null);
            }
        } catch (err) {
            console.log(err.message);
            setDepartment(null);
        }
    }

    const getProvince = async () => {
        try {
            const result = await AniClassApi('/all-province' , {
                method: 'GET'
            });

            if(result.data.status === 'success') {
                setProvince(result.data.data);
            } else {
                setProvince(null);
            }
        } catch (err) {
            console.log(err.message);
            setProvince(null);
        }
    }

    const getUni = async () => {
        try {
            const result = await AniClassApi('/universities' , {
                method: 'GET'
            });

            if(result.data.status === 'success') {
                setUni(result.data.data);
            } else {
                setUni(null);
            }
        } catch (err) {
            console.log(err.message);
            setUni(null);
        }
    }

    const placeHolderClassItem = () => {
        if(classItems == null) {
            return (<h4 className="has-text-danger mb-4">کلاسی وجود ندارد!</h4>);
        } else {
            return (<ScaleLoader color={"#6200EA"} className="is-align-content-center ml-5" height={50} margin={4} width={6} radius={4}/>) ;
        }
    }

    const submitSearch = async (province_id , department_id , uni_id , inputSearch) => {
        try {
            if(inputSearch == null || inputSearch.length < 3) {
                return; // search blocked it's tiny length for searching
            }
            setPercent(0)
            const result = await AniClassApi('/search' , {
                method: "GET" ,
                params: {
                    city: province_id ,
                    department: department_id ,
                    uni: uni_id ,
                    words: inputSearch
                } ,
                onDownloadProgress: event => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });

            if(result.data.status === 'success') {
                setClassItems(result.data.data);
            } else {
                setClassItems(null);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setPercent(100)
        }
    }

    return (
        <div className="home full-height">
            <SearchMain
                uni={uni}
                department={department}
                province={province}
                onSubmit={submitSearch}
            />
            {notify ? notify : ''}

            <div className="container is-flex is-justify-content-center is-flex-wrap-wrap mt-6 mb-6 ">
                {classItems == null || classItems.length === 0 ? placeHolderClassItem() :
                    classItems.map(item =>
                        <ClassItem key={item.id}
                                   uni={item.uni}
                                   department={item.department}
                                   title={item.title}
                                   teacher={item.teacher_name + '  ' + item.teacher_family}
                                   link={`/class/${item.id}`}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Home;
