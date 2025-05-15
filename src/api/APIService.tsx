import axios, { AxiosResponse, AxiosError } from 'axios';


// Create a service class to handle API calls
class APIService {
    private axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        timeout: 10000, // Example timeout
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("si_token")}`
        },
    });

    // Example GET request
    public async fetchData(endpoint: string): Promise<any> {
        try {
            const response: AxiosResponse = await this.axiosInstance.get(endpoint);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    // Example POST request
    public async sendData(endpoint: string, data: any): Promise<any> {
        try {
            const response: AxiosResponse = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    // Handle errors (you can customize this based on your needs)
    private handleError(error: AxiosError) {
        if (error.response) {
            // The request was made, but the server responded with a status code that falls out of the range of 2xx
            console.error('Response Error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error:', error.message);
        }
    }

    public async deleteData(endpoint: string): Promise<any> {
        try {
            const response: AxiosResponse = await this.axiosInstance.delete(endpoint);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }
}

export default new APIService() as APIService;
