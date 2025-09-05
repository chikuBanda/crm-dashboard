<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { computed, onMounted } from 'vue';
import { Quote } from '@/types';

// @ts-expect-error import bug
import CalendarCheckOutline from 'vue-material-design-icons/CalendarCheckOutline.vue'
// @ts-expect-error import bug
import EmailOutline from 'vue-material-design-icons/EmailOutline.vue'
// @ts-expect-error import bug
import ClipboardTextOutline from 'vue-material-design-icons/ClipboardTextOutline.vue'
// @ts-expect-error import bug
import AccountGroupOutline from 'vue-material-design-icons/AccountGroupOutline.vue'

interface QuoteResponse {
    data: Quote | null;
}

const props = defineProps<{
    quote: QuoteResponse;
}>();

onMounted(() => {
    console.log(props.quote.data)
})

const quote_object = computed(() => {
    return props.quote.data
})
</script>

<template>
    <dashboard-layout>
        <div class="grid grid-cols-12 p-2">
            <div class="col-span-8 border-r-2 border-gray-600">
                <div class="flex items-center mb-4">
                    <div class="h-16 w-16 rounded-full bg-sky-100 flex justify-center items-center mr-4">
                        <span class="text-sky-950 font-bold">{{
                            `${quote_object?.first_name[0].toUpperCase()}${quote_object?.last_name[0].toUpperCase()}`
                        }}</span>
                    </div>
                    <div>
                        <h3 class="text-lg text-sky-950 font-bold">{{ quote_object?.first_name }} {{
                            quote_object?.last_name }}</h3>
                        <p class="text-gray-500">{{ quote_object?.position }}</p>
                    </div>
                </div>

                <div class="tabs tabs-border">
                    <input type="radio" name="my_tabs_2" class="tab" :checked="true" aria-label="Activity" />
                    <div class="tab-content border-base-300 p-10">
                        <h3 class="text-xl font-bold text-sky-950 mb-4">Upcoming Activity</h3>

                        <div class="card w-full shadow-sm bg-white mb-8">
                            <div class="card-body">
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <div class="flex rounded-md h-9 w-9 bg-sky-400/10 justify-center items-center mr-2">
                                            <calendar-check-outline class="text-sky-700" :size="30"></calendar-check-outline>
                                        </div>
                                        <p>Task created by Chiku banda</p>
                                    </div>

                                    <div class="flex">
                                        <p>due</p> &nbsp;
                                        <p>Today, 12:00 pm</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="flex mb-2">
                                    <div class="mr-3 pt-1">
                                        <div class="h-5 w-5 rounded-full bg-emerald-300/40"></div>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-sky-950 mb-2">Prepare quote for jerome bell
                                        </h4>
                                        <p class="mb-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus quas, eos
                                            repellendus iste laudantium ut </p>
                                        <p class="text-gray-600">@ 12:00 today</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-12 rounded-2xl border">
                                    <div class="col-span-4 border-r p-4 px-5">
                                        <p class="mb-2 text-gray-600">Reminder</p>
                                        <details class="dropdown">
                                            <summary class="">No reminder</summary>
                                            <ul
                                                class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                <li><a>30 mins</a></li>
                                                <li><a>1 hour</a></li>
                                            </ul>
                                        </details>
                                    </div>
                                    <div class="col-span-4 border-r p-4 px-5">
                                        <p class="mb-2 text-gray-600">Task priority</p>
                                        <p>High</p>
                                    </div>
                                    <div class="col-span-4 p-4 px-5">
                                        <p class="mb-2 text-gray-600">Assigned to</p>
                                        <p>Chiku banda</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card w-full shadow-sm bg-white mb-8">
                            <div class="card-body">
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <div class="flex rounded-md h-9 w-9 bg-red-400/10 justify-center items-center mr-2">
                                            <email-outline class="text-red-700" :size="30"></email-outline>
                                        </div>
                                        <p>Email sent</p>
                                    </div>

                                    <!-- <div class="flex">
                                        <p>Sent</p> &nbsp;
                                        <p>Today, 12:00 pm</p>
                                    </div> -->
                                </div>
                                <hr>
                                
                                <div>
                                    <h4 class="text-lg font-bold text-sky-950 mb-2">
                                        You sent an <u>email</u> to the contact
                                    </h4>
                                    <p class="mb-2 text-gray-600">@ 12:00 today</p>
                                </div>
                                
                            </div>
                        </div>

                        <div class="card w-full shadow-sm bg-white mb-8">
                            <div class="card-body">
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <div class="flex rounded-md h-9 w-9 bg-teal-400/10 justify-center items-center mr-2">
                                            <clipboard-text-outline class="text-teal-700" :size="30"></clipboard-text-outline>
                                        </div>
                                        <p>Note created</p>
                                    </div>

                                    <!-- <div class="flex">
                                        <p>Sent</p> &nbsp;
                                        <p>Today, 12:00 pm</p>
                                    </div> -->
                                </div>
                                <hr>
                                
                                <div>
                                    <h4 class="text-lg font-bold text-sky-950 mb-2">
                                        You sent added a note
                                    </h4>
                                    <p class="mb-2 text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo quas repudiandae laborum corrupti distinctio placeat excepturi omnis recusandae quos doloremque nihil perferendis amet temporibus est, ullam libero eius similique minima.</p>
                                    <p class="mb-2 text-gray-600">@ 12:00 today</p>
                                </div>
                                
                            </div>
                        </div>

                        <div class="card w-full shadow-sm bg-white mb-8">
                            <div class="card-body">
                                <div class="flex justify-between">
                                    <div class="flex items-center">
                                        <div class="flex rounded-md h-9 w-9 bg-violet-400/10 justify-center items-center mr-2">
                                            <account-group-outline class="text-violet-700" :size="30"></account-group-outline>
                                        </div>
                                        <p>Meeting planned</p>
                                    </div>

                                    <div class="flex">
                                        <p>Scheduled at</p> &nbsp;
                                        <p>Today, 12:00 pm</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="flex mb-2">
                                    <div class="mr-3 pt-1">
                                        <div class="h-5 w-5 rounded-full bg-emerald-300/40"></div>
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-sky-950 mb-2">Strategy meeting
                                        </h4>
                                        <p class="mb-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus quas, eos
                                            repellendus iste laudantium ut </p>
                                        <p class="text-gray-600">@ 12:00 today</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-12 rounded-2xl border">
                                    <div class="col-span-4 border-r p-4 px-5">
                                        <p class="mb-2 text-gray-600">Reminder</p>
                                        <details class="dropdown">
                                            <summary class="">No reminder</summary>
                                            <ul
                                                class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                <li><a>30 mins</a></li>
                                                <li><a>1 hour</a></li>
                                            </ul>
                                        </details>
                                    </div>
                                    <div class="col-span-4 border-r p-4 px-5">
                                        <p class="mb-2 text-gray-600">Task priority</p>
                                        <p>High</p>
                                    </div>
                                    <div class="col-span-4 p-4 px-5">
                                        <p class="mb-2 text-gray-600">Assigned to</p>
                                        <p>Chiku banda</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="radio" name="my_tabs_2" class="tab" aria-label="Emails" />
                    <div class="tab-content border-base-300 p-10">Email content</div>

                    <input type="radio" name="my_tabs_2" class="tab" aria-label="Calls" />
                    <div class="tab-content border-base-300 p-10">Call content</div>

                    <input type="radio" name="my_tabs_2" class="tab" aria-label="Tasks" />
                    <div class="tab-content border-base-300 p-10">Tasks content</div>

                    <input type="radio" name="my_tabs_2" class="tab" aria-label="Files" />
                    <div class="tab-content border-base-300 p-10">Files content</div>

                    <input type="radio" name="my_tabs_2" class="tab" aria-label="Notes" />
                    <div class="tab-content border-base-300 p-10">Notes content</div>
                </div>
            </div>
            <div class="col-span-4">

            </div>
        </div>
    </dashboard-layout>
</template>
