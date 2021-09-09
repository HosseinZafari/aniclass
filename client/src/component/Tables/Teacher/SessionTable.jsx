import {
  Button, IconButton,
  makeStyles,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import {AddCircle, BorderColor, Delete, Link} from "@material-ui/icons";

const Styles = makeStyles((theme) => ({
  table: {
  
  }
}))

const SessionTable = (props) => {
  const classes = Styles()
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>
          <Button variant={'outlined'} color={'primary'} size={'small'}>
            اضافه کردن جلسه
          </Button>
          {/*<IconButton onClick={() => {}} aria-label="modify" color={'primary'} >*/}
          {/*  <AddCircle color={'primary'} fontSize={'large'} />*/}
          {/*</IconButton>*/}
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>عنوان</TableCell>
            <TableCell align="right">تاریخ شروع</TableCell>
            <TableCell align="right">ساعت</TableCell>
            <TableCell align="right">پاک کردن</TableCell>
            <TableCell align="right">ویرایش</TableCell>
            <TableCell align="right">لینک ورود</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => {}} aria-label="delete" color={'primary'}>
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => {}} aria-label="modify" color={'primary'}>
                  <BorderColor />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => window.open(row.link)} aria-label="link" color={'secondary'}>
                  <Link />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default SessionTable