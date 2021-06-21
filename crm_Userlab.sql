-- Database: crmUserlab

-- DROP DATABASE "crmUserlab";

CREATE DATABASE "crmUserlab";
	


CREATE TABLE public.clients
(
    idclient integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    clientname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    clienttype character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phonenumber integer NOT NULL,
    iscompany boolean NOT NULL,
    status boolean NOT NULL,
    creationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT clients_pkey PRIMARY KEY (idclient)
)

TABLESPACE pg_default;

ALTER TABLE public.clients
    OWNER to postgres;
	

CREATE TABLE public.contacts
(
    idcontact integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    idclient integer,
    contactname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    contactlastname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    job character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phonenumber integer NOT NULL,
    address character varying(100) COLLATE pg_catalog."default" NOT NULL,
    status boolean,
    creationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT contacts_pkey PRIMARY KEY (idcontact),
    CONSTRAINT contacts_idclient_fkey FOREIGN KEY (idclient)
        REFERENCES public.clients (idclient) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.contacts
    OWNER to postgres;
	
	
CREATE TABLE public.projects
(
    idproject integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    projectname character varying(100) COLLATE pg_catalog."default",
    idcontact integer,
    description character varying(500) COLLATE pg_catalog."default",
    projectlocation character varying(100) COLLATE pg_catalog."default",
    initdate date,
    finishdate date,
    supervisor character varying(100) COLLATE pg_catalog."default",
    status boolean NOT NULL,
    creationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT projects_pkey PRIMARY KEY (idproject),
    CONSTRAINT projects_idcontact_fkey FOREIGN KEY (idcontact)
        REFERENCES public.contacts (idcontact) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.projects
    OWNER to postgres;
	
CREATE TABLE public.meetings
(
    idmeeting integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    idproject integer,
    meetingname character varying(100) COLLATE pg_catalog."default",
    description character varying(500) COLLATE pg_catalog."default",
    initmeeting timestamp without time zone,
    finishmeeting timestamp without time zone,
    meetinglocation character varying(100) COLLATE pg_catalog."default",
    status boolean NOT NULL,
    creationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT meetings_pkey PRIMARY KEY (idmeeting),
    CONSTRAINT meetings_idproject_fkey FOREIGN KEY (idproject)
        REFERENCES public.projects (idproject) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.meetings
    OWNER to postgres;
	
CREATE TABLE public.guestsmeeting
(
    idguestsmeeting integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    idmeeting integer,
    idcontact integer,
    CONSTRAINT guestsmeeting_pkey PRIMARY KEY (idguestsmeeting),
    CONSTRAINT guestsmeeting_idcontact_fkey FOREIGN KEY (idcontact)
        REFERENCES public.contacts (idcontact) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT guestsmeeting_idmeeting_fkey FOREIGN KEY (idmeeting)
        REFERENCES public.meetings (idmeeting) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.guestsmeeting
    OWNER to postgres;