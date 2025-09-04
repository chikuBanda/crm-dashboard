<script setup lang="ts">
import { Quote } from '@/types';
import axios, { AxiosResponse } from 'axios';
import { onMounted, ref, Ref, watch } from 'vue';
import moment from 'moment';
import { router } from '@inertiajs/vue3'

const quotes: Ref<Quote[]> = ref([])
const selectedQuotes: Ref<number[]> = ref([])

onMounted(async () => {
    try {
        const response: AxiosResponse<{ data: Quote[] }> = await axios.get('http://127.0.0.1:8000/api/quotes')
        quotes.value = response.data.data
        console.log('response', response)
        console.log('quotes.value', quotes.value)
    } catch (err) {
        console.log("quotes list api err", err)
    }
})

const toggleAllSelectedQuotes = (evt: Event) => {
    const isChecked = (evt.target as HTMLInputElement).checked

    if (isChecked) {
        const quote_select_inputs = document.getElementsByClassName("quote-checkbox")

        if (quote_select_inputs) {
            for (const elem of quote_select_inputs) {
                (elem as HTMLInputElement).checked = true;
            }

            selectedQuotes.value = quotes.value.map((quote) => quote.id)
        }
    } else {
        const quote_select_inputs = document.getElementsByClassName("quote-checkbox")

        if (quote_select_inputs) {
            for (const elem of quote_select_inputs) {
                (elem as HTMLInputElement).checked = false;
            }

            selectedQuotes.value = []
        }
    }
}

const selecteQuote = (id: number, evt: Event) => {
    const isChecked = (evt.target as HTMLInputElement).checked

    if (isChecked) {
        selectedQuotes.value = [...selectedQuotes.value, id]
    } else {
        selectedQuotes.value = selectedQuotes.value.filter((val: number) => val !== id)
    }
}

watch(selectedQuotes, (newVal) => {
    console.log("newVal", newVal)
    const selectAllCheckInput = document.getElementById("quote_select_all")

    if (selectAllCheckInput) {
        if (quotes.value.length === newVal.length) {
            (selectAllCheckInput as HTMLInputElement).checked = true;
        } else {
            (selectAllCheckInput as HTMLInputElement).checked = false;
        }
    }
})
</script>

<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">Welcome to my dashboard!</h1>
        <p class="mt-2 text-gray-600 mb-10">This is an example dashboard using Tailwind CSS.</p>

        <!-- name of each tab group should be unique -->
        <div class="tabs tabs-border">
            <input type="radio" name="my_tabs_2" class="tab" :checked="true" aria-label="All Leads" />
            <div class="tab-content border-base-300 p-10">
                <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                                <input id="quote_select_all" type="checkbox" class="checkbox border"
                                    @change="(evt) => toggleAllSelectedQuotes(evt)" /> <span class="ml-2">Subject
                                    Name</span>
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name of lead
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr :key="quote.id" v-for="quote in quotes" class="hover:bg-gray-50 cursor-pointer" @click="() => router.get(`dashboard/lead/${quote.id}`)">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input type="checkbox" class="checkbox border quote-checkbox"
                                    @change="(evt) => selecteQuote(quote.id, evt)" /> <span class="ml-2">{{
                                    quote.product_or_service }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ quote.company }}</div>
                                <div class="text-sm text-gray-500">
                                    @ {{ moment(quote.created_at).format('HH:MM DD/MM/yyyy') }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <!-- <img class="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt=""> -->
                                        <div
                                            class="h-10 w-10 rounded-full bg-gray-100 flex justify-center items-center">
                                            <span class="text-sky-950 font-bold">{{
                                                `${quote.first_name[0].toUpperCase()}${quote.last_name[0].toUpperCase()}`
                                                }}</span>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ quote.first_name }} {{ quote.last_name }}
                                        </div>
                                        <div class="text-sm text-gray-500">{{ quote.position }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ quote.email }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <a href="#" class="ml-2 text-red-600 hover:text-red-900">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <input type="radio" name="my_tabs_2" class="tab" aria-label="Companies" />
            <div class="tab-content border-base-300 p-10">Tab content 2</div>

            <input type="radio" name="my_tabs_2" class="tab" aria-label="Converted leads" />
            <div class="tab-content border-base-300 p-10">Tab content 3</div>
        </div>
    </div>
</template>

<style scoped></style>