import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MySwalToast = (str, navigate) => {
  MySwal.fire({
    title: <p>{str}</p>,
    // showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: '前往登入',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      navigate("/login");
    }
  });
}

export default MySwalToast;
