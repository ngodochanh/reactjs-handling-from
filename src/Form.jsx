import { useState } from 'react';
import { LEFT, RIGHT } from './constants/register';
import { Input } from './components/Input';

function FormInfo() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    pwd: '',
    cpwd: '',
    birthday: '',
    occupation: '',
    gender: '',
    languages: [],
    address: '',
  });

  const [errorForm, setErrorForm] = useState({});

  const isRequired = (value, message = 'Vui lòng nhập trường này') => {
    if (typeof value === 'string') {
      return value.trim() ? undefined : message;
    } else {
      return value ? undefined : message;
    }
  };

  const isEmail = (value, message = 'Trường này là một email') => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : message;
  };

  const isMinLength = (value, length, message) => {
    return value.length >= length ? undefined : message || `Vui lòng nhập ít nhất ${length} ký tự`;
  };

  const isMatch = (value1, value2, message = 'Mật khẩu không khớp') => {
    return value1 === value2 ? undefined : message;
  };

  const isSelected = (value, message = 'Vui lòng chọn ít nhất một trường') => {
    return value.length > 0 ? undefined : message;
  };

  const handleOnFocus = (e) => {
    const { name } = e.target;
    setErrorForm((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;

    let errorMessage = isRequired(value);

    if (name === 'email' && !errorMessage) {
      errorMessage = isEmail(value);
    }

    if (name === 'pwd' && !errorMessage) {
      errorMessage = isMinLength(value, 6);
    }

    if (name === 'cpwd' && !errorMessage) {
      errorMessage = isMatch(value, formData.pwd);
    }

    setErrorForm((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleCheck = (type, value) => {
    if (type === 'checkbox') {
      return formData.languages.includes(value);
    }
    return formData.gender === value;
  };

  const handleOnChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'languages') {
      const updatedLanguages = checked
        ? [...formData.languages, value]
        : formData.languages.filter((language) => language !== value);
      setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      let errorMessage = isRequired(formData[key]);

      if (key === 'gender') {
        errorMessage = isRequired(formData[key], 'Vui lòng chọn 1 trường');
      }

      if (key === 'email' && !errorMessage) {
        errorMessage = isEmail(formData[key]);
      }

      if (key === 'pwd' && !errorMessage) {
        errorMessage = isMinLength(formData[key], 6);
      }

      if (key === 'cpwd' && !errorMessage) {
        errorMessage = isMatch(formData[key], formData.pwd);
      }

      if (key === 'languages' && !errorMessage) {
        errorMessage = isSelected(formData[key]);
      }

      if (errorMessage) {
        errors[key] = errorMessage;
      }
    });

    setErrorForm(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      console.table(formData);
    } else {
      console.table(errorForm);
    }
  };

  const renderItem = (arr) => {
    return arr.map((item) => {
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
    });
  };

  return (
    <>
      <h2 className='text-center'>Đăng ký thông tin</h2>
      <form onSubmit={handleSubmit} className='container'>
        <div className='row'>
          <div className='col mb-3'>{renderItem(LEFT)}</div>
          <div className='col mb-3'>{renderItem(RIGHT)}</div>
          <div className='mb-3'>
            <button className='btn btn-primary w-100' type='submit'>
              Gửi thông tin
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormInfo;
