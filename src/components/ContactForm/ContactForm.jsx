import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, mixed } from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { nanoid } from "@reduxjs/toolkit";

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const schema = object({
    name: string().required("Required").min(3, "Too Short").max(50, "Too long"),
    number: mixed()
      .typeError("Type numbers")
      .required("Required")
      .test(
        "is-between-3-and-50-digits", //
        "Fill like this: XXX-XX-XX", // if less then 3 or grater then 50
        (value) => {
          if (!value) return false;
          const stringValue = value.toString();
          return (
            stringValue.length >= 3 &&
            stringValue.length <= 50 &&
            /^\d{3}-\d{2}-\d{2}$/.test(stringValue)
          );
        }
      ),
  });

  const handleSubmit = (values, action) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
        id: nanoid(),
      })
    );
    action.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className={css.formContainer}>
          <div className={css.formGroup}>
            <label className={css.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.field}
              id={nameFieldId}
              name="name"
              type="text"
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label className={css.label} htmlFor={numberFieldId}>
              Number
            </label>
            <Field
              className={css.field}
              id={numberFieldId}
              name="number"
              type="text"
            />
            <ErrorMessage
              className={css.ErrorMessage}
              name="number"
              component="p"
            />
          </div>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
