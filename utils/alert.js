import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alert = (icon, msg) =>
  MySwal.fire({
    position: "center",
    icon,
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });

export const confirmAlert = ({ title, text, icon, confirmButtonText }) =>
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
  
    confirmButtonText,
  });

export default alert;
