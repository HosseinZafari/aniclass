--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: city_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city_tb (
    id integer NOT NULL,
    province_tb_id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.city_tb OWNER TO postgres;

--
-- Name: city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_id_seq OWNER TO postgres;

--
-- Name: city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.city_id_seq OWNED BY public.city_tb.id;


--
-- Name: city_province_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_province_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_province_tb_id_seq OWNER TO postgres;

--
-- Name: city_province_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.city_province_tb_id_seq OWNED BY public.city_tb.province_tb_id;


--
-- Name: class_reserved_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_reserved_tb (
    id integer NOT NULL,
    student_tb_id integer NOT NULL,
    class_tb_id integer NOT NULL
);


ALTER TABLE public.class_reserved_tb OWNER TO postgres;

--
-- Name: class_reserved_class_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_reserved_class_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_reserved_class_tb_id_seq OWNER TO postgres;

--
-- Name: class_reserved_class_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_reserved_class_tb_id_seq OWNED BY public.class_reserved_tb.class_tb_id;


--
-- Name: class_reserved_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_reserved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_reserved_id_seq OWNER TO postgres;

--
-- Name: class_reserved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_reserved_id_seq OWNED BY public.class_reserved_tb.id;


--
-- Name: class_reserved_student_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_reserved_student_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_reserved_student_tb_id_seq OWNER TO postgres;

--
-- Name: class_reserved_student_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_reserved_student_tb_id_seq OWNED BY public.class_reserved_tb.student_tb_id;


--
-- Name: class_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.class_tb (
    id integer NOT NULL,
    description text,
    teacher_tb_id integer NOT NULL,
    link character varying(3000),
    capacity character varying(100),
    title character varying(200),
    class_code character varying(20),
    departmant_tb_id integer NOT NULL,
    university_tb_id integer NOT NULL
);


ALTER TABLE public.class_tb OWNER TO postgres;

--
-- Name: class_tb_departmant_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_tb_departmant_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_tb_departmant_tb_id_seq OWNER TO postgres;

--
-- Name: class_tb_departmant_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_tb_departmant_tb_id_seq OWNED BY public.class_tb.departmant_tb_id;


--
-- Name: class_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_tb_id_seq OWNER TO postgres;

--
-- Name: class_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_tb_id_seq OWNED BY public.class_tb.id;


--
-- Name: class_tb_teacher_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_tb_teacher_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_tb_teacher_tb_id_seq OWNER TO postgres;

--
-- Name: class_tb_teacher_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_tb_teacher_tb_id_seq OWNED BY public.class_tb.teacher_tb_id;


--
-- Name: class_tb_university_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.class_tb_university_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.class_tb_university_tb_id_seq OWNER TO postgres;

--
-- Name: class_tb_university_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.class_tb_university_tb_id_seq OWNED BY public.class_tb.university_tb_id;


--
-- Name: date_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.date_tb (
    dated date NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.date_tb OWNER TO postgres;

--
-- Name: session_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_tb (
    id integer NOT NULL,
    class_tb_id integer NOT NULL,
    date_tb_id integer NOT NULL,
    time_tb_id integer NOT NULL
);


ALTER TABLE public.session_tb OWNER TO postgres;

--
-- Name: date_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.date_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.date_tb_id_seq OWNER TO postgres;

--
-- Name: date_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.date_tb_id_seq OWNED BY public.session_tb.id;


--
-- Name: date_tb_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.date_tb_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.date_tb_id_seq1 OWNER TO postgres;

--
-- Name: date_tb_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.date_tb_id_seq1 OWNED BY public.date_tb.id;


--
-- Name: department_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department_tb (
    id integer NOT NULL,
    department_name character varying(100)
);


ALTER TABLE public.department_tb OWNER TO postgres;

--
-- Name: lesson_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lesson_tb (
    id integer NOT NULL,
    lesson_name character varying(100),
    department_tb_id integer NOT NULL,
    lesson_code integer
);


ALTER TABLE public.lesson_tb OWNER TO postgres;

--
-- Name: lesson_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lesson_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lesson_tb_id_seq OWNER TO postgres;

--
-- Name: lesson_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lesson_tb_id_seq OWNED BY public.lesson_tb.id;


--
-- Name: lesson_tb_study_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lesson_tb_study_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lesson_tb_study_tb_id_seq OWNER TO postgres;

--
-- Name: lesson_tb_study_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lesson_tb_study_tb_id_seq OWNED BY public.lesson_tb.department_tb_id;


--
-- Name: province_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.province_tb (
    id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.province_tb OWNER TO postgres;

--
-- Name: province_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.province_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.province_tb_id_seq OWNER TO postgres;

--
-- Name: province_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.province_tb_id_seq OWNED BY public.province_tb.id;


--
-- Name: student_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_tb (
    id integer NOT NULL,
    national_code character varying(30) NOT NULL,
    name character varying(30),
    family character varying(30),
    email character varying(200) NOT NULL,
    password character varying(100) NOT NULL,
    auth text
);


ALTER TABLE public.student_tb OWNER TO postgres;

--
-- Name: student_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_tb_id_seq OWNER TO postgres;

--
-- Name: student_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_tb_id_seq OWNED BY public.student_tb.id;


--
-- Name: study_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.study_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.study_tb_id_seq OWNER TO postgres;

--
-- Name: study_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.study_tb_id_seq OWNED BY public.department_tb.id;


--
-- Name: teacher_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher_tb (
    id integer NOT NULL,
    national_code integer NOT NULL,
    name character varying(30),
    family character varying(30),
    email character varying(200) NOT NULL,
    password character varying(100)
);


ALTER TABLE public.teacher_tb OWNER TO postgres;

--
-- Name: teacher_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacher_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teacher_tb_id_seq OWNER TO postgres;

--
-- Name: teacher_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacher_tb_id_seq OWNED BY public.teacher_tb.id;


--
-- Name: time_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.time_tb (
    id integer NOT NULL,
    start time without time zone NOT NULL
);


ALTER TABLE public.time_tb OWNER TO postgres;

--
-- Name: time_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.time_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.time_tb_id_seq OWNER TO postgres;

--
-- Name: time_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.time_tb_id_seq OWNED BY public.time_tb.id;


--
-- Name: type_university_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_university_tb (
    id integer NOT NULL,
    name character varying(100)
);


ALTER TABLE public.type_university_tb OWNER TO postgres;

--
-- Name: type_university_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_university_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_university_id_seq OWNER TO postgres;

--
-- Name: type_university_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_university_id_seq OWNED BY public.type_university_tb.id;


--
-- Name: university_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.university_tb (
    id integer NOT NULL,
    name character varying(100),
    type_university_tb_id integer NOT NULL,
    city_tb_id integer NOT NULL,
    capacity character varying(100) NOT NULL,
    qrcode text
);


ALTER TABLE public.university_tb OWNER TO postgres;

--
-- Name: university_tb_city_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.university_tb_city_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.university_tb_city_tb_id_seq OWNER TO postgres;

--
-- Name: university_tb_city_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.university_tb_city_tb_id_seq OWNED BY public.university_tb.city_tb_id;


--
-- Name: university_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.university_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.university_tb_id_seq OWNER TO postgres;

--
-- Name: university_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.university_tb_id_seq OWNED BY public.university_tb.id;


--
-- Name: university_tb_type_university_tb_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.university_tb_type_university_tb_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.university_tb_type_university_tb_id_seq OWNER TO postgres;

--
-- Name: university_tb_type_university_tb_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.university_tb_type_university_tb_id_seq OWNED BY public.university_tb.type_university_tb_id;


--
-- Name: city_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_tb ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);


--
-- Name: city_tb province_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_tb ALTER COLUMN province_tb_id SET DEFAULT nextval('public.city_province_tb_id_seq'::regclass);


--
-- Name: class_reserved_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_reserved_tb ALTER COLUMN id SET DEFAULT nextval('public.class_reserved_id_seq'::regclass);


--
-- Name: class_reserved_tb student_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_reserved_tb ALTER COLUMN student_tb_id SET DEFAULT nextval('public.class_reserved_student_tb_id_seq'::regclass);


--
-- Name: class_reserved_tb class_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_reserved_tb ALTER COLUMN class_tb_id SET DEFAULT nextval('public.class_reserved_class_tb_id_seq'::regclass);


--
-- Name: class_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_tb ALTER COLUMN id SET DEFAULT nextval('public.class_tb_id_seq'::regclass);


--
-- Name: class_tb teacher_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_tb ALTER COLUMN teacher_tb_id SET DEFAULT nextval('public.class_tb_teacher_tb_id_seq'::regclass);


--
-- Name: class_tb departmant_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_tb ALTER COLUMN departmant_tb_id SET DEFAULT nextval('public.class_tb_departmant_tb_id_seq'::regclass);


--
-- Name: class_tb university_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_tb ALTER COLUMN university_tb_id SET DEFAULT nextval('public.class_tb_university_tb_id_seq'::regclass);


--
-- Name: date_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date_tb ALTER COLUMN id SET DEFAULT nextval('public.date_tb_id_seq1'::regclass);


--
-- Name: department_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_tb ALTER COLUMN id SET DEFAULT nextval('public.study_tb_id_seq'::regclass);


--
-- Name: lesson_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_tb ALTER COLUMN id SET DEFAULT nextval('public.lesson_tb_id_seq'::regclass);


--
-- Name: lesson_tb department_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_tb ALTER COLUMN department_tb_id SET DEFAULT nextval('public.lesson_tb_study_tb_id_seq'::regclass);


--
-- Name: province_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.province_tb ALTER COLUMN id SET DEFAULT nextval('public.province_tb_id_seq'::regclass);


--
-- Name: session_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_tb ALTER COLUMN id SET DEFAULT nextval('public.date_tb_id_seq'::regclass);


--
-- Name: student_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_tb ALTER COLUMN id SET DEFAULT nextval('public.student_tb_id_seq'::regclass);


--
-- Name: teacher_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_tb ALTER COLUMN id SET DEFAULT nextval('public.teacher_tb_id_seq'::regclass);


--
-- Name: time_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_tb ALTER COLUMN id SET DEFAULT nextval('public.time_tb_id_seq'::regclass);


--
-- Name: type_university_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_university_tb ALTER COLUMN id SET DEFAULT nextval('public.type_university_id_seq'::regclass);


--
-- Name: university_tb id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb ALTER COLUMN id SET DEFAULT nextval('public.university_tb_id_seq'::regclass);


--
-- Name: university_tb type_university_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb ALTER COLUMN type_university_tb_id SET DEFAULT nextval('public.university_tb_type_university_tb_id_seq'::regclass);


--
-- Name: university_tb city_tb_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb ALTER COLUMN city_tb_id SET DEFAULT nextval('public.university_tb_city_tb_id_seq'::regclass);


--
-- Data for Name: city_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city_tb (id, province_tb_id, name) FROM stdin;
2	1	گوهردشت
\.


--
-- Data for Name: class_reserved_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class_reserved_tb (id, student_tb_id, class_tb_id) FROM stdin;
28	40	4
29	41	4
\.


--
-- Data for Name: class_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.class_tb (id, description, teacher_tb_id, link, capacity, title, class_code, departmant_tb_id, university_tb_id) FROM stdin;
6	با سلام و احترام خدمت شما دانشجویان \n	33	https://reactrouter.com/web/guides/quick-start	700	کلاس تغذیه	9877452	4	1
4	با سلام و احترام خدمت شما دانشجویان \n	33	https://reactrouter.com/web/guides/quick-start	700	کلاس ریاضی	987745	4	1
\.


--
-- Data for Name: date_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.date_tb (dated, id) FROM stdin;
2021-05-21	1
2021-05-22	2
2021-05-23	3
2021-05-28	4
2021-05-26	5
2021-05-25	6
2021-05-27	7
2021-05-30	8
2021-05-31	9
\.


--
-- Data for Name: department_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department_tb (id, department_name) FROM stdin;
4	پزشکی
3	فنی مهندسی
5	مکانیک
6	هنر
\.


--
-- Data for Name: lesson_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lesson_tb (id, lesson_name, department_tb_id, lesson_code) FROM stdin;
2	طراحی وب پیشرفته	3	\N
3	مدار منطقی\n	3	\N
4	برنامه نویسی موبایل 1\n	3	\N
5	سیستم عامل 	3	\N
6	نرم افزار های گرافیکی 	3	\N
7	زبان فنی	3	\N
8	الزامات محیط کار	3	\N
9	شبکه	3	\N
\.


--
-- Data for Name: province_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.province_tb (id, name) FROM stdin;
1	البرز
\.


--
-- Data for Name: session_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session_tb (id, class_tb_id, date_tb_id, time_tb_id) FROM stdin;
1	4	5	1
2	6	5	1
3	6	6	5
5	6	6	10
6	6	6	1
7	6	6	11
10	6	4	1
12	6	4	9
13	4	8	6
14	4	9	11
\.


--
-- Data for Name: student_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_tb (id, national_code, name, family, email, password, auth) FROM stdin;
1	3950531319	????	????	hosseinzafari2000@gmail.com	1112	\N
5	396154585	AliReza	Zafari	zafari@gmail.com	1112	\N
10	2043201343	امیر	میرزایی	hossein10@gmail.com	1112	\N
11	23434242	حسین 	ظفری	hossein100@gmail.com	LaFLExqd5NTmiKw	\N
13	0965584872	حسین 	ظفری 	hossein0050@gmail.com	111213	\N
14	39560501245	باقر	باقریان اسفندانی 	bagher@gmail.com	$2b$07$H7mGoF3bPs3OFy17CUKppOoaGI898QKdkcEyxTdHaENQXvZuvqKDK	\N
15	222255577	رضا 	ترابی 	reza@gmail.com0	$2b$07$ay5XcYK0CGfmvjv7Sn3l4eAJIK7OKW8TUGv6./GNWp0rrReIcEI2u	\N
16	8498222422	حسین 	ظفری	hsossein@gmail.com	$2b$07$bbqBrPyMdGPMxzk5s6gIjOPZtLHcEACT7ynCOlYnq8oLoxX3yJShW	\N
17	2894292222	hossein 	zafr	hoss@gmail.com	$2b$07$m8b0fceEiXHndqF6gBeK..2KKhCc/Hm3ZuFiQG0d/X4Gpyi17zBDq	\N
18	224224242	ssfsf	swfw3	hossein@gmail.com	$2b$07$OMk7/beuFppysViE5H7Nk.fN5KALfyLJuG6KehBI4/Ui/NCH.EC/W	\N
19	2424122312	sffsf	wwwwfwf	ho24ssein@gmail.com	$2b$07$S8h6fJf4AKB..FvwDyqhVeiHQvF6QzQD2Q14ruCvNfJyLhy3mOr7q	\N
22	234242342343	sfsff	wrwrww	ho24ss2224224ein@gmail.com	$2b$07$sE0OSJSYbEWG/x7yB1lF.ugN8lGTlFnQ9DWAhAo35ot9pTa0mU0Ie	\N
23	122224242	ssfwefwfw	wfwfwfwf	ho2wfwfww4ssein@gmail.com	$2b$07$NDaGDTWIm0fVFwQjn.fgq.RmkT7sHuUSzGI2XLlquDv1haVBBSJvO	\N
24	98238242422	hfsuifsfis	suisfisbf	hfww2o24ssein@gmail.com	$2b$07$bGhDFnnRDCdAA9fUBHD6GuxHP6kZkjW5jgkE8/p2ObouV6W30TVIu	\N
25	123141516	ali 	zafari	alizafari@gmail.com	$2b$07$mHElP5QmhZ/A3Qcs4ogb3eev5hi9o8IOQXxfX53As9/kYumzGuzXu	\N
26	2434342	sfwfwf	sfffwf	aliwfwzafari@gmail.com	$2b$07$vnI3nASbUSCLuCBajHdF3eo5ap.RJSbLwnciy1NluO4rC51B9L2Iu	\N
27	242424242	fsfsf	wfwfwf	alizw34232afari@gmail.com	$2b$07$tF/lL13nkESj.7CShCR4v.wT.Qgrz7XC8weVLKHC7.bPsSB57.VMq	\N
30	43423423424	ffsfsf	sfsffw	alizasfsfwfari@gmail.com	$2b$07$IulmjXnWzbRoYRZwvyhqj.iCI4NXYLuyDVm1qGLeLgUpMzPbuwaUi	\N
31	398434292224	hossein 	molaiie	hossemolaii@gmail.com	$2b$07$dkOx1r4x4UfVAT09p4jsgufdp.7R705B.vMX8aZUvsA6QcgQAX05O	\N
32	2341223423	sdffsifb	uisbsffbsi	alsfsfsuisbizafari@gmail.com	$2b$07$uTnbNGemwIz4N4VtC8MBTOvHLgsymW9eYJNYQza6TLieIIbt5rR7K	\N
33	11121112	حسین 	ظفری	zafar10@gmail.com	hossein1112	\N
34	11111111	ssf	fisjsss	ali12zafari@gmail.com	141414	\N
35	55555555	amo zafar	zafariii	alisfs12zafari@gmail.com	111213	\N
37	9999999998	hossein	sfssfss	ho7se@gmail.com	123456	\N
38	35353535	امیر	حیدری	zafari100@gmail.com	$2b$07$eBXfPSkdMM2l0q/sWnn3auSArO5iPaCVj1o0TijDYVHTf5feGalki	\N
39	56565656	رضا	حیدری	hossein@gmail.info	$2b$07$IbcfaceYEST2tAU.QCp51ORYYLJIspVGkOmQyxaRYXCte2IHZEtdu	\N
40	96969696	حسین 	ظفری 	zafari20@gmail.com	$2b$07$rOhLuyeKmBvb4X2e4oZWkeFSp0XH2glI9f.9cIMVBIifHQXJJCXlC	\N
41	99995555	hossein 	zafari	hosseinooo@gmail.com	$2b$07$CR59xoqt9xIGxVDnDt/EouVHniR5NUwxSgh12Ks2YekCvEqbba.3O	\N
\.


--
-- Data for Name: teacher_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher_tb (id, national_code, name, family, email, password) FROM stdin;
1	1234421124	hossein	zafari	hossein@gamil.com	ioisfsiofi
20	1167745124	resszsfaa	heydasfasfri	reqsasszsa@gamil.com	1112
16	444444444	Hossein	Zafari	reqsasza@gamil.com	1112
17	1167725124	resszsfaa	heydasfasfri	ali@gmail.com	1112
21	124910342	ali	rezaii	ali10@gmail.com	1112
33	55555555	حسین 	ظفری	hos@gamil.com	$2b$07$p/2Vgqb2e.IgkrOjEwMrBOVSrNrylU51FoRxdB9mKCP97BdksTRwC
\.


--
-- Data for Name: time_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.time_tb (id, start) FROM stdin;
1	06:00:00
2	07:00:00
3	08:00:00
4	09:00:00
5	10:00:00
6	11:00:00
7	12:00:00
8	13:00:00
9	14:00:00
10	15:00:00
11	16:00:00
12	17:00:00
13	18:00:00
14	19:00:00
15	20:00:00
16	21:00:00
\.


--
-- Data for Name: type_university_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_university_tb (id, name) FROM stdin;
1	فنی حرفه ای 
\.


--
-- Data for Name: university_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.university_tb (id, name, type_university_tb_id, city_tb_id, capacity, qrcode) FROM stdin;
1	دانشگاه فنی حرفه ای شهید بهشتی	1	2	1100	s$i|sb#sb#ss*ff|s#uibs^%%%
\.


--
-- Name: city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_id_seq', 2, true);


--
-- Name: city_province_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_province_tb_id_seq', 1, false);


--
-- Name: class_reserved_class_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_reserved_class_tb_id_seq', 1, false);


--
-- Name: class_reserved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_reserved_id_seq', 30, true);


--
-- Name: class_reserved_student_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_reserved_student_tb_id_seq', 1, false);


--
-- Name: class_tb_departmant_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_tb_departmant_tb_id_seq', 1, false);


--
-- Name: class_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_tb_id_seq', 6, true);


--
-- Name: class_tb_teacher_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_tb_teacher_tb_id_seq', 1, false);


--
-- Name: class_tb_university_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.class_tb_university_tb_id_seq', 1, false);


--
-- Name: date_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.date_tb_id_seq', 14, true);


--
-- Name: date_tb_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.date_tb_id_seq1', 9, true);


--
-- Name: lesson_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lesson_tb_id_seq', 9, true);


--
-- Name: lesson_tb_study_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lesson_tb_study_tb_id_seq', 1, false);


--
-- Name: province_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.province_tb_id_seq', 1, true);


--
-- Name: student_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_tb_id_seq', 41, true);


--
-- Name: study_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.study_tb_id_seq', 6, true);


--
-- Name: teacher_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teacher_tb_id_seq', 33, true);


--
-- Name: time_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.time_tb_id_seq', 16, true);


--
-- Name: type_university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_university_id_seq', 1, true);


--
-- Name: university_tb_city_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.university_tb_city_tb_id_seq', 1, false);


--
-- Name: university_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.university_tb_id_seq', 1, true);


--
-- Name: university_tb_type_university_tb_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.university_tb_type_university_tb_id_seq', 1, false);


--
-- Name: city_tb city_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_tb
    ADD CONSTRAINT city_tb_pkey PRIMARY KEY (id);


--
-- Name: class_reserved_tb class_reserved_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_reserved_tb
    ADD CONSTRAINT class_reserved_pkey PRIMARY KEY (id);


--
-- Name: class_tb class_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_tb
    ADD CONSTRAINT class_tb_pkey PRIMARY KEY (id);


--
-- Name: date_tb date_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date_tb
    ADD CONSTRAINT date_tb_pkey PRIMARY KEY (id);


--
-- Name: lesson_tb lesson_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_tb
    ADD CONSTRAINT lesson_tb_pkey PRIMARY KEY (id);


--
-- Name: province_tb province_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.province_tb
    ADD CONSTRAINT province_tb_pkey PRIMARY KEY (id);


--
-- Name: student_tb student_tb_auth_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_tb
    ADD CONSTRAINT student_tb_auth_key UNIQUE (auth);


--
-- Name: student_tb student_tb_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_tb
    ADD CONSTRAINT student_tb_email_key UNIQUE (email);


--
-- Name: student_tb student_tb_nationalcode_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_tb
    ADD CONSTRAINT student_tb_nationalcode_key UNIQUE (national_code);


--
-- Name: student_tb student_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_tb
    ADD CONSTRAINT student_tb_pkey PRIMARY KEY (id);


--
-- Name: department_tb study_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department_tb
    ADD CONSTRAINT study_tb_pkey PRIMARY KEY (id);


--
-- Name: teacher_tb teacher_tb_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_tb
    ADD CONSTRAINT teacher_tb_email_key UNIQUE (email);


--
-- Name: teacher_tb teacher_tb_national_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_tb
    ADD CONSTRAINT teacher_tb_national_code_key UNIQUE (national_code);


--
-- Name: teacher_tb teacher_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher_tb
    ADD CONSTRAINT teacher_tb_pkey PRIMARY KEY (id);


--
-- Name: time_tb time_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_tb
    ADD CONSTRAINT time_tb_pkey PRIMARY KEY (id);


--
-- Name: type_university_tb type_university_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_university_tb
    ADD CONSTRAINT type_university_tb_pkey PRIMARY KEY (id);


--
-- Name: university_tb university_tb_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb
    ADD CONSTRAINT university_tb_pkey PRIMARY KEY (id);


--
-- Name: university_tb university_tb_qrcode_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb
    ADD CONSTRAINT university_tb_qrcode_key UNIQUE (qrcode);


--
-- Name: university_tb fk_city_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb
    ADD CONSTRAINT fk_city_tb_id FOREIGN KEY (city_tb_id) REFERENCES public.city_tb(id) ON DELETE SET NULL;


--
-- Name: class_reserved_tb fk_class_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_reserved_tb
    ADD CONSTRAINT fk_class_tb_id FOREIGN KEY (class_tb_id) REFERENCES public.class_tb(id) ON DELETE SET NULL;


--
-- Name: session_tb fk_class_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_tb
    ADD CONSTRAINT fk_class_tb_id FOREIGN KEY (class_tb_id) REFERENCES public.class_tb(id) ON DELETE SET NULL;


--
-- Name: lesson_tb fk_department_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_tb
    ADD CONSTRAINT fk_department_tb_id FOREIGN KEY (department_tb_id) REFERENCES public.department_tb(id) ON DELETE SET NULL;


--
-- Name: city_tb fk_province_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city_tb
    ADD CONSTRAINT fk_province_tb_id FOREIGN KEY (province_tb_id) REFERENCES public.province_tb(id) ON DELETE SET NULL;


--
-- Name: class_reserved_tb fk_student_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_reserved_tb
    ADD CONSTRAINT fk_student_tb_id FOREIGN KEY (student_tb_id) REFERENCES public.student_tb(id) ON DELETE SET NULL;


--
-- Name: class_tb fk_teacher_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.class_tb
    ADD CONSTRAINT fk_teacher_tb_id FOREIGN KEY (teacher_tb_id) REFERENCES public.teacher_tb(id) ON DELETE SET NULL;


--
-- Name: university_tb fk_type_university_tb_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.university_tb
    ADD CONSTRAINT fk_type_university_tb_id FOREIGN KEY (type_university_tb_id) REFERENCES public.type_university_tb(id) ON DELETE SET NULL;


--
-- Name: session_tb session_tb_date_tb_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_tb
    ADD CONSTRAINT session_tb_date_tb_id_fk FOREIGN KEY (date_tb_id) REFERENCES public.date_tb(id);


--
-- Name: session_tb session_tb_time_tb_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_tb
    ADD CONSTRAINT session_tb_time_tb_id_fk FOREIGN KEY (time_tb_id) REFERENCES public.time_tb(id);


--
-- PostgreSQL database dump complete
--

