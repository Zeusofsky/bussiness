import { toast } from 'react-toastify';
// import asft from '../assets/asft.png';

export const toastInfo = (message: string) => {
        toast.info( message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
export const toastSuccess = (message: string) => {
        toast.success( message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
export const toastWarning = (message: string) => {
        toast.warn( message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
export const toastError = (message: string) => { 
        toast.error( message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });        
    }


//     export const toastError = (message: string) => { 
//         toast.error('🦄 '+ message, {
//             position: "top-right",
//             autoClose: 4000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//             });        
//     }