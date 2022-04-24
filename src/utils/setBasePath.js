import axios from "axios";

const setBasePath = () => {

        axios.defaults.baseURL = 'https://itace.website/acecredit/api'

}

export default setBasePath;