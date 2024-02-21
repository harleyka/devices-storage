import axios from 'axios';
import { reactive, toRefs } from "vue";

interface State<T> {
    isLoading: boolean
    hasError: boolean
    errorMessage: string
    data: T | null
}

export const useFetch = async <T>(url: string, options?: Record<'method' | 'data', unknown>) => {
    const state = reactive({
        isLoading: false,
        hasError: false,
        errorMessage: '',
        data: null
    });

    const fetchData = async () => {
        state.isLoading = true;

        try {
            const response = options?.method === 'POST' ? await axios.post(url, options.data) : await axios.get(url);

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            state.data = await response.data;
        } catch (err) {
            const typedError = err as Error;
            console.log(axios.isAxiosError(err));
            state.hasError = true;
            state.errorMessage = err.response.data;
        } finally {
            state.isLoading = false;
        }
    }

    await fetchData();

    return {
        ...toRefs(state)
    }
}