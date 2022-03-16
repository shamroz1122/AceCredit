import axios from "axios";

const setBasePath = () => {

        axios.defaults.baseURL = 'https://buddy.na/api/v1/signage'

}

export default setBasePath;