psql - U postgres;
create database wsj_proj;
\ c wsj_proj;
create table users (
    id serial primary key,
    last_name varchar(255),
    first_name varchar(255),
    phone varchar(255),
    email varchar(255),
    password varchar(255),
    bio text,
    profile_img text,
    gender text,
    birthday date,
    is_banned boolean,
    is_admin boolean
);
create table events (
    id serial primary key,
    name text,
    date timestamp,
    max_participant int,
    type text,
    bio text,
    venue text,
    fee integer,
    image text,
    created_at timestamp,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP not null,
    is_full boolean,
    is_active boolean,
    is_deleted boolean,
    organiser_id int,
    constraint organiser_id foreign key (organiser_id) references users(id)
);
create table users_request (
    id serial primary key,
    user_id int,
    foreign key (user_id) references users (id),
    organiser_id int,
    foreign key (user_id) references users (id),
    event_id int,
    foreign key (event_id) references events (id),
    created_at timestamp,
    updated_at timestamp,
    processed boolean
);
create table users_joined (
    id serial primary key,
    user_id int,
    foreign key (user_id) references users (id),
    event_id int,
    foreign key (event_id) references events (id)
);
create table follower_relation (
    id serial primary key,
    user_id int,
    foreign key (user_id) references users (id),
    follower_id int,
    foreign key (follower_id) references users (id)
);
create table event_comment (
    id serial primary key,
    event_id int,
    foreign key (event_id) references events (id),
    user_id int,
    foreign key (user_id) references users (id),
    comment text,
    created_at timestamp
);
create table reports (
    id serial primary key,
    user_id int,
    foreign key (user_id) references users (id),
    event_id int,
    foreign key (event_id) references events (id),
    reason text,
    solved boolean
);
-- create table genre (
--     id serial primary key,
--     name varchar(255)
-- );
-- create table event_genre (
--     id serial primary key,
--     event_id int,
--     foreign key (event_id) references events (id),
--     genre_id int,
--     foreign key (genre_id) references genre (id)
-- );