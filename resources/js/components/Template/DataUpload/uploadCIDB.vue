<template>
    <div>
        <div class="row">
            <div class="col-xl-3 col-lg-6">
                <div class="mb-3">
                    <label class="form-label" for="defaultFile">Upload Spreadsheet (.xlsx/.xlx)</label>
                    <input type="file" class="form-control" id="defaultFile" @change="handleFileUpload">
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="mb-3">
                    <label class="form-label" for="sheet">Select Sheet Name</label>
                    <vue-select
                        id="sheet"
                        :options="sheetNames"
                        placeholder="-- Select Sheet --" v-model="selectedSheet"></vue-select>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <div class="mb-3">
                    <label class="form-label" for="ciYears">Select CI Year</label>
                <vue-select id="ciYears" :options="[2019,2020,2021,2022,2023,2024]"
                            placeholder="-- Select Year --" v-model="dataYear"></vue-select>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6">
                <button type="button" :class="{disabled:isAddmoreDisabled}" id="submitCI" @click="submitDataset()" class="btn btn-outline-theme btn-sm mt-4" >Upload</button>
            </div>
        </div>
        <card class="mb-3">
            <card-body>
                <vue-table class="vue-table"
                           v-if="dataPreview.length > 0"
                           :page-size=5
                           :is-static-mode="true"
                           :columns="excelPreviewHeaders"
                           :rows="uploadedExcelData"
                           :total="uploadedExcelData.length"
                />
            </card-body>
        </card>
<!--        <v-card variant="flat">-->
<!--            <v-card-text>-->
<!--                <v-row>-->
<!--                    <v-col cols="12" lg="3">-->

<!--                        <v-file-input v-model="selectedFile" counter-->
<!--                                      show-size clearable accept=".xlsx, .xls"-->
<!--                                      label="Upload Spreadsheet"-->
<!--                                      placeholder="Select .xlx/.xlsx"-->
<!--                                      prepend-icon="mdi-paperclip"-->
<!--                                      @update:modelValue="handleFileUpload"-->
<!--                                      density="compact" variant="outlined">-->
<!--&lt;!&ndash;                            <template v-slot:selection="{ index, text }">&ndash;&gt;-->
<!--&lt;!&ndash;                                <v-chip color="#004EEB"   dark label="" size="small">&ndash;&gt;-->
<!--&lt;!&ndash;                                    {{ text }}&ndash;&gt;-->
<!--&lt;!&ndash;                                </v-chip>&ndash;&gt;-->
<!--&lt;!&ndash;                            </template>&ndash;&gt;-->
<!--                        </v-file-input>-->
<!--                    </v-col>-->

<!--                    <v-col cols="12" lg="3">-->
<!--                        <v-select :rules="[v => !!v || 'Sheet is required']"  v-model="selectedSheet"  placeholder="Sheets" name="Selected Sheets" :items="sheetNames"   density="compact" variant="outlined"></v-select>-->
<!--                    </v-col>-->

<!--                    <v-col cols="12" lg="3">-->
<!--                        <v-select :rules="[v => !!v || 'Year is required']"  v-model="dataYear"  placeholder="Sheets" name="Selected Sheets" :items="[2019,2020,2021,2022,2023,2024]"   density="compact" variant="outlined"></v-select>-->
<!--                    </v-col>-->
<!--                    <v-col cols="12" lg="3">-->
<!--                        <v-btn :loading="loading" color="primary" variant="tonal" @click="submitDataset()"> <v-icon>mdi-upload</v-icon> &nbsp;&nbsp;Upload</v-btn>-->
<!--                    </v-col>-->
<!--                </v-row>-->
<!--                <v-row>-->
<!--                    <v-col cols="12" lg="12">-->
<!--                        <v-card :loading="loading">-->
<!--                            <v-card-text>-->
<!--                                <v-data-table tile class="elevation-1 mt-6" v-if="dataPreview.length > 0" :headers="excelPreviewHeaders" :items="uploadedExcelData"></v-data-table>-->
<!--                            </v-card-text>-->
<!--                        </v-card>-->
<!--                    </v-col>-->
<!--                </v-row>-->




<!--            </v-card-text>-->
<!--        </v-card>-->
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import {XlsxDownload, XlsxJson, XlsxRead, XlsxSheet, XlsxSheets, XlsxTable, XlsxWorkbook} from "vue3-xlsx";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {toRaw} from "vue";
import generalAxiosRequest from "../../../composables/application/generalAxiosRequest";
import NotificationHandling from "../../../composables/application/notificationHandling";
import VueSelect from "../../plugins/VueSelect.vue";
import VueTable from "../../plugins/VueTable.vue";
import {removeLocalStorageData} from "../../../composables/application/localStorageHandling";

