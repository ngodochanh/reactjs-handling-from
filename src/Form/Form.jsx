import { useEffect, useState } from 'react';
import { LEFT, RIGHT } from './constants';
import FormField from './FormField';

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

  const [errorForm, setErrorForm] = useState({
    username: undefined,
    email: undefined,
    pwd: undefined,
    cpwd: undefined,
    birthday: undefined,
    occupation: undefined,
    gender: undefined,
    languages: undefined,
    address: undefined,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validators = {
    required: (value, message = 'Vui lòng nhập trường này') => {
      if (typeof value === 'string') {
        return value.trim() ? undefined : message;
      } else {
        return value ? undefined : message;
      }
    },

    email: (value, message = 'Trường này là một email') => {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message;
    },

    minLength: (value, length, message) => {
      return value.length >= length ? undefined : message || `Vui lòng nhập ít nhất ${length} ký tự`;
    },

    match: (value1, value2, message = 'Mật khẩu không khớp') => {
      return value1 === value2 ? undefined : message;
    },

    isSelected: (value, message = 'Vui lòng chọn ít nhất một trường') => {
      return value.length > 0 ? undefined : message;
    },
  };

  const validateField = (name, value) => {
    let errorMessage;

    switch (name) {
      case 'email':
        errorMessage = validators.required(value) || validators.email(value);
        break;
      case 'pwd':
        errorMessage = validators.required(value) || validators.minLength(value, 6);
        break;
      case 'cpwd':
        errorMessage = validators.required(value) || validators.match(value, formData.pwd);
        break;
      case 'gender':
        errorMessage = validators.required(value, 'Vui lòng chọn một trường');
        break;
      case 'languages':
        errorMessage = validators.isSelected(value);
        break;
      default:
        errorMessage = validators.required(value);
        break;
    }

    return errorMessage;
  };

  const handleOnFocus = (e) => {
    const { name } = e.target;
    setErrorForm((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
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

      if (name === 'pwd') {
        const errorMessage = validators.match(value, formData.cpwd);
        setErrorForm((prev) => ({ ...prev, cpwd: errorMessage }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
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

  useEffect(() => {
    const hasErrors = Object.values(errorForm).some((error) => error !== undefined);
    const hasValidFormData = Object.values(formData).every((value) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      } else if (Array.isArray(value)) {
        return value.length > 0;
      }
      return true;
    });

    setIsFormValid(!hasErrors && hasValidFormData);
  }, [errorForm, formData]);

  const renderItem = (arr) => {
    return arr.map((item) => (
      <FormField
        key={item.name}
        item={item}
        formData={formData}
        errorForm={errorForm}
        handleOnChange={handleOnChange}
        handleOnBlur={handleOnBlur}
        handleOnFocus={handleOnFocus}
        handleCheck={handleCheck}
      />
    ));
  };

  return (
    <>
      <h2 className='text-center'>Đăng ký thông tin</h2>
      <form onSubmit={handleSubmit} className='container'>
        <div className='row'>
          <div className='col mb-3'>{renderItem(LEFT)}</div>
          <div className='col mb-3'>{renderItem(RIGHT)}</div>
          <div className='mb-3'>
            <button className='btn btn-primary w-100' type='submit' disabled={!isFormValid}>
              Gửi thông tin
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FormInfo;
