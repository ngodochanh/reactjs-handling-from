import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
    occupation: '',
    gender: '',
    languages: [],
    address: '',
  });

  const [formError, setFormError] = useState({});

  const handleOnChange = (e) => {
    if (e.target.name === 'languages') {
      const copy = { ...formData };
      if (e.target.checked) {
        copy.languages.push(e.target.value);
      } else {
        copy.languages = copy.languages.filter((language) => language !== e.target.value);
      }

      setFormData(copy);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let err = {};

    if (formData.username === '') {
      err.username = 'Username required';
    }

    if (formData.email === '') {
      err.email = 'Email required';
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(formData.email)) {
        err.email = 'Email not validate';
      }
    }

    if (formData.password === '' || formData.cpassword === '') {
      err.password = 'Password and Confirm Password required';
    } else if (formData.password !== formData.cpassword) {
      err.password = 'Password not matched';
    } else if (formData.password.length < 6) {
      err.password = 'Password should greater than 6 characters';
    }

    if (formData.occupation === '') {
      err.occupation = 'Occupation required';
    }

    if (formData.gender === '') {
      err.gender = 'Gender required';
    }

    if (formData.languages.length === 0) {
      err.languages = 'Any one language required';
    }

    if (formData.address === '') {
      err.address = 'Address required';
    }

    setFormError({ ...err });

    return Object.keys(err).length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validateForm();

    if (isValid) {
      console.table(formError);
    } else {
      console.table(formData);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-3">React Js Form Handling</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                User Name
              </label>

              <input
                type="text"
                className={`form-control ${formError.username && 'is-invalid'}`}
                id="username"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleOnChange}
              />

              <div className="invalid-feedback">{formError.username}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>

              <input
                type="email"
                className={`form-control ${formError.email && 'is-invalid'}`}
                id="email"
                name="email"
                placeholder="email@gmail.com"
                value={formData.email}
                onChange={handleOnChange}
              />

              <div className="invalid-feedback">{formError.email}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>

              <input
                type="password"
                className={`form-control ${formError.password && 'is-invalid'}`}
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                value={formData.password}
                onChange={handleOnChange}
              />

              <div className="invalid-feedback">{formError.password}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label fw-bold">
                Confirm Password
              </label>

              <input
                type="password"
                className={`form-control ${formError.cpassword && 'is-invalid'}`}
                id="cpassword"
                name="cpassword"
                placeholder=" Confirm Password"
                autoComplete="cpassword"
                value={formData.cpassword}
                onChange={handleOnChange}
              />

              <input type="date" />

              <div className="invalid-feedback">{formError.cpassword}</div>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <label htmlFor="occupation" className="form-label fw-bold">
                Occupation
              </label>

              <select
                className={`form-control ${formError.occupation && 'is-invalid'}`}
                id="occupation"
                name="occupation"
                defaultValue={formData.occupation}
                onChange={handleOnChange}
              >
                <option value="">Select an option</option>
                <option value="occ1">Software Developer</option>
                <option value="occ2">Software Engineer</option>
                <option value="occ3">Full Stack Developer</option>
              </select>

              <div className="invalid-feedback">{formError.occupation}</div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Gender</label>

              <div className={`d-flex justify-content-between is-invalid ${formError.gender && 'is-invalid'}`}>
                <div className="form-check">
                  <input
                    className={`form-check-input ${formError.gender && 'is-invalid'}`}
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleOnChange}
                  />

                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className={`form-check-input ${formError.gender && 'is-invalid'}`}
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleOnChange}
                  />

                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className={`form-check-input ${formError.gender && 'is-invalid'}`}
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleOnChange}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
              <div className="invalid-feedback">{formError.gender}</div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Languages</label>

              <div className={`d-flex justify-content-between ${formError.languages && 'is-invalid'}`}>
                <div className="form-check">
                  <input
                    className={`form-check-input ${formError.languages && 'is-invalid'}`}
                    type="checkbox"
                    value="langs1"
                    id="langs1"
                    name="languages"
                    checked={formData.languages.includes('langs1')}
                    onChange={handleOnChange}
                  />
                  <label className="form-check-label" htmlFor="langs1">
                    HTML & CSS
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className={`form-check-input ${formError.languages && 'is-invalid'}`}
                    type="checkbox"
                    value="langs2"
                    id="langs2"
                    name="languages"
                    checked={formData.languages.includes('langs2')}
                    onChange={handleOnChange}
                  />
                  <label className="form-check-label" htmlFor="langs2">
                    JavaScript
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className={`form-check-input ${formError.languages && 'is-invalid'}`}
                    type="checkbox"
                    value="langs3"
                    id="langs3"
                    name="languages"
                    checked={formData.languages.includes('langs3')}
                    onChange={handleOnChange}
                  />
                  <label className="form-check-label" htmlFor="langs3">
                    ReactJS
                  </label>
                </div>
              </div>
              <div className="invalid-feedback">{formError.languages}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label fw-bold">
                Address
              </label>
              <textarea
                className={`form-control ${formError.address && 'is-invalid'}`}
                id="address"
                name="address"
                rows="3"
                placeholder="address"
                value={formData.address}
                onChange={handleOnChange}
              ></textarea>

              <div className="invalid-feedback">{formError.address}</div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
