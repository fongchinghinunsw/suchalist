import TextInput from '@renderer/components/base/TextInput';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setSelectedDate(e);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <TextInput name="dateTime" label="Date / Time" onClick={handleClick} />
      {isOpen && <DatePicker selected={selectedDate} onChange={handleChange} inline />}
    </>
  );
}
