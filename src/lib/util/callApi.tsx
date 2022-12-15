import axios from 'axios'

export default async function callApi(endpoint: string, method: string = 'get', body: object, header: object) {
    try {

        let dataQuery: any = { data: body }
        if (method === 'get' || method === "GET") {
            // Set param query on url
            dataQuery = { params: body }
        }

        const response = await axios({
            method: method,
            url: endpoint,
            ...dataQuery,
            headers: {
                'Content-Type': 'application/json',
                ...header
            }
        })


        return response.data
    } catch (err: any) {
        return false;
    }

}
