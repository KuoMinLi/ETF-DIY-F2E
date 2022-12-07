import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwalToast =(str) => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();


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