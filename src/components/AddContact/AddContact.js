import { useState, useEffect } from 'react';
import AddContactInput from '../AddContactInput/AddContactInput';
import style from './AddContact.module.css';
import {
  useGetCreateContactMutation,
  useGetFetchPhonebookQuery,
} from '../../Redux/phonebook/phonebook-slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddContact() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [handleAddContact, { isLoading, isError: isErr, error: err }] =
    useGetCreateContactMutation();
  const { data, isSuccess } = useGetFetchPhonebookQuery();

  useEffect(() => {
    if (isErr) {
      toast.error(`error ${err.status} (${err.data})`);
    }
  }, [isErr, err]);

  const hahdleChange = e => {
    if (e.currentTarget.name === 'name') setName(e.currentTarget.value);
    if (e.currentTarget.name === 'number') setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      data.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    ) {
      toast.info(`"${name}" is already in contacts.`);
    } else handleAddContact({ name, phone: number });

    resetState();
  };

  const resetState = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={style.inputForm} onSubmit={handleSubmit}>
      <AddContactInput
        type="text"
        name="Name"
        value={name}
        hahdleChange={hahdleChange}
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      />
      <AddContactInput
        type="tel"
        name="Number"
        value={number}
        hahdleChange={hahdleChange}
        title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      />

      <button type="submit" className={style.btn}>
        Add Contact
      </button>
    </form>
  );
}
