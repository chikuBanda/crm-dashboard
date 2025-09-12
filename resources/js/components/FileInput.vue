<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import {fileTypeFromBlob} from 'file-type'
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import CloudUploadIcon from 'vue-material-design-icons/CloudUpload.vue'
// @ts-ignore
import CloseIcon from 'vue-material-design-icons/Close.vue'
import file_type_image_mapping from '@/utils/file_log_mapping'
import { useQuoteStore } from '@/stores/quote.store'

const quoteStore = useQuoteStore()

const file_drop_zone: Ref<HTMLElement | null> = ref(null)
const file_input: Ref<HTMLInputElement | null> = ref(null)
const is_file_in_drop_zone = ref(false)

onMounted(() => {
    file_drop_zone.value
        ?.addEventListener("drop", (ev) => {
            // console.log("File(s) dropped")

            ev.preventDefault()

            if (ev.dataTransfer?.items) {
                [...ev.dataTransfer.items].forEach((item, i) => {
                    if (item.kind === 'file') {
                        const file = item.getAsFile();

                        if (file) {
                            getFileType(file)
                                .then((file_type: string | null) => {
                                    console.log("file_type", file_type)

                                    quoteStore.formDataAttachments.files.push({
                                        uuid: uuidv4(),
                                        name: file.name,
                                        size: formatFileSize(file.size),
                                        type: file_type,
                                        file: file
                                    })
                                })
                                .catch((err: any) => {
                                    console.error(err)
                                    
                                    quoteStore.formDataAttachments.files.push({
                                        uuid: uuidv4(),
                                        name: file.name,
                                        size: formatFileSize(file.size),
                                        type: null,
                                        file: file
                                    })
                                })
                        }
                    }
                })
            } else {
                // @ts-ignore
                [...ev.dataTransfer?.files].forEach((file, i) => {
                    // console.log(`… file[${i}].name = ${file.name}`);
                });
            }

            is_file_in_drop_zone.value = false
        })

    file_input.value
        ?.addEventListener("change", (ev) => {
            // @ts-ignore
            const input_files = ev.target.files

            for(const file of input_files) {
                console.log("file", file)

                getFileType(file)
                    .then((file_type: string | null) => {
                        console.log("file_type", file_type)
                        
                        quoteStore.formDataAttachments.files.push({
                            uuid: uuidv4(),
                            name: file.name,
                            size: formatFileSize(file.size),
                            type: file_type,
                            file: file
                        })
                    })
                    .catch((err: any) => {
                        console.error(err)
                        
                        quoteStore.formDataAttachments.files.push({
                            uuid: uuidv4(),
                            name: file.name,
                            size: formatFileSize(file.size),
                            type: null,
                            file: file
                        })
                    })
            }
        })

    file_drop_zone.value
        ?.addEventListener("dragover", (ev) => {
            // console.log("File(s) in drop zone")

            ev.preventDefault()

            if (!is_file_in_drop_zone.value) {
                is_file_in_drop_zone.value = true
            }
        })

    file_drop_zone.value
        ?.addEventListener("dragleave", (ev) => {
            // console.log("File(s) out of drop zone")

            ev.preventDefault()

            is_file_in_drop_zone.value = false
        })
})

const limitText = (text: string) => {
    if (text.length > 20) {
        const ext = text.split('.')[1]
        return text.slice(0, 15) + '...' + (ext ? ext : '')
    }

    return text
}

const getFileType = async (file: File | null) => {
    if (file == null) {
        return null
    }

    const result = await fileTypeFromBlob(file)

    if (result) {
        return result.mime
    } 

    if (file.type) {
        return file.type
    }

    return null
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 B';
  }

  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

const getFileTypeImage = (file_type: string | null) => {
    const default_image = `/images/file_logos/document.png`

    if (file_type == null) {
        return default_image
    }

    const image_name = file_type_image_mapping[file_type]

    if (image_name) {
        return `/images/file_logos/${image_name}`
    } else {
        return default_image
    }
}

const removeImageFromFiles = (uuid: string) => {
    quoteStore.formDataAttachments.files = quoteStore.formDataAttachments.files.filter((file) => {
        return file.uuid !== uuid
    })
}
</script>

<template>
    <div>
        <p class="font-bold mb-2 text-xs">Files</p>
        <div 
            ref="file_drop_zone" 
            @click="file_input?.click()"
            :class="{'bg-sky-100': is_file_in_drop_zone}" 
            class="h-52 bg-sky-50 border-2 border-dashed border-sky-600 flex flex-col justify-center items-center mb-8 cursor-pointer">
            <cloud-upload-icon class="text-slate-400" :size="50"></cloud-upload-icon>
            <h4 :class="{'text-slate-400': is_file_in_drop_zone, 'text-sky-700': !is_file_in_drop_zone}" class="text-center font-extrabold text-lg mb-4">Drag and drop files here</h4>
            <h4 :class="{'text-slate-400': is_file_in_drop_zone, 'text-sky-700': !is_file_in_drop_zone}" class="text-center font-extrabold text-lg mb-4">-OR-</h4>
            <button 
                :class="{'bg-slate-500': is_file_in_drop_zone, 'bg-sky-700': !is_file_in_drop_zone}" 
                class="btn btn-sm text-white shadow-2xl"
                @click="file_input?.click()"
            >Browse Files</button>
            <input ref="file_input" hidden type="file">
        </div>

        <div v-if="quoteStore.formDataAttachments.files" class="grid grid-cols-12 gap-4">
            <div 
                :class="{'border-b-2 border-b-emerald-700': true}" 
                class="col-span-6 h-16 shadow rounded flex items-center mb-2 p-2 relative"
                v-for="file in quoteStore.formDataAttachments.files"
                :key="file.uuid"
            >
                <button 
                    @click="removeImageFromFiles(file.uuid)"
                    class="absolute w-5 h-5 justify-center items-center right-0 top-0 cursor-pointer">
                    <close-icon :size="16" class="text-red-600" />
                </button>
                <!--file image container-->
                <div class="flex justify-center items-center mr-1 w-16 p-3">
                    <img :src="getFileTypeImage(file.type)" :alt="file.name">
                </div>
                <div>
                    <h6 class="text-sky-900 font-bold text-sm">{{ limitText(file.name) }}</h6>
                    <p class="font-light text-gray-700 text-xs">{{ file.size }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>