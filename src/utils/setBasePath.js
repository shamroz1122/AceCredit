import axios from "axios";

const setBasePath = () => {
        axios.defaults.baseURL = 'https://upah.me/api'
}

export default setBasePath;