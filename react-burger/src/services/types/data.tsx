import { FormEvent } from "react";
import { AppDispatch } from "../store";

export type FormAuth = {
  title: string;
  input: FormAuthInputSettings[];
  submit: {
    name: string,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
  };
  footer: FormAuthFooterItem[];
};

type FormAuthInputSettings = {
  name: string;
  placeHolder: string;
  state: { 
    value: string; 
    setValue: (value: string) => void;
  };
  key: string;
};

type FormAuthFooterItem = {
  linkText: string;
  linkName: string;
  linkUrl: string;
  key: string;
};

export type Callback = (dispatch: AppDispatch, params?: any) => Promise<boolean>;