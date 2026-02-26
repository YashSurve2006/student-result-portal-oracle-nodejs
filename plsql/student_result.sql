create table student (
  roll number primary key,
  name varchar2(50),
  class varchar2(20)
);

create table marks (
  roll number primary key,
  m1 number,
  m2 number,
  m3 number,
  total number,
  percent number,
  grade varchar2(2),
  constraint fk_roll foreign key (roll) references student(roll)
);

create table log_tab (
  msg varchar2(100),
  log_date date
);

create or replace package stud_pack as

  procedure add_student(
    p_roll number,
    p_name varchar2,
    p_class varchar2
  );

  procedure add_marks(
    p_roll number,
    p_m1 number,
    p_m2 number,
    p_m3 number
  );

  function get_grade(p_percent number) return varchar2;

end stud_pack;
/

create or replace package body stud_pack as

  procedure add_student(
    p_roll number,
    p_name varchar2,
    p_class varchar2
  ) is
  begin
    insert into student values (p_roll, p_name, p_class);
  end add_student;


  procedure add_marks(
    p_roll number,
    p_m1 number,
    p_m2 number,
    p_m3 number
  ) is
  begin
    insert into marks (roll, m1, m2, m3)
    values (p_roll, p_m1, p_m2, p_m3);
  end add_marks;


  function get_grade(p_percent number) return varchar2 is
  begin
    if p_percent >= 75 then
      return 'a';
    elsif p_percent >= 60 then
      return 'b';
    elsif p_percent >= 50 then
      return 'c';
    else
      return 'f';
    end if;
  end get_grade;

end stud_pack;
/

create or replace trigger trg_marks
before insert on marks
for each row
begin
  :new.total := :new.m1 + :new.m2 + :new.m3;
  :new.percent := :new.total / 3;
  :new.grade := stud_pack.get_grade(:new.percent);

  insert into log_tab
  values ('result calculated', sysdate);
end;
/

