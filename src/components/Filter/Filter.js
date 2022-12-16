import AddContactInput from '../AddContactInput/AddContactInput';

export default function Filtr({ value, onChange }) {
  return (
    <AddContactInput
      type="text"
      name="Find contacts by name"
      value={value}
      hahdleChange={e => onChange(e.currentTarget.value)}
      title=""
      pattern=""
    />
  );
}