name = 'uploadCIDB';

export default {
    components: {
        VueTable,
        VueSelect,
        XlsxRead,
        XlsxTable,
        XlsxSheets,
        XlsxJson,
        XlsxWorkbook,
        XlsxSheet,
        XlsxDownload,
    },
    emits: ['requestClose'],
    data() {
        return {
            selectedFile: null,
            selectedSheet: null,
            sheetName: null,
            sheets: [],
            collection: [],
            sheetNames: [],
            dataPreview: [],
            excellSubFilters: [],
            allColumnNames: [],
            excelPreviewHeaders:[],
            uploadedExcelData:[],
            dataYear:'2024',
            modal_date_from:false,
            loading:false
        };
    },
    watch:{
        selectedFile(data){
            if (!data){
                this.dataPreview = null;
                this.sheetNames = [];
                this.excellSubFilters = null;
            }
        }
    },
    mounted() {

    },
    methods: {
        async handleFileUpload(event) {
            if (!event && !event.target.files) return;
            this.selectedFile = event.target.files;
            console.log("fucking file",event)
            // this.$emit("startScreenLoading",{flag:true});
            const file = this.selectedFile[0];
            console.log("fucking file",this.selectedFile[0])
            const data = await file.arrayBuffer();

            const workbook = XLSX.read(data, { type: 'array' });
            this.sheetNames = workbook.SheetNames;

            if (this.sheetNames.length > 0) {
                this.selectedSheet = this.sheetNames[0];
                this.processSheet(this.selectedSheet, workbook);
            }
        },

        processSheet(sheetName, workbook) {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            this.dataPreview = jsonData;

            this.validateAndProcess();

        },

        validateAndProcess() {
            let data_preview = toRaw(this.dataPreview);
            if (!this.selectedFile) {
                toast.error("Please upload an Excel file.");
                return;
            }

            if (data_preview.length === 0) {
                toast.error("No data to process.");
                return;
            }
            // Assuming the first row of the sheet contains column names
            const columnNames = data_preview[0];
            console.log("fucking data",columnNames);
            let requiredColumns = ['tank_id', 'Tank_name', 'Year', 'W_Surface', 'Catchment', 'Comd_area', 'Male', 'Female', 'Youth', 'Widowed', 'Disabled', 'Total_farm', 'Yala_Ac']
            const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
            this.allColumnNames = columnNames;
            console.log("fucking missing data",missingColumns);
            if (missingColumns.length > 0) {
                toast.error(`Missing columns: ${missingColumns.join(', ')}`);
                // this.$emit("startScreenLoading",{flag:false});
                // alert(`Missing columns: ${missingColumns.join(', ')}`);
                return;
            }

            this.formatDataForTable(data_preview);
            toast.success("Spreadsheet Processed Successfully");
        },

        formatDataForTable(data_preview) {
            let data = data_preview;
            const headers = data[0]; // Assuming the first row contains headers

            const formattedData = [];

            for (let i = 1; i < data.length; i++) {
                const row = data[i];
                const rowData = {};

                for (let j = 0; j < headers.length; j++) {
                    rowData[headers[j]] = row[j];
                }

                formattedData.push(rowData);
            }

            console.log("excel filters",this.excellSubFilters);
            this.excelPreviewHeaders = headers.map(col => ({ label: col, field: col }));
            this.uploadedExcelData = formattedData;
            console.log("headers",this.excelPreviewHeaders);
            console.log("formatted_data",formattedData);
        },

        async submitDataset() {
            if (this.uploadedExcelData && this.uploadedExcelData.length>0) {
                const progress = this.$progress.start();
                let time = new Date();
                const payload = {
                    url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/saveData',
                    data: JSON.stringify({
                        collection: 'ci_db_' + this.dataYear,
                        dataset: JSON.stringify(this.uploadedExcelData),
                        metadata: JSON.stringify({created_by: 'admin', time: time, year: this.dataYear})
                    })
                }

                const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
                progress.finish();

                const confirmed = this.$confirm({
                    title: ' Refresh page?',
                    message: 'To apply changes you need to refresh. continue?'
                }).then(function (o) {
                    if (o) {
                        removeLocalStorageData()
                        window.location.reload()
                    }
                    console.log("fucking confirmed", o)
                });
                NotificationHandling('success', json_data.value);
            }else{
                NotificationHandling('error', "Empty Excel");
            }
            // this.$emit('requestClose');
        },
    }
};
</script>
<script setup>
import {nextTick, onMounted, ref} from "vue";

const isAddmoreDisabled = ref(true);

const checkAddMore = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    isAddmoreDisabled.value = !(user && user.email === 'gisoperator@gmail.com');
}
onMounted(() => {
    checkAddMore()
});
</script>
