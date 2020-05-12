--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public."user" DROP CONSTRAINT user_user_name_key;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_phone_number_key;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
ALTER TABLE ONLY public.notes DROP CONSTRAINT notes_pkey;
ALTER TABLE ONLY public."UsersStats" DROP CONSTRAINT "UsersStats_pkey";
ALTER TABLE ONLY public."UsersGoal" DROP CONSTRAINT "UsersGoal_pkey";
ALTER TABLE ONLY public."UserSelectedJob" DROP CONSTRAINT "UserSelectedJob_pkey";
ALTER TABLE ONLY public."JobNotes" DROP CONSTRAINT "JobNotes_pkey";
ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.notes ALTER COLUMN note_id DROP DEFAULT;
ALTER TABLE public."UsersStats" ALTER COLUMN user_stats_id DROP DEFAULT;
ALTER TABLE public."UsersGoal" ALTER COLUMN user_goal_id DROP DEFAULT;
ALTER TABLE public."UserSelectedJob" ALTER COLUMN user_job_id DROP DEFAULT;
ALTER TABLE public."JobNotes" ALTER COLUMN job_note_id DROP DEFAULT;
DROP SEQUENCE public.user_user_id_seq;
DROP TABLE public."user";
DROP SEQUENCE public.notes_note_id_seq;
DROP TABLE public.notes;
DROP SEQUENCE public."UsersStats_user_stats_id_seq";
DROP TABLE public."UsersStats";
DROP SEQUENCE public."UsersGoal_user_goal_id_seq";
DROP TABLE public."UsersGoal";
DROP SEQUENCE public."UserSelectedJob_user_job_id_seq";
DROP TABLE public."UserSelectedJob";
DROP SEQUENCE public."JobNotes_job_note_id_seq";
DROP TABLE public."JobNotes";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: JobNotes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."JobNotes" (
    job_note_id integer NOT NULL,
    user_job_id integer NOT NULL,
    note_id integer NOT NULL
);


--
-- Name: JobNotes_job_note_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."JobNotes_job_note_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: JobNotes_job_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."JobNotes_job_note_id_seq" OWNED BY public."JobNotes".job_note_id;


--
-- Name: UserSelectedJob; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserSelectedJob" (
    user_job_id integer NOT NULL,
    user_id integer NOT NULL,
    job_status text DEFAULT 'Interested'::text NOT NULL,
    date_saved date DEFAULT now(),
    job_priority integer DEFAULT 1 NOT NULL,
    follow_up_date date,
    files_id bigint,
    interview_date date,
    job_info json NOT NULL,
    date_applied date,
    resume text,
    cover_letter text,
    letter_of_recommendation text
);


--
-- Name: UserSelectedJob_user_job_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."UserSelectedJob_user_job_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: UserSelectedJob_user_job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."UserSelectedJob_user_job_id_seq" OWNED BY public."UserSelectedJob".user_job_id;


--
-- Name: UsersGoal; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsersGoal" (
    user_goal_id integer NOT NULL,
    user_id integer NOT NULL,
    goal_achieved boolean DEFAULT false NOT NULL,
    currently_active boolean DEFAULT true NOT NULL,
    current_progress integer DEFAULT 0 NOT NULL,
    end_goal integer NOT NULL,
    deadline_date date,
    goal_title text,
    goal_type text
);


--
-- Name: UsersGoal_user_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."UsersGoal_user_goal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: UsersGoal_user_goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."UsersGoal_user_goal_id_seq" OWNED BY public."UsersGoal".user_goal_id;


--
-- Name: UsersStats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsersStats" (
    user_stats_id integer NOT NULL,
    number_job_applied_total integer NOT NULL,
    days_checked_in integer NOT NULL,
    days_checked_in_consectively integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: UsersStats_user_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."UsersStats_user_stats_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: UsersStats_user_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."UsersStats_user_stats_id_seq" OWNED BY public."UsersStats".user_stats_id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notes (
    note_id integer NOT NULL,
    note_title text NOT NULL,
    note_content text NOT NULL,
    date_posted date DEFAULT now() NOT NULL,
    note_type text NOT NULL
);


--
-- Name: notes_note_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notes_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notes_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notes_note_id_seq OWNED BY public.notes.note_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    city text NOT NULL,
    image text,
    email text NOT NULL,
    phone_number integer NOT NULL,
    user_name text NOT NULL,
    user_password text,
    profile_info text,
    desired_position text NOT NULL
);


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: JobNotes job_note_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."JobNotes" ALTER COLUMN job_note_id SET DEFAULT nextval('public."JobNotes_job_note_id_seq"'::regclass);


