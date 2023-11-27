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

  export const editInfo = (type, title, patchData, token, isError, error) =>
  Swal.fire({
    title,
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    confirmButtonText: "确认",
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      if (type === "mobile") {
        const mobile = Number(data);
        if (mobile.length < 11 || mobile.length >= 12)
          return Swal.showValidationMessage(
            "请完整输入您的手机号码"
          );
        patchData({
          url: "/api/user",
          body: { mobile },
          token,
        });
      }

      if (type === "name") {
        const name = data;

        if (name.length < 3)
          return Swal.showValidationMessage(
            "姓氏不能少于三个字"
          );
        patchData({
          url: "/api/user",
          body: { name },
          token,
        });
      }

      if (isError) Swal.showValidationMessage(error?.data.err);
    },
  });

export default alert;
