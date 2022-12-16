import style from './App.module.css';
import AddContact from '../AddContact/AddContact';
import ContactList from '../ContactList/ContactList';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <AddContact />
      <h2>Contacts</h2>
      <ContactList />
      <ToastContainer position="top-right" autoClose="2000" />
    </div>
  );
}