--
-- Name: UserSelectedJob user_job_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserSelectedJob" ALTER COLUMN user_job_id SET DEFAULT nextval('public."UserSelectedJob_user_job_id_seq"'::regclass);


--
-- Name: UsersGoal user_goal_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsersGoal" ALTER COLUMN user_goal_id SET DEFAULT nextval('public."UsersGoal_user_goal_id_seq"'::regclass);


--
-- Name: UsersStats user_stats_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsersStats" ALTER COLUMN user_stats_id SET DEFAULT nextval('public."UsersStats_user_stats_id_seq"'::regclass);


--
-- Name: notes note_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes ALTER COLUMN note_id SET DEFAULT nextval('public.notes_note_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: JobNotes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."JobNotes" (job_note_id, user_job_id, note_id) FROM stdin;
1	4	1
\.


--
-- Data for Name: UserSelectedJob; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserSelectedJob" (user_job_id, user_id, job_status, date_saved, job_priority, follow_up_date, files_id, interview_date, job_info, date_applied, resume, cover_letter, letter_of_recommendation) FROM stdin;
44	1	Interested	2020-05-07	1	\N	\N	\N	{"id":"1539235406","url":"https://www.adzuna.com/land/ad/1539235406?se=0hr375qQ6hGv0qLjsLRhXw&utm_medium=api&utm_source=e4056c10&v=548301090E7C3D1D48747B6088CC679586A03FD2","title":"Fullstack Web Developer (Python/ custom e-commerce platform)","company":"KORE1","city":"Laguna Beach","state":"California","county":"Orange County","contract":"full_time","latitude":33.52603,"longitude":-117.71093,"description":"No 3rd Parties Must be willing to go onsite in Irvine, CA when it's safe (so must either be local or willing to make yourself local) Fulltime Direct Hire PLEASE NOTE In light of the COVID-19 pandemic, the majority of our clients have already moved their staff to working remotely. Most clients have also amended their hiring process to include phone and video interviews and to having new hires start work remotely until it is deemed safe to go into the office. This varies from client to client and…"}	\N	\N	\N	\N
43	1	Interested	2020-05-07	2	\N	\N	\N	{"id":"1521282681","url":"https://www.adzuna.com/land/ad/1521282681?se=0hr375qQ6hGv0qLjsLRhXw&utm_medium=api&utm_source=e4056c10&v=1B415C87297866B32E1D43D00432A3442989EF6C","title":"Sr. Software Developer / Web Developer","company":"Crescent Solutions Inc","city":"Costa Mesa","state":"California","county":"Orange County","contract":"full_time","latitude":33.683414,"longitude":-117.907324,"description":"This is a permanent salary position with great benefits (stock options, 401k, health benefits, flexible time off, etc). Working with cutting edge technology in an exciting environment. What Yoursquoll Do Build solutions that meet our customerrsquos needs and are maintainable, cost-effective and responsive. Partner with our product, design and infrastructure teams to build or enhance applications and services. Own the reliability of the application and services by partnering. operations and infr…"}	\N	\N	\N	\N
45	1	Interested	2020-05-07	1	\N	\N	\N	{"id":"1533100978","url":"https://www.adzuna.com/land/ad/1533100978?se=0hr375qQ6hGv0qLjsLRhXw&utm_medium=api&utm_source=e4056c10&v=7857F46FA1106CF86C8DD4AF2D59D40F0C9ADC49","title":"Sr Web Application Developer","company":"CGS Business Solutions","city":"Newport Beach","state":"California","county":"Orange County","contract":"full_time","latitude":33.59743,"longitude":-117.837004,"description":"CGS Business Solutions is committed to helping you, as an esteemed IT Professional, find the next right step in your career. We match professionals like you to rewarding consulting or full-time opportunities in your area of expertise. We are currently seeking Technical Professionals who are searching for challenging and rewarding jobs for the following opportunity Our Financial client close to Newport Beach, CA is looking for a permanent Sr Web Application Developer. You will be responsible for…"}	\N	\N	\N	\N
46	1	Interested	2020-05-07	1	\N	\N	\N	{"id":"1521287825","url":"https://www.adzuna.com/land/ad/1521287825?se=0hr375qQ6hGv0qLjsLRhXw&utm_medium=api&utm_source=e4056c10&v=0540C172E67AA5B511AA5B0E3BFB5CDBCBF80E8B","title":"Sr. Web Applications Developer","company":"Marquee Staffing","city":"Irvine","state":"California","county":"Orange County","contract":"full_time","latitude":33.751486,"longitude":-117.75493,"description":"Senior Web Applications Developer Creates user information solutions by developing, implementing, and maintaining Internetintranet applications leading team of developers. Job Duties Defines site objectives by analyzing user requirements envisioning system features and functionality. Designs and develops user interfaces to Internetintranet applications by setting expectations and features priorities throughout development life cycle determining design methodologies and tool sets completing prog…"}	\N	\N	\N	\N
47	1	Interested	2020-05-07	1	\N	\N	\N	{"id":"1536963719","url":"https://www.adzuna.com/land/ad/1536963719?se=0hr375qQ6hGv0qLjsLRhXw&utm_medium=api&utm_source=e4056c10&v=8FC46D39F7F41560335E766A9172D12F06D72C32","title":"Senior Web Application Developer","company":"SAIC","city":"Santa Ana","state":"California","county":"Orange County","contract":"full_time","latitude":33.746392,"longitude":-117.860447,"description":"Description SAIC is looking for an accomplished Senior Web Application Developer to play a pivotal role in supporting the County of Orange, Probation department. This position is responsible for the design, development and implementation of new computer software systems as well as maintaining and enhancing large and complex existing system. Essential Duties and Responsibilities Develop, test, implement, and maintain software programs Integrate best software development practices in software des…"}	\N	\N	\N	\N
48	1	Interested	2020-05-08	1	\N	\N	\N	{"id":"1521282681","url":"https://www.adzuna.com/land/ad/1521282681?se=tHBH1F-R6hGTiue8IJMjaA&utm_medium=api&utm_source=e4056c10&v=1B415C87297866B32E1D43D00432A3442989EF6C","title":"Sr. Software Developer / Web Developer","company":"Confidential","city":"Costa Mesa","state":"California","county":"Orange County","contract":"full_time","latitude":33.683414,"longitude":-117.907324,"description":"This is a permanent salary position with great benefits (stock options, 401k, health benefits, flexible time off, etc). Working with cutting edge technology in an exciting environment. What Yoursquoll Do Build solutions that meet our customerrsquos needs and are maintainable, cost-effective and responsive. Partner with our product, design and infrastructure teams to build or enhance applications and services. Own the reliability of the application and services by partnering. operations and infr…"}	\N	\N	\N	\N
52	1	interested	2020-05-08	1	\N	\N	\N	{"company":"Hello","title":"Full-Stack Developer"}	\N	\N	\N	\N
\.


--
-- Data for Name: UsersGoal; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsersGoal" (user_goal_id, user_id, goal_achieved, currently_active, current_progress, end_goal, deadline_date, goal_title, goal_type) FROM stdin;
1	1	f	t	0	3	\N	Number of Application Applied	Applying
2	1	t	f	3	3	\N	Number of Network Attended	Network
19	1	f	t	0	7	\N	Number of Jobs Saved	Saving
\.


--
-- Data for Name: UsersStats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsersStats" (user_stats_id, number_job_applied_total, days_checked_in, days_checked_in_consectively, user_id) FROM stdin;
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notes (note_id, note_title, note_content, date_posted, note_type) FROM stdin;
1	Testing	A dummy note for testing only	2020-05-05	Job
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (user_id, first_name, last_name, city, image, email, phone_number, user_name, user_password, profile_info, desired_position) FROM stdin;
1	John	Ko	Irvine	\N	example@hotmail.com	1234567890	jkolfz	\N	\N	web developer
\.


--
-- Name: JobNotes_job_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."JobNotes_job_note_id_seq"', 1, true);


--
-- Name: UserSelectedJob_user_job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UserSelectedJob_user_job_id_seq"', 52, true);


--
-- Name: UsersGoal_user_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UsersGoal_user_goal_id_seq"', 19, true);


--
-- Name: UsersStats_user_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UsersStats_user_stats_id_seq"', 1, false);


--
-- Name: notes_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notes_note_id_seq', 1, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, true);


--
-- Name: JobNotes JobNotes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."JobNotes"
    ADD CONSTRAINT "JobNotes_pkey" PRIMARY KEY (job_note_id);


--
-- Name: UserSelectedJob UserSelectedJob_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserSelectedJob"
    ADD CONSTRAINT "UserSelectedJob_pkey" PRIMARY KEY (user_job_id);


--
-- Name: UsersGoal UsersGoal_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsersGoal"
    ADD CONSTRAINT "UsersGoal_pkey" PRIMARY KEY (user_goal_id);


--
-- Name: UsersStats UsersStats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsersStats"
    ADD CONSTRAINT "UsersStats_pkey" PRIMARY KEY (user_stats_id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (note_id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_phone_number_key UNIQUE (phone_number);


--
-- Name: user user_user_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_user_name_key UNIQUE (user_name);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

