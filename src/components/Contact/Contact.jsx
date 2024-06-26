import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/contacts/slice";

const Contact = ({ contacts }) => {
  const dispatch = useDispatch();
  return (
    <>
      {contacts.map(({ id, name, number }) => {
        return (
          <li id={id} className={css.contact}>
            <div>
              <p>
                {" "}
                <IoPerson /> {name}
              </p>
              <p>
                {" "}
                <FaPhoneAlt /> {number}
              </p>
            </div>
            <button
              onClick={() => {
                dispatch(openModal({ id: id, name: name }));
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </>
  );
};

export default Contact;
