import React, { Component } from 'react';
import {FadeLoader, SyncLoader} from 'react-spinners';
import Page from './Page';

export class PageAbout extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Page title="درباره ما" >
                <h2 className="has-text-weight-bold is-size-4 is-center-text mt-4 mb-4">به نام خداوند بخشنده و مهربان</h2>
                <p className="">
                    آنی کلاس از اوایل سال 1400 با هدف بهبود مدیریت کلاس های آنلاین آغاز به کار کرد. آنی کلاس توسط تیم هدهد متشکل از <strong>حسین ظفری</strong> و <strong>امیدرضا باقریان اسفندانی</strong> و با حمایت استاد <strong>مسعود ترابی</strong> از <strong>دانشگاه فنی حرفه ای کرج</strong> ساخته شد.<br></br><br></br>
                </p>

                یکی از مشکلات اساسی در آموزش، آموزش آنلاین میباشد و در واقع نبودن پلتفرم حرفه و کاربرپسند باعث شده که قشر استادان و دانشجویان از آموزش آنلاین بسیار ناراضی باشد.
                آنی کلاس یک پلتفرم مناسب مدیریت کلاس آنلاین می باشد که استادان به راحتی تمام میتوانند کلاس خود را ایجاد و مدیریت کنند و به راحتی با دانشجویان خود ارتباط برقرار کند و دانشجویان هم میتوان با پیدا کردن کلاس و دنبال کردن آن از جزئیات کلاس خود با خبر شوند و در کلاس های آنلاین حاضر شوند. در واقع آنی کلاس یه انقلابی عظیمی در آموزش آنلاین انجام داده است.

            </Page>
        )
    }
}

export default PageAbout;
