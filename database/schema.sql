create table history (
  id serial primary key,
  date integer NOT NULL,
  state char(2) NOT NULL,
  positive integer,
  "lastUpdateEt" VARCHAR(50),
  death integer,
  "dataQualityGrade" varchar(2),
  "positiveIncrease" integer
);
