import React, {useState} from 'react';

const SearchMain = (props) => {
    const [selectedDepartment , setSelectedDepartment] = useState(-1);
    const [selectedUni , setSelectedUni] = useState(-1);
    const [selectedProvince , setSelectedProvince] = useState(-1);
    const [inputSearch , setInputSearch] = useState(null);

    const getPlaceHolderSelectBox = (value) => {
        if(value === null) {
            return (
                <option className="has-text-danger" value={-1}>
                    مشکل در دریافت اطلاعات
                </option>
            )
        } else {
            return (
                <option className="has-text-warning" value={-1}>
                    در حال بارگذاری...
                </option>
            )
        }
    }


    return (
        <div className="control is-align-items-center is-flex is-justify-content-center box">
            <div className="field has-addons">
                <p className="control">
                    <span className="select">
                        <select defaultValue={-1} onChange={el => setSelectedProvince(el.target.value)}>
                            <option value={-1}>همه ایران</option>
                            {props.province != null && props.province.length > 0 ?
                                props.province.map(item =>
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ) : (
                                    getPlaceHolderSelectBox(props.province)
                                )
                            }
                        </select>
                    </span>
                </p>
                <p className="control">
                    <span className="select">
                        <select defaultValue={-1} onChange={el => setSelectedUni(el.target.value)}>
                            <option value={-1}>همه دانشگاه</option>
                            {props.uni != null && props.uni.length > 0 ?
                                props.uni.map(item =>
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ) : (
                                    getPlaceHolderSelectBox(props.uni)
                                )
                            }
                        </select>
                    </span>
                </p>
                <p className="control">
                    <span className="select">
                        <select defaultValue={-1} onChange={el => setSelectedDepartment(el.target.value)}>
                            <option value={-1}>همه گروه ها</option>
                            {props.department != null && props.department.length > 0 ?
                                props.department.map(item =>
                                    <option key={item.id} value={item.id}>
                                        {item.department_name}
                                    </option>
                                ) : (
                                    getPlaceHolderSelectBox(props.department)
                                )
                            }
                        </select>
                    </span>
                </p>
                <p className="control is-expanded " style={{width: "300px"}}>
                    <input className="input" onChange={el => setInputSearch(el.target.value)} type="text" placeholder="جستجوی نام درس و معلم ..." />
                </p>
                <p className="control">
                    <button className="button is-success" onClick={ el =>
                        props.onSubmit(selectedProvince , selectedDepartment , selectedUni , inputSearch)
                    }>
                        جستجو
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SearchMain;