const USERNAME = {
  prettier: 'Text',
  label: 'Username',
  name: 'username',
  placeholder: 'Nhập username',
};

const EMAIL = {
  prettier: 'Text',
  type: 'email',
  label: 'Email',
  name: 'email',
  placeholder: 'Nhập email',
};

const PWD = {
  prettier: 'Text',
  type: 'password',
  label: 'Mật khẩu',
  name: 'pwd',
  placeholder: 'Nhập mật khẩu',
  autoComplete: 'pwd',
};

const CPWD = {
  prettier: 'Text',
  type: 'password',
  label: 'Xác nhận mật khẩu',
  name: 'cpwd',
  placeholder: 'Nhập lại mật khẩu',
  autoComplete: 'cpwd',
};

const BIRTHDAY = {
  prettier: 'Text',
  type: 'date',
  label: 'Ngày sinh',
  name: 'birthday',
};

const OCCUPATION = {
  prettier: 'Select',
  type: 'checkbox',
  label: 'Công việc',
  name: 'occupation',
  options: [
    { id: 'occ', value: 'Chọn công việc' },
    { id: 'occ1', value: 'Xây dựng một ứng dụng mới' },
    { id: 'occ2', value: 'Phân tích nghiệp vụ' },
    { id: 'occ3', value: 'Viết code' },
    { id: 'occ4', value: 'Review code' },
  ],
};

const GENDER = {
  prettier: 'Check',
  type: 'radio',
  label: 'Giới tính',
  name: 'gender',
  options: [
    { id: 'male', value: 'Male' },
    { id: 'female', value: 'Female' },
    { id: 'other', value: 'Other' },
  ],
};

const LANGUAGES = {
  prettier: 'Check',
  type: 'checkbox',
  label: 'Ngôn ngữ ',
  name: 'languages',
  options: [
    { id: 'lang1', value: 'HTML & CSS' },
    { id: 'lang2', value: 'JavaScript' },
    { id: 'lang3', value: 'ReactJS' },
  ],
};

const ADDRESS = {
  prettier: 'TextArea',
  label: 'Địa chỉ ',
  name: 'address',
  placeholder: 'Nhập địa chỉ',
};

const LEFT = [USERNAME, EMAIL, PWD, CPWD, BIRTHDAY];
const RIGHT = [OCCUPATION, GENDER, LANGUAGES, ADDRESS];

export { LEFT, RIGHT };
