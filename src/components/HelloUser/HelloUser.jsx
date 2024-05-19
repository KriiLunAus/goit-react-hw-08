import { logOutUser } from "../../redux/auth/operations";
import { selectUserName } from "../../redux/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import css from "./HelloUser.module.css";

export default function () {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  const handleClick = () => {
    dispatch(logOutUser());
  };

  return (
    <div className={css.helloWrapper}>
      <p>Hello {userName}</p>
      <button onClick={handleClick} className={css.btn}>
        LogOut
      </button>
    </div>
  );
}
