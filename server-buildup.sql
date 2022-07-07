create database wsj_proj;

\c wsj_proj

create table users (
    id serial primary key,
    last_name varchar(255),
    first_name varchar(255),
    phone varchar(255),
    email varchar(255),
    bio text,
    profile_img text,
    gender text,
    birthday date
);

create table events (
    id serial primary key,
    name text,
    date timestamp,
    max_participant int,
    bio text,
    venue text,
    fee integer,
    created_at timestamp,
    updated_at timestamp,
    is_full boolean,
    is_active boolean,
    is_deleted boolean,
    organiser_id integer foreign key reference users (id) on delete cascade
);

create table users_request (
    id serial primary key,
    user_id integer foreign key reference users (id) on delete cascade,
    event_id integer foreign key reference events (id) on delete cascade,
    created_at timestamp,
    updated_at timestamp,
    processed boolean
);

create table users_joined (
    id serial primary key,
    user_id integer foreign key reference users (id) on delete cascade,
    event_id integer foreign key reference events (id) on delete cascade,
);

create table follower_relation (
    id serial primary key,
    user_id integer foreign key reference users (id) on delete cascade,
    follower_id integer foreign key reference users (id) on delete cascade
);

create table event_comment (
    id serial primary key,
    event_id integer foreign key reference events (id) on delete cascade,
    user_id integer,
    comment text
);

create table reports (
    id serial primary key,
    event_id integer foreign key reference events (id) on delete cascade,
    reason text,
    solved boolean
);

create table genre (
    id serial primary key,
    name varchar(255)
);

create table event_genre (
    id serial primary key,
    event_id int foreign key reference events (id) on delete cascade,
    genre_id int foreign key reference genre (id)
);