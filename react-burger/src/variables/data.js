export const selectedIngredient = [
  "60d3b41abdacab0026a733c6",
  "60d3b41abdacab0026a733ce",
  "60d3b41abdacab0026a733c9",
  "60d3b41abdacab0026a733d1",
  "60d3b41abdacab0026a733d0",
  "60d3b41abdacab0026a733d0",
  "60d3b41abdacab0026a733ca",
  "60d3b41abdacab0026a733ca"
];
export const chapters = [
  {title: "Булки", type: "bun"},
  {title: "Соусы", type: "sauce"},
  {title: "Начинки", type: "main"}
];

export const formLogin = {
  title: 'Вход',
  input: [
    {name: 'email', placeHolder: 'E-mail'},
    {name: 'password', placeHolder: 'Пароль'}
  ],
  submit: {
    name: 'Войти',
    onSubmit: () => {}
  },
  footer: [
    {
      text: 'Вы — новый пользователь?',
      linkName: 'Зарегистрироваться',
      linkUrl: '/register'
    }
  ]
};
export const formRegister = {
  title: 'Регистрация',
  input: [
    {name: 'name', placeHolder: 'Имя'},
    {name: 'email', placeHolder: 'E-mail'},
    {name: 'password', placeHolder: 'Пароль'}
  ],
  submit: {
    name: 'Зарегистрироваться',
    onSubmit: () => {}
  },
  footer: [
    {
      text: 'Уже зарегистрированы?',
      linkName: 'Войти',
      linkUrl: '/login'
    }
  ]
};
export const formForgotPassword = {
  title: 'Восстановление пароля',
  input: [
    {name: 'email', placeHolder: 'E-mail'}
  ],
  submit: {
    name: 'Восстановить',
    onSubmit: () => {}
  },
  footer: [
    {
      text: 'Вспомнили пароль?',
      linkName: 'Войти',
      linkUrl: '/login'
    }
  ]
};
export const formResetPassword = {
  title: 'Восстановление пароля',
  input: [
    {name: 'password', placeHolder: 'Введите новый пароль'},
    {name: 'key', placeHolder: 'Введите код из письма'}
  ],
  submit: {
    name: 'Сохранить',
    onSubmit: () => {}
  },
  footer: [
    {
      text: 'Вспомнили пароль?',
      linkName: 'Войти',
      linkUrl: '/login'
    }
  ]
};