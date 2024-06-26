import { Input } from '../components/Input';

const FormField = ({ item, formData, errorForm, handleOnChange, handleOnBlur, handleOnFocus, handleCheck }) => {
  const { prettier, name } = item;
  const Component = Input[prettier];
  const messages = errorForm[name] || '';

  if (prettier === 'Check') {
    return (
      <Component
        key={name}
        {...item}
        messages={messages}
        onCheck={handleCheck}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    );
  }

  return (
    <Component
      key={name}
      {...item}
      value={formData[name]}
      messages={messages}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
};

export default FormField;
