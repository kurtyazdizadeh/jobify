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
ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
ALTER TABLE ONLY public."UsersStats" DROP CONSTRAINT "UsersStats_pkey";
ALTER TABLE ONLY public."UsersGoal" DROP CONSTRAINT "UsersGoal_pkey";
ALTER TABLE ONLY public."UserSelectedJob" DROP CONSTRAINT "UserSelectedJob_pkey";
ALTER TABLE ONLY public."JobNotes" DROP CONSTRAINT "JobNotes_pkey";
ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.notes ALTER COLUMN note_id DROP DEFAULT;
ALTER TABLE public.files ALTER COLUMN files_id DROP DEFAULT;
ALTER TABLE public."UsersStats" ALTER COLUMN user_stats_id DROP DEFAULT;
ALTER TABLE public."UsersGoal" ALTER COLUMN user_goal_id DROP DEFAULT;
ALTER TABLE public."UserSelectedJob" ALTER COLUMN user_job_id DROP DEFAULT;
ALTER TABLE public."JobNotes" ALTER COLUMN job_note_id DROP DEFAULT;
DROP SEQUENCE public.user_user_id_seq;
DROP TABLE public."user";
DROP SEQUENCE public.notes_note_id_seq;
DROP TABLE public.notes;
DROP SEQUENCE public.files_files_id_seq;
DROP TABLE public.files;
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
    date_applied date DEFAULT now(),
    job_priority integer DEFAULT 1 NOT NULL,
    follow_up_date date,
    files_id bigint,
    interview_date date,
    job_info json NOT NULL
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
    goal_id integer NOT NULL,
    goal_achieved boolean DEFAULT false NOT NULL,
    currently_active boolean DEFAULT false NOT NULL,
    current_progress integer NOT NULL,
    end_goal integer NOT NULL
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
-- Name: files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.files (
    files_id integer NOT NULL,
    resume text,
    cover_letter text,
    letter_of_recommendation text
);


--
-- Name: files_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.files_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: files_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.files_files_id_seq OWNED BY public.files.files_id;


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
-- Name: files files_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files ALTER COLUMN files_id SET DEFAULT nextval('public.files_files_id_seq'::regclass);


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

