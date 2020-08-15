import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg';

import { useHistory } from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function setSchedulleItemValue(index: number, field: string, value: string) {
    const newArray = scheduleItems.map((scheduleItem, position) => {
      if (position === index) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });
    setScheduleItems(newArray);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    const form = {
      name, avatar, whatsapp, bio, subject, cost: Number.parseFloat(cost), schedule: scheduleItems
    };

    api.post('classes', form).then(resp => {
      alert('Cadastro realizado com sucesso!')
      history.push('/');
    }).catch(err => {
      alert('Erro no cadastro')
    });

  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher este formulário de inscição">
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome Completo" value={name} onChange={e => setName(e.target.value)} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <TextArea name="bio" label="Biografia" value={bio} onChange={e => setBio(e.target.value)}></TextArea>
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject" label="Matéria" value={subject} onChange={e => setSubject(e.target.value)}
              options={
                [
                  { value: 'Artes', label: 'Artes' },
                  { value: 'Quimica', label: 'Quimica' },
                  { value: 'Ciencias', label: 'Ciencias' },
                  { value: 'Geografia', label: 'Geografia' },
                ]}
            />
            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => setCost(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={scheduleItem.week_day} className="schedule-item">
                    <Select
                      name="week_day"
                      value={scheduleItem.week_day}
                      label="Dia da Semana"
                      onChange={e => setSchedulleItemValue(index, 'week_day', e.target.value)}
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
                      value={scheduleItem.from}
                      type="time"
                      name="from"
                      label="Das"
                      onChange={e => setSchedulleItemValue(index, 'from', e.target.value)} />
                    <Input
                      type="time"
                      value={scheduleItem.to}
                      name="to"
                      label="Até"
                      onChange={e => setSchedulleItemValue(index, 'to', e.target.value)} />
                  </div>
                )
              })
            }

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante <br />
            Preencha todos os dados
          </p>
            <button type="submit">
              Salvar Cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  )
}
export default TeacherForm;