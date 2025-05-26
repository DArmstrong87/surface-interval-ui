import axios, { AxiosResponse, AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

/* eslint-disable no-unused-vars */
interface ErrorResponse {
    message: string;
    [key: string]: string;
}

class APIService {
    private axiosInstance;
    private navigate: NavigateFunction | null = null;
    private showMessage: ((message: string) => void) | null = null;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("si_token")}`,
            },
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem("si_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    // Set navigation function
    public setNavigate(navigate: NavigateFunction) {
        this.navigate = navigate;
    }

    // Set message handler
    public setMessageHandler(handler: (message: string) => void) {
        this.showMessage = handler;
    }

    // GET request
    public async fetchData<T>(endpoint: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError<ErrorResponse>);
            throw error;
        }
    }

    // POST request
    public async sendData<T>(endpoint: string, data: object): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError<ErrorResponse>);
            throw error;
        }
    }

    // Handle errors
    private handleError(error: AxiosError<ErrorResponse>) {
        if (error.response) {
            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem("si_token");
                if (this.navigate) {
                    this.navigate("/");
                }
                if (this.showMessage) {
                    this.showMessage("You have been logged out due to an expired session.");
                }
            } else if (this.showMessage) {
                // Show error message for other response errors
                const errorMessage = error.response.data?.message || "An error occurred while processing your request.";
                this.showMessage(errorMessage);
            }
            console.error("Response Error:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            if (this.showMessage) {
                this.showMessage("No response received from server. Please check your connection.");
            }
            console.error("Request Error:", error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            if (this.showMessage) {
                this.showMessage(error.message || "An unexpected error occurred.");
            }
            console.error("Error:", error.message);
        }
    }

    // DELETE request
    public async deleteData<T>(endpoint: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError<ErrorResponse>);
            throw error;
        }
    }

    // PUT request
    public async updateData<T>(endpoint: string, data: object): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error: unknown) {
            this.handleError(error as AxiosError<ErrorResponse>);
            throw error;
        }
    }
}

export default new APIService();