COPY public."UserSelectedJob" (user_job_id, user_id, job_status, date_applied, job_priority, follow_up_date, files_id, interview_date, job_info) FROM stdin;
25	1	Interested	2020-05-05	1	\N	\N	\N	{"id":"1509905252","url":"https://www.adzuna.com/land/ad/1509905252?se=EvRnhhyP6hG_Mkwf_ZKZMw&utm_medium=api&utm_source=e4056c10&v=3DD863CCEAA36ABE54355E96B1AC313FBB46CFF2","title":"SQL Programmer","company":"Robert Half","state":"California","county":"Los Angeles County","latitude":34.115582,"longitude":-118.270863,"description":"Description Robert Half Technology is looking for a SQL Programmer with technical expertise working within a Java environment. This SQL Programmer role is a long term temporary employment opportunity located in the Los Angeles, California area. We are looking to present candidates immediately and this SQL Programmer position will not be open long. You can apply for this position today by sending your resume to Jason.KootRHT.com or by contacting (949) 623-2673 Extension 29622. You can also conne…"}
23	1	Applied	2020-05-05	4	\N	\N	\N	{"id":"1515428365","url":"https://www.adzuna.com/land/ad/1515428365?se=ABAU_huP6hGX5xsi_ZKZMw&utm_medium=api&utm_source=e4056c10&v=2387EE3CCAEBC5E308C2DCD74B7CEC71740B6877","title":"Entry Level Web Developer","company":"Robert Half","city":"Temecula","state":"California","county":"Riverside County","latitude":33.49,"longitude":-117.15,"description":"Description Robert Half Technology is looking for a entry level Web Developer in Temecula, CA. Our client, an online retailer for commercial plumbing and air conditioning supplies, is in need of a web developer to help maintain their already existing website. You will be in charge of maintaining, expanding, and scaling our client's website. Responsibilities Include Write well designed, testable, efficient code by using best software development practices Create website layoutuser interface by u…"}
24	1	Interested	2020-05-05	2	\N	\N	\N	{"id":"1515427291","url":"https://www.adzuna.com/land/ad/1515427291?se=EvRnhhyP6hG_Mkwf_ZKZMw&utm_medium=api&utm_source=e4056c10&v=7667B0CABF619FC2BEA064561FE1827F06A64A85","title":"Clinical Programmer or Clinical SAS Programmer","company":"American Cybersystems, Inc.","city":"Irvine","state":"California","county":"Orange County","latitude":33.751486,"longitude":-117.75493,"description":"Ascent has an immediate need for a Clinical Programmer or Clinical SAS Programmer This is a 6 months contract to hire opportunity (with long-term potential) and is in Irvine, CA (REMOTE). Our client is a leading Air Lines company. Please review the job description below Top Skills Medidata RAVE, Validation, SAS Programming or any Programming experience Key Responsibilities The Sr. Analyst, EDC Database Validation will be responsible for managing data validation activities using EDC (electronic …"}
22	1	Rejected	2020-05-05	2	\N	\N	\N	{"id":"1360942229","url":"https://www.adzuna.com/land/ad/1360942229?se=ABAU_huP6hGX5xsi_ZKZMw&utm_medium=api&utm_source=e4056c10&v=45C8C23A16EC498FA56986334CA992DE924F73B2","title":"Web Developer - Angular","company":"Extron Electronics","city":"Anaheim Hills","state":"California","county":"Orange County","latitude":33.856948,"longitude":-117.740666,"description":"WEB DEVELOPER - ANGULAR Extron Electronics is looking for a Software Engineer that specializes in web application development using Angular and related technologies to deliver first class user experiences for distributed applications centered around the management and presentation of audio and video content. Qualified Candidates will have: BSCS degree (transcripts required) 3 years of software development experience. Proven proficiency in developing Angular web applications. Knowledge and aware…"}
26	1	Interested	2020-05-05	1	\N	\N	\N	{"id":"1509928103","url":"https://www.adzuna.com/land/ad/1509928103?se=VMWuBimP6hGKfQiuhskQEA&utm_medium=api&utm_source=e4056c10&v=385B3D26BBE1818BD272363219F401DBF0D3EC12","title":"Web Developer","company":"CGS Business Solutions","state":"California","county":"Los Angeles County","contract":"full_time","latitude":34.115582,"longitude":-118.270863,"description":"CGS Business Solutions is committed to helping you, as an esteemed Technical Professional, find the next right step in your career. We match professionals like you to rewarding consulting or full-time opportunities in your area of expertise. We are currently seeking Technical Professionals who are searching for challenging and rewarding roles for the following opportunity CGS is currently accepting resumes for a Web Developer Webmaster, who will be serving as the implementation lead for all new…"}
27	1	Interested	2020-05-05	1	\N	\N	\N	{"id":"1509900237","url":"https://www.adzuna.com/land/ad/1509900237?se=VMWuBimP6hGKfQiuhskQEA&utm_medium=api&utm_source=e4056c10&v=A0214B1C315D27B1CEA18A4A4287CD807EE99476","title":".NET Web Developer","company":"Motion Recruitment","state":"California","county":"Los Angeles County","contract":"full_time","latitude":34.115582,"longitude":-118.270863,"description":"A huge commercial lighting company located in Los Angeles is looking to add a Senior .NET Developer to the team They are looking for a driven problem solver to work on their company website with the latest and greatest tech They are specifically using C, ASP.NET, MVC, Entity Framework, WCF, Web API, JQuery, JavaScript, HTML, CSS, SQL and need someone who has worked in a .NET environment for at least three years. This position offers competitive salary, excellent benefits and a lot of room for g…"}
21	1	Applied	2020-05-05	3	\N	\N	\N	{"id":"1536354943","url":"https://www.adzuna.com/land/ad/1536354943?se=ABAU_huP6hGX5xsi_ZKZMw&utm_medium=api&utm_source=e4056c10&v=1F361028FF2FB3D6BE6EEE3EB3E4B35F04F96E2A","title":"Senior Web Developer","company":"Workbridge Associates","city":"Irvine","state":"California","county":"Orange County","latitude":33.751486,"longitude":-117.75493,"description":"A big name in the Orange County home automation space is looking for a Senior Web Developer to build out the front end of their main web application. They need a Senior Web Developer to join their team and help build new features for the application that connects customers to all of their products. The ideal candidate is a forward-thinking engineer with strong Angular experience and a desire to grow. If you're looking to showcase your Angular expertise, and if you are eager to tackle new challe…"}
19	1	Interested	2020-05-05	1	\N	\N	\N	{"id":"1509929008","url":"https://www.adzuna.com/land/ad/1509929008?se=ABAU_huP6hGX5xsi_ZKZMw&utm_medium=api&utm_source=e4056c10&v=23F10E069BABCC24026531D6BF55FE5696557776","title":"Web Developer","company":"Prelude Systems, Inc.","city":"Santa Ana","state":"California","county":"Orange County","latitude":33.746392,"longitude":-117.860447,"description":"Experience As a front-end software development engineer on the team, you will translate concepts and business requirements in user flows, wireframes, mock-ups and prototypes that lead to an intuitive user experience. You will work closely with product owner and stake holder to gain clear understanding of product vision and requirements. You will also provide strategic design and user-experience recommendations based on the core features and new features of our products. You will collaborate wit…"}
\.


--
-- Data for Name: UsersGoal; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsersGoal" (user_goal_id, user_id, goal_id, goal_achieved, currently_active, current_progress, end_goal) FROM stdin;
\.


--
-- Data for Name: UsersStats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UsersStats" (user_stats_id, number_job_applied_total, days_checked_in, days_checked_in_consectively, user_id) FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.files (files_id, resume, cover_letter, letter_of_recommendation) FROM stdin;
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

SELECT pg_catalog.setval('public."UserSelectedJob_user_job_id_seq"', 27, true);


--
-- Name: UsersGoal_user_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UsersGoal_user_goal_id_seq"', 1, false);


--
-- Name: UsersStats_user_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UsersStats_user_stats_id_seq"', 1, false);


--
-- Name: files_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.files_files_id_seq', 1, false);


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
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (files_id);


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

