import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Panel from './Panel';
import AniClassApi from "../apis/AniClassApi";
import {useHistory} from "react-router-dom";
import {LoadingContext} from "../context/LoadingContext";
import {convertProgressLengthToPercent} from "../common/Useful";

const TeacherPanelAddClass = () => {
    const {percent , setPercent} = useContext(LoadingContext);
    const [title , setTitle] = useState(null);
    const [code , setCode] = useState(null);
    const [capasity , setCapasity] = useState(null);
    const [link , setLink] = useState(null);
    const [desc , setDesc] = useState(null);
    const [selectedDepartment , setSelectedDepartment] = useState(-1);
    const [selectedUniversity , setSelectedUniversity] = useState(-1);
    const [departments , setDepartments] = useState(null);
    const [universities , setUniversities] = useState(null);
    const [isValid , setIsValid] = useState(null);
    const history = useHistory();

    useEffect(()=> {
        setPercent(0);
        fetch();
        setPercent(100);
    } , []);

    fetch = async () => {
        await departmentsFetch();
        await universitiesFetch();
    }

    const universitiesFetch = async () => {
        try {
            const universitiesResult = await AniClassApi('/universities' , {
                method: "GET"
            });

            setUniversities(universitiesResult.data.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const departmentsFetch = async () => {
        try {
            const departmentResult = await AniClassApi('/departments' , {
                method: "GET"
            });

            setDepartments(departmentResult.data.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const submit = (event) => {
        event.preventDefault();
        // check validate
        const isValid = isHaveNullInput();
        if(isValid.error) {
            setIsValid(isValid);
            return;
        }

        fetchAddClass();
    }

    const fetchAddClass = async () => {
        try {
            setPercent(0)
            const result = await AniClassApi('/create-class' , {
                method: "POST" ,
                data: {
                    description: desc ,
                    link: link ,
                    title: title ,
                    class_code: code ,
                    capasity: capasity ,
                    department_id: selectedDepartment ,
                    university_id: selectedUniversity
                } ,
                onDownloadProgress: (event) => {
                    const percent = convertProgressLengthToPercent(event.loaded , event.total);
                    setPercent(percent);
                }
            });

            if(result.data.status === 'error') {
                setIsValid({error: "capasity" , msg: result.data.message })
            } else {
                history.push(`/class/${result.data.id}`);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setPercent(100);
        }
    }

    const isHaveNullInput = () => {
        if(title == null || title.length < 1) {
            return {error: "title" , msg: '???????? ?????????? ???????? ???? ???????? ????????????'};
        }
        if(code == null || code.length < 1) {
            return {error: "code" , msg: '???????? ???? ?????? ???????? ?????? ???? ???????? ????????'};
        }
        if(link == null || link.length < 1) {
            return {error: "link" , msg: '???????? ???????? ???????? ?????? ???? ???????? ????????????'};
        }
        if(capasity == null) {
            return {error: "capasity" , msg: '???????? ?????????? ???????? ?????? ???? ?????????? ???????? (?????????? ?????????? ???? ???? ???????? ?????????? ?????????????? ????????).'};
        }
        if(parseInt(selectedUniversity) === -1) {
            return {error: "university", msg: '???????? ?????????????? ?????? ???? ???????????? ????????????.'};
        }
        if(parseInt(selectedDepartment) === -1) {
            return {error: "department" , msg: '???????? ???????????????? ???????? ?????? ???? ???????????? ????????????.'}
        }
        if(desc === null || desc.length < 1) {
            return {error: "desc" , msg: '???????? ???????????????? ???? ???????? ???????? ?????????? ????????.'}
        }
        return {error : false} ;
    };

    return (
        <Panel>
            <p className="is-size-6 has-text-weight-light panel-tabs">
                <Link to="/teacher-panel/new-class" className="is-active">???????? ???????? ????????</Link>
                <Link to="/teacher-panel/lessons" >???????? ?????? ?????????? ??????</Link>
                <Link to="/teacher-panel/setting" >??????????????</Link>
                <Link to="/teacher-panel/logout">????????</Link>
            </p>

            <div className="mt-4 p-5 is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
                <form onSubmit={submit}>
                    <h4 className="is-size-4 mb-5 has-text-weight-bold is-center-text has-text-primary">???????? ????????</h4>
                    <div className="field">
                        <label className="label">?????????? ????????</label>
                        <div className="control">
                            <input onChange={e => setTitle(e.target.value)} className="input is-primary" type="text" placeholder=" ???? ?????? ???????? ???????? ?????????? ???????????? " />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">???? ????????</label>
                        <div className="control">
                            <input  onChange={e => setCode(e.target.value)} className="input is-primary" type="number" placeholder="54888005 " />
                        </div>
                    </div>

                     <div className="field">
                        <label className="label">?????????? ????????</label>
                        <div className="control">
                            <input  onChange={e => setCapasity(e.target.value)} className="input is-primary" type="number" placeholder="50 " />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">???????? ????????</label>
                        <div className="control">
                            <input  onChange={e => setLink(e.target.value)} className="input is-primary" type="url" placeholder="https://example.com/ " />
                        </div>
                    </div>

                    <div className="control is-flex is-justify-content-space-between ">
                        <div className="select is-primary">
                            <select defaultValue={-1} onChange={(ele) => setSelectedDepartment(ele.target.value)}>
                                <option  value={-1}> ???????????? ???????????????? </option>
                                {departments == null ? (
                                        <option value={-1}> ???? ?????? ????????????????... </option>) :
                                    departments.map(department =>
                                        <option key={department.id} value={department.id}>{department.department_name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="select is-primary">
                            <select defaultValue={-1} onChange={(ele) => setSelectedUniversity(ele.target.value)}>
                                <option value={-1}> ???????????? ?????????????? </option>
                                {universities == null ? (
                                        <option value={-1}> ???? ?????? ????????????????... </option>) :
                                    universities.map(university =>
                                        <option key={university.id} value={university.id}>{university.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <textarea onChange={e => setDesc(e.target.value)} className="textarea is-primary mt-4 mb-4" placeholder="?????????????? ?????????? ???? ???????? ????????">
                    </textarea>
                    <div className="is-danger has-text-weight-bold has-text-danger is-center-text">
                        {isValid != null ? isValid.msg : ''}
                    </div><br></br>

                    <button type={'submit'} className="button is-success mb-2 is-fullwidth">
                        ?????????? ????????
                    </button>

                </form>
            </div>
        </Panel>
    );
}

export default TeacherPanelAddClass;