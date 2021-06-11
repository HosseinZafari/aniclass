import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Page from './Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEnvelopeOpen, faSun, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export class PageContactUs extends Component {

    render() {
        return (
            <Page title="ارتباط با ما">
                <p>دوستان عزیز شما میتوانید با وارد کردن بخش زیر با ما ارتباط برقرار کنید . </p>
                <div className="field">
                    <label className="label">نام</label>
                    <div className="control has-icons-right">
                    <input className="input" type="text" placeholder="سمیه فاتحی" />
                    <span className="icon is-small is-right">
                        <FontAwesomeIcon icon={faUserFriends} />
                    </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">ایمیل</label>
                    <div className="control  has-icons-right">
                    <input className="input" type="email" placeholder="ایمیل خود را وارد کنید "  />
                    <span className="icon is-small is-right">
                        <FontAwesomeIcon icon={faEnvelopeOpen} />
                    </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">موضوع</label>
                    <div className="control  has-icons-right">
                        <input className="input" type="text" placeholder="مشکل در پیدا کردن کلاس ... ." />
                        <span className="icon is-small is-right">
                        <FontAwesomeIcon icon={faSun} />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">پیام</label>
                    <div className="control">
                    <textarea className="textarea" placeholder="Textarea" defaultValue={""} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" className="m-1"/>
                        من  <Link to="/policy">قوانین سایت </Link> را تایید میکنم.
                    </label>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                    <button className="button is-link">تایید</button>
                    </div>
                    <div className="control">
                    <button className="button is-link is-light">انصراف</button>
                    </div>
                </div>
            </Page>
        )
    }
}

export default PageContactUs
