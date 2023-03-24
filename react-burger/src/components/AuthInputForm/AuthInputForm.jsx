import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./AuthInputForm.module.css";

export default function AuthInputForm (props) {
  const form = props.form;

  return (
    form && <div>
      { form.title && (
        <h1 className={style.title}>{form.title}</h1>
      )}
      <form onSubmit={form.submit.onSubmit}>
        { form.input.length > 0 && 
            form.input.map( (input) => {
              if (input.name === 'password') {
                return (
                  <PasswordInput
                    onChange={(e) => {input.state.setValue(e.target.value)}}
                    value={input.state.value}
                    name={'password'}
                    extraClass="mb-2"
                    key={input.key}
                  />
              )} else if (input.name === 'email') {
                  return (
                    <EmailInput
                      onChange={(e) => {input.state.setValue(e.target.value)}}
                      value={input.state.value}
                      name={'email'}
                      extraClass="mb-2"
                      key={input.key}
                    />
                )} else {
                  return (
                    <Input
                      type="text"
                      placeholder={input.placeHolder}
                      value={input.state.value}
                      onChange={(e) => {input.state.setValue(e.target.value)}}
                      key={input.key}
                    />)
                 }
          })
        }
        <Button size="medium" htmlType="submit">
          {form.submit.name}
        </Button>
      </form>
      { form.footer &&
        form.footer.map((link) => {
          return (
            <div key={link.key}>
              <p>{link.linkText}</p>
              <Link to={link.linkUrl}>
                {link.linkName}
              </Link>
            </div>
          )
        })
      }
    </div>
  );
}