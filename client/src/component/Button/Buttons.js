import React, {Component} from 'react';
import {Button, makeStyles} from "@material-ui/core";

const styles = makeStyles({
    root: {
        borderRadius: 0
    }
});

export const SecondaryButton = (props) =>
    <Button variant={'contained'} color={'secondary'} className={styles().root}>
        {props.children}
    </Button>;

export const SecondaryTextButton = (props) =>
    <Button color={'secondary'} className={styles().root}>
        {props.children}
    </Button>;

export const SecondaryOutlineButton = (props) =>
    <Button variant={'outlined'} color={'secondary'} className={styles().root}>
        {props.children}
    </Button>;

export const PrimaryButton = (props) =>
    <Button variant={'contained'} color={'primary'} className={styles().root}>
        {props.children}
    </Button>;

export const PrimaryTextButton = (props) =>
    <Button color={'primary'} className={styles().root}>
        {props.children}
    </Button>;

export const PrimaryOutlineButton = (props) =>
    <Button variant={'outlined'} color={'primary'} className={styles().root}>
        {props.children}
    </Button>;


