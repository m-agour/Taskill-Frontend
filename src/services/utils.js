
import Toastify from "toastify-js";


const getToast = (message, error=false) => {
    let background = !error ?  "linear-gradient(to right, #00b09b, #96c93d)": "linear-gradient(to right, #ff5f9d, #ff8379)" ;
    return Toastify({
            text: `${message}`,      
            duration: 3000,
            gravity: "bottom",
            position: "right",
            gravity: "bottom",
            stopOnFocus: true,
            style: {
                background: background
            },
        });
}

export { getToast };