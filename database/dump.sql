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
    job_id integer NOT NULL,
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
    job_status text NOT NULL,
    date_applied date DEFAULT now() NOT NULL,
    job_priority integer NOT NULL,
    follow_up_date date,
    files_id bigint NOT NULL,
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
    date_type text NOT NULL
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

COPY public."JobNotes" (job_note_id, job_id, note_id) FROM stdin;
\.


--
-- Data for Name: UserSelectedJob; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserSelectedJob" (user_job_id, user_id, job_status, date_applied, job_priority, follow_up_date, files_id, interview_date, job_info) FROM stdin;
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

COPY public.notes (note_id, note_title, note_content, date_posted, date_type) FROM stdin;
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

SELECT pg_catalog.setval('public."JobNotes_job_note_id_seq"', 1, false);


--
-- Name: UserSelectedJob_user_job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."UserSelectedJob_user_job_id_seq"', 1, false);


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

SELECT pg_catalog.setval('public.notes_note_id_seq', 1, false);


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

