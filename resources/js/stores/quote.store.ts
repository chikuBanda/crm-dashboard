import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useForm } from '@inertiajs/vue3'

type UploadedFile = {
    uuid: string,
    name: string,
    size: string,
    type: string | null,
    file: File
}

export const useQuoteStore = defineStore('quote', () => {
    const formDataPersonal = reactive({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        position: ''
    })

    const formDataRequest = reactive({
        product_or_service: 'Select a product or service',
        quantity: 0,
        start_date: 'Pick a day',
        end_date: 'Pick a day',
        budget_min: 0,
        budget_max: 0
    })

    const formDataDescription = reactive({
        description: ''
    })

    const formDataAttachments = reactive<{ files: UploadedFile[] }>({
        files: []
    })

    const submit = () => {
        console.log("starting submission")

        try {
            const payload = {
                ...formDataPersonal,
                ...formDataRequest,
                ...formDataDescription
            }

            console.log("payload", payload)
            console.log("type date", typeof payload.start_date)

            const form = useForm(payload)

            form.post('/api/quote', {
                preserveScroll: true
            })
        } catch (err) {
            console.log(err)
        }   
    }

    return {
        formDataPersonal,
        formDataRequest,
        formDataDescription,
        formDataAttachments,
        submit
    }
})