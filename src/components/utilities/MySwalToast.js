import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwalToast =(str, boolean) => {
  const MySwal = withReactContent(Swal);

  const iconResult = boolean ? "success" : "error";

  MySwal.fire({
    title: <p>{str}</p>,
    position: "top-end",
    icon: `${ iconResult }`,
    showConfirmButton: false,
    timer: 1500,
  });
}

export default MySwalToast;