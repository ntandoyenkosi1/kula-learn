
/**
 * This method is for calling APIs
 * @param endpoint Endpoint to the server. Does not start with "/"
 * @param method Methof type: GET, POST, DELETE or PUT
 * @param headers True if there are headers to pass. False if no headers in the request
 * @param data Goes along eith headers, data will be empty if headers are false
 */
export async function callApi(endpoint: string, method: string, headers: boolean, data: any) {
    /**
     * url of server
     */
    const url = `https://kula-learn-server.herokuapp.com/${endpoint}`
    if (headers) {
        const myHeaders = new Headers()
        try{
            myHeaders.append('Content-Type', 'application/json')
            myHeaders.append('x-auth-token', getCookie("token"))
        }
        catch{
            //
        }
        const requestOptions: RequestInit = {
            method: method,
            headers: myHeaders,
            body: data,
            redirect: 'follow',
        }

        void fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                return result
            })
    } else {
        const requestOptions: RequestInit = {
            method: method,
            redirect: 'follow',
        }

        void fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                return result
            })
    }
}
export function getCookie(name:string) {
	const value = `; ${document.cookie}`;
	const parts:any = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

