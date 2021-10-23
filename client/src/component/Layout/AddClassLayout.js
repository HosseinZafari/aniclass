import {
  AppBar,
  Button,
  Dialog,
  Fade,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  Switch,
  Tab,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Security } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { AddBox } from "@material-ui/icons";
import SimpleSnackbar from "../Notify/SimpleSnackbar";
import {
  addDepartment,
  addLesson,
  getDepartmenstTeacher,
  getUniversitiesApi,
} from "../../apis/AuthApi";

const AddClassLayout = (props) => {
  const [securityCode, setSecurityCode] = useState("");
  const [universities, setUniversities] = useState([]);
  const [isNotify, setIsNotify] = useState({ msg: "", show: false });
  const [isError, setIsError] = useState({ msg: "", show: false });
  const [title, setTitle] = useState("");
  const [classCode, setClassCode] = useState(-1);
  const [link, setLink] = useState("");
  const [capacity, setCapacity] = useState(-1);
  const [desc, setDesc] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [listDepartment, setListDepartment] = useState([]);
  const [listUniversity, setListUniversity] = useState([]);

  useEffect(() => {
    getUniversities();
  }, []);

  const onSubmit = async (v) => {

    if(title === ''){
      return setIsError({
        show: true,
        msg: 'لطفاعنوان کلاس خود را وارد کنید'
      })
    }
    
    if(capacity === -1){
      return setIsError({
        show: true,
        msg: 'لطفا ظرفیت خود را وارد کنید'
      })
    } 

    if(classCode === -1){
      return setIsError({
        show: true,
        msg: 'لطفا کد کلاس خود را وارد کنید'
      })
    } 
    
    if(link === ''){
      return setIsError({
        show: true,
        msg: 'لطفا لینک خود را وارد کنید'
      })
    }
    
    if (desc.length === 0 ) {
      return setIsError({
        show: true,
        msg: 'لطفا جزییات کلاس خود را صحیح وارد نمایید'
      })
    }
    
    if (selectedDepartment === null) {
      return setIsError({
        show: true,
        msg: 'دپارتمان مورد نظر خود را وارد کنید'
      })
    }
    
    
    if (selectedUniversity === null) {
      return setIsError({
        show: true,
        msg: 'دانشگاه مورد نظر خود را وارد کنید'
      })
    }

    if(isShowPassword) {

      if (password === '' || password.length < 4) {
        return setIsError({
          show: true,
          msg: 'لطفا رمز عبور خود را صحیح وارد نمایید'
        })
      }
    
      if (password !== confirm ) {
        return setIsError({
          show: true,
          msg: 'رمز عبور و تکرار آن یکسان نمیباشد'
        })
      }
    }
    

    try {
      const result = await addLesson(title , classCode , desc , selectedDepartment.id , selectedUniversity.id , capacity ,  link , password);
      if (result.data) {
        setIsNotify({show: true , msg: result.data.msg})
        setTimeout( () => {
          props.close()
        } , 2000)
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        console.log(data)
        if (data.code !== 422 && data.code < 500) {
          setIsError({
            msg: data.msg,
            show: true,
          });
        } else {
          setIsError({
            msg: "لطفا اطلاعات را صحیح وارد نمایید.",
            show: true,
          });
        }
      } else {
        setIsError({
          msg: "مشکلی در برقراری ارتباط به وجود آمده",
          show: true,
        });
      }
    }
  };

  const getUniversities = async () => {
    try {
      const result = await getUniversitiesApi();
      if (result.data) {
        setListUniversity(result.data.rows);
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        if (data.code !== 422 && data.code < 500) {
          setIsError({
            msg: data.msg,
            show: true,
          });
        } else {
          setIsError({
            msg: "لطفا اطلاعات را صحیح وارد نمایید.",
            show: true,
          });
        }
      } else {
        setIsError({
          msg: "مشکلی در برقراری ارتباط به وجود آمده",
          show: true,
        });
      }
    }
  };

  const onChangeUniversity = async (id) => {
    try {
      const result = await getDepartmenstTeacher(id);
      if (result.data) {
        setListDepartment(result.data.rows);
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        if (data.code !== 422 && data.code < 500) {
          setIsError({
            msg: data.msg,
            show: true,
          });
        } else {
          setIsError({
            msg: "لطفا اطلاعات را صحیح وارد نمایید.",
            show: true,
          });
        }
      } else {
        setIsError({
          msg: "مشکلی در برقراری ارتباط به وجود آمده",
          show: true,
        });
      }
    }
  };


  return (
    <>
      {isNotify.show && (
        <SimpleSnackbar
          message={isNotify.msg}
          onClose={() => setIsNotify({ msg: "", show: false })}
          color={"success"}
        />
      )}
      {isError.show && (
        <SimpleSnackbar
          message={isError.msg}
          onClose={() => setIsError({ msg: "", show: false })}
          color={"error"}
        />
      )}

      <Typography variant={"h6"} style={{ textAlign: "center" }}>
        اضافه کردن کلاس
      </Typography>

      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={8} style={{ margin: "auto" }}>
          <TextField
            style={{ marginTop: 10 }}
            fullWidth
            size={"small"}
            variant={"filled"}
            onChange={v => setTitle(v.target.value)}
            label={"نام درس"}
          />
        </Grid>
        
         <Grid item xs={12} md={8} style={{ margin: "auto" }}>
          <TextField
            style={{ marginTop: 10 }}
            fullWidth
            type={'number'}
            size={"small"}
            variant={"filled"}
            onChange={v => setClassCode(v.target.value)}
            label={"کد این کلاس"}
          />
        </Grid>
        
        <Grid item xs={12} md={8} style={{ margin: "auto" }}>
          <TextField
            style={{ marginTop: 10 }}
            fullWidth
            type={'number'}
            size={"small"}
            variant={"filled"}
            onChange={v => setCapacity(v.target.value)}
            label={"ظرفیت این کلاس"}
          />
        </Grid>

         <Grid item xs={12} md={8} style={{ margin: "auto" }}>
          <TextField
            style={{ marginTop: 10 }}
            fullWidth
            type={'link'}
            size={"small"}
            variant={"filled"}
            onChange={v => setLink(v.target.value)}
            label={"لینک این کلاس"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          direction={"row"}
          container
          justifyContent={"space-between"}
        >
          <Grid item xs={12} md={5}>
            <FormControl
              color={"primary"}
              fullWidth
              style={{ margin: "10px auto" }}
            >
              <TextField
                id="standard-select-uni"
                select
                value={selectedUniversity}
                label="انتخاب دانشگاه"
                onChange={(v) => {
                  setSelectedUniversity(v.target.value);
                  onChangeUniversity(v.target.value.id);
                }}
                variant="filled"
                helperText="دانشگاهی که این کلاس برای آن است را مشخص کنید"
              >
                {listUniversity.map((option) => (
                  <MenuItem key={option.id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5}>
            <FormControl
              color={"primary"}
              fullWidth
              style={{ margin: "10px auto" }}
            >
              <TextField
                id="standard-select-dep"
                select
                value={selectedDepartment}
                label="انتخاب دپارتمان"
                onChange={(v) => {
                  setSelectedDepartment(v.target.value);
                }}
                variant="filled"
                helperText="دپارتمان مورد نظر را مشخص کنید"
              >
                {listDepartment.length > 0 &&
                  listDepartment.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.department_name}
                    </MenuItem>
                  ))}
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl
            color={"primary"}
            fullWidth
            style={{ margin: "10px auto" }}
          >
            <TextField
              label={"توضیحات کلاس"}
              rows={10}
              onChange={v => setDesc(v.target.value)}
              style={{ textAlign: "justify" }}
              variant={"filled"}
              multiline
              />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8} container justifyContent={"space-between"}>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={<Switch color={"secondary"} />}
              onChange={v => setIsShowPassword(!isShowPassword)}
              label={"اعمال کد امنیتی برای ثبت نام دانشجو"}
              />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size={"small"}
              type={"password"}
              disabled={!isShowPassword}
              onChange={v => setPassword(v.target.value)}
              variant={"filled"}
              label={"رمز عبور"}
              />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size={"small"}
              type={"password"}
              onChange={v => setConfirm(v.target.value)}
              disabled={!isShowPassword}
              variant={"filled"}
              label={"تکرار رمز عبور"}
              />
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} style={{ marginTop: 10 }}>
          <Button
            variant={"contained"}
            size={"large"}
            onClick={onSubmit}
            endIcon={<AddBox />}
            color={"secondary"}
          >
            ایجاد کلاس
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddClassLayout;
