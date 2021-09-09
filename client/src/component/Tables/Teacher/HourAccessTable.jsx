import React from "react";
import {
  Button,
  IconButton, makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@material-ui/core";
import {Schedule} from "@material-ui/icons";
import {Skeleton} from "@material-ui/lab";

const Style = makeStyles({
  root: {
    width: '100%'
  },
  table: {}
})

const HourAccessTable = ({rows = []}) => {
  const classes = Style()
  const defaultValue = [{}]
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size={'small'}  aria-label="caption table">
          <caption>ساعت های در دسترس در این تاریخ</caption>
          <TableHead>
            <TableRow>
              <TableCell>ساعت موجود</TableCell>
              <TableCell>رزرو کردن</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell >
                    <Skeleton variant={'text'} width={100} height={30} animation={'pulse'} />
                </TableCell>
                <TableCell >
                  <Skeleton variant={'text'}  width={100} height={30} animation={'pulse'} />
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >
                  <Typography component={'h2'}>
                    {row.time}
                  </Typography>
                </TableCell>
                <TableCell >
                  <Button variant={'contained'}
                          size={'small'}
                          endIcon={<Schedule />}
                          color={'secondary'}>
                    انتخاب
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    </>
  )
}

export default HourAccessTable
