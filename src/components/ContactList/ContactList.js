import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.css';
import Filtr from '../Filter/Filter';
import { useState } from 'react';
import { useGetFetchPhonebookQuery } from '../../Redux/phonebook/phonebook-slice';
import { toast } from 'react-toastify';

export default function ContactList() {
  const [filter, setFilter] = useState('');

  const { data, isError, error } = useGetFetchPhonebookQuery();

  if (isError) {
    toast.error(`error ${error.status} (${error.data})`);
  }

  const changeFilter = e => {
    setFilter(e);
  };

  const contactsVisible = () => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <Filtr value={filter} onChange={changeFilter} />

          <ul className={style.list}>
            {contactsVisible().map(contact => {
              return <ContactItem key={contact.id} contact={contact} />;
            })}
          </ul>
        </>
      ) : (
        <h4>Your phonebook is empty</h4>
      )}
    </>
  );
}
