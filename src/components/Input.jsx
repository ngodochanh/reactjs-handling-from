const Input = {
  Text({ prettier, label, name, messages, ...inputProps }) {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <div className="input-group has-validation">
          <input className={`form-control ${messages && 'is-invalid'}`} id={name} name={name} {...inputProps} />
          <div className="invalid-feedback">{messages}</div>
        </div>
      </div>
    );
  },

  Select({ prettier, label, name, options, messages, value, ...inputProps }) {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          className={`form-select ${messages && 'is-invalid'}`}
          id={name}
          name={name}
          {...inputProps}
          defaultValue={value}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{messages}</div>
      </div>
    );
  },
  Check({ prettier, label, options, messages, onCheck, ...inputProps }) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <div className={`d-flex justify-content-between ${messages && 'is-invalid'}`}>
          {options.map((option) => {
            let isChecked = onCheck(inputProps.type, option.id);
            return (
              <div className="form-check" key={option.id}>
                <input
                  className={`form-check-input ${messages && 'is-invalid'}`}
                  id={option.id}
                  value={option.id}
                  checked={isChecked}
                  {...inputProps}
                />
                <label className="form-check-label" htmlFor={option.id}>
                  {option.value}
                </label>
              </div>
            );
          })}
        </div>
        <div className="invalid-feedback">{messages}</div>
      </div>
    );
  },

  TextArea({ prettier, label, name, messages, ...inputProps }) {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <textarea
          className={`form-control ${messages && 'is-invalid'}`}
          id={name}
          name={name}
          {...inputProps}
        ></textarea>

        <div className="invalid-feedback">{messages}</div>
      </div>
    );
  },
};

export { Input };
