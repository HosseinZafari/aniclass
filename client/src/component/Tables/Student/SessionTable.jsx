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
import {Link} from "@material-ui/icons";

const Styles = makeStyles((theme) => ({
  table: {
  
  }
}))

const SessionTable = ({rows}) => {
  const classes = Styles()
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>جلسه های ایجاد شده توسط استاد این کلاس</caption>
        <TableHead>
          <TableRow>
            <TableCell>عنوان</TableCell>
            <TableCell align="right">تاریخ شروع</TableCell>
            <TableCell align="right">ساعت</TableCell>
            <TableCell align="right">لینک ورود</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
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