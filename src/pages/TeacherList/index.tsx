import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);


  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    const form = { subject, week_day, time };
    console.log(form);
    const response = await api.get('classes', { params: form });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSubmitForm}>

          <Select
            name="subject"
            value={subject}
            label="Matéria"
            onChange={e => setSubject(e.target.value)}
            options={
              [
                { value: 'Artes', label: 'Artes' },
                { value: 'Quimica', label: 'Quimica' },
                { value: 'Ciencias', label: 'Ciencias' },
                { value: 'Geografia', label: 'Geografia' },
              ]}
          />

          <Select
            name="week_day"
            value={week_day}
            label="Dia da Semana"
            onChange={e => setWeekDay(e.target.value)}
            options={
              [
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' },
              ]}
          />

          <Input
            name="time"
            value={time}
            label="Hora"
            type="time"
            onChange={e => {
              setTime(e.target.value);
            }
            }
          />

          <button type="submit"> Buscar </button>

        </form>
      </PageHeader>

      <main>
        {
          teachers.map((teacherItem: Teacher) => {
            return <TeacherItem key={teacherItem.id} teacher={teacherItem} />
          })
        }
      </main>
    </div>

  );
}
export default TeacherList;