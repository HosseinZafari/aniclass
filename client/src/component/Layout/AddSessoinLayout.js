import {
  Typography,
  InputLabel,
  Select,
  Button,
  Grid,
  FormControl,
  TextField,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import HourAccessTable from "../Tables/Teacher/HourAccessTable";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
  createSession,
  getAvailableHourOfDay,
  getClassCreated,
  getTimeNow,
} from "src/apis/AuthApi";
import { useEffect } from "react";
import SimpleSnackbar from "../Notify/SimpleSnackbar";

const AddSessionLayout = (props) => {
  const classes = Styles();
  const [createdClasses, setCreatedClasses] = useState([]);
  const [timeNow, setTimeNow] = useState(null);
  const [name, setName] = useState('');
  const [selectedTime, setSelectedTime] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);
  const [isOnChange, setIsOnChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotify, setIsNotify] = useState({ msg: "", show: false });
  const [isError, setIsError] = useState({ msg: "", show: false });
  const [classSelectedId, setClassSelectedId] = useState(-1);

  useEffect(() => {
    syncClassesCreated();
    syncTime();
  }, []);

  const handleDateChange = async (date) => {
    const years = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();

    
    if (classSelectedId == -1) {
      return setIsError({
        msg: "لطفا کلاس مورد نظر خود را وارد کنید.",
        show: true,
      });
    }

    setTimes([]);
    setSelectedTime(-1)

    try {
      const result = await getAvailableHourOfDay(
        `${years}-${month}-${day}`,
        classSelectedId
      );
      if (result.data) {
        setTimes(result.data.times);
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

  const syncTime = async () => {
    try {
      const result = await getTimeNow();
      if (result.data) {
        setTimeNow(moment(result.data.time, true));
        setSelectedDate(moment(result.data.time, true));
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        console.log(data);
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
    } finally {
      setIsLoading(false);
    }
  };

  const syncClassesCreated = async () => {
    try {
      const result = await getClassCreated();
      if (result.data) {
        setCreatedClasses(result.data.rows);
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        console.log(data);
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

  const onSubmit = async () => {
    if(name === '') {
      return setIsError({
        msg: 'باید شما عنوانی برای این جلسه تعیین کنید' , 
        show: true 
      })
    }

    if (classSelectedId == -1) {
      return setIsError({
        msg: "لطفا کلاس مورد نظر خود را وارد کنید.",
        show: true,
      });
    }


    if (selectedTime == -1) {
      return setIsError({
        msg: "لطفا زمان مورد نظر برای جلسه را انتخاب کنید.",
        show: true,
      });
    }


    if (selectedDate == -1) {
      return setIsError({
        msg: "لطفا تاریخ مورد نظر برای جلسه را انتخاب کنید.",
        show: true,
      });
    }


    try {
      const years = new Date(selectedDate).getFullYear();
      const month = new Date(selectedDate).getMonth() + 1;
      const day = new Date(selectedDate).getDate();
      
      const result = await createSession(parseInt(selectedTime) ,  `${years}-${month}-${day}` , name , parseInt(classSelectedId)) 
      if (result.data) {
        setIsNotify({show : true , msg: 'با موفقیت شما جلسه را اضافه کردید'})
        setTimeout(() => {
          props.close() 
        }, 500);
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data;
        console.log(data);
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

  }

  
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
        ایجاد جلسه
      </Typography>

      <Grid container justifyContent={"center"} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={8}>
          <FormControl color={"primary"} fullWidth>
            <TextField
              onChange={v => setName(v.target.value)}
              label={"عنوان جلسه"}
              color={"primary"}
              variant={"standard"}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="lesson-native-simple">
              جلسه اضافه شود به کلاس{" "}
            </InputLabel>
            <Select
              native
              onChange={(item) => {
                setClassSelectedId(item.target.value);
              }}
              inputProps={{
                name: "کلاس",
                id: "lesson-native-simple",
              }}
            >
              <option value={-1}> یک کلاس را انتخاب کنید</option>

              {createdClasses.map((clazz) => (
                <option value={clazz.class_id}>{clazz.class_title}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {isLoading ? (
          <Grid
            container
            item
            xs={12}
            md={8}
            direction={"row"}
            justifyContent={"center"}
            style={{ marginTop: 20 }}
          >
            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
              <LinearProgress color="secondary" style={{ margin: "auto" }} />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={12}
            md={8}
            direction={"row"}
            justifyContent={"space-between"}
            style={{ marginTop: 20 }}
          >
            <Grid item xs={12} md={6}>
              <DatePicker
                autoOk
                minDate={timeNow}
                labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
                orientation="landscape"
                okLabel="تأیید"
                cancelLabel="لغو"
                clearLabel="پاک کردن"
                variant="static"
                openTo="date"
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  handleDateChange(date);
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <HourAccessTable 
                rows={times} 
                selected={id => {
                  setSelectedTime(id)
                  setIsNotify({show : true , msg: 'زمان مورد نظر انتخاب شد'})
                }} />
            </Grid>

            <Grid item xs={12} md={8} style={{ marginTop: 30 }}>
              <Button
                variant={"contained"}
                size={"large"}
                onClick={e => onSubmit()}
                endIcon={<AddBox />}
                color={"secondary"}
              >
                ایجاد جلسه
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const Styles = makeStyles({
  appbar: {
    background: "#f5f5f5",
    position: "relative",
  },
  title: {
    color: "#444",
    position: "absolute",
    right: "45%",
  },
  main: {
    width: "100%",
    height: "100%",
  },
  formControl: {
    minWidth: "100%",
    margin: "10px auto",
  },
});

export default AddSessionLayout;
