<template>
    <div>
        <div class="row">
            <div class="col-xl-6 col-lg-6">
                <div class="mb-3">
                    <label class="form-label" for="defaultFile">Upload Data (.xlsx/.geojson)</label>
                    <input type="file" class="form-control" id="defaultFile" @change="handleFileUpload">
                </div>
            </div>
            <div class="col-xl-6 col-lg-6" v-if="fileType === 'xlsx'">
                <div class="mb-3">
                    <label class="form-label" for="sheet">Select Sheet Name</label>
                    <vue-select
                        id="sheet"
                        :options="sheetNames"
                        placeholder="-- Select Sheet --" v-model="selectedSheet"></vue-select>
                </div>
            </div>
            <div class="col-xl-4 col-lg-6" v-if="selectedFile">
                <div class="mb-3">
                    <label class="form-label" for="layerName">Layer Name</label>
                    <input type="text" class="form-control" id="layerName" v-model="layerName">
                </div>
            </div>
            <div class="col-xl-4 col-lg-6" v-if="selectedFile">
                <div class="input-group position-relative">
                        <span class="input-group-text p-1">
                            <span class="h-20px w-20px rounded d-block mx-3px" v-bind:style="{ backgroundColor: color }"></span>
                        </span>
                        <a href="#" class="stretched-link" data-bs-toggle="dropdown" data-bs-auto-close="outside"></a>
                        <div class="dropdown-menu p-2">
                            <color-picker :color="color" @changeColor="changeColor"></color-picker>
                        </div>
                        <input type="text" v-model="color" id="layerColor" class="form-control">
                </div>
            </div>
            <div class="col-xl-3 col-lg-6" >
                <button type="button" id="submitCI" v-if="selectedFile"
                        @click="submitDataset()" class="btn btn-outline-theme btn-sm"
                :class="isInvaliInput?'disabled':''"
                >Upload</button>
            </div>
        </div>
        <card class="mb-3">
            <card-body v-if="selectedFile">
                <vue-table class="vue-table"
                           v-if="dataPreview.length > 0"
                           :page-size=5
                           :is-static-mode="true"
                           :columns="excelPreviewHeaders"
                           :rows="uploadedExcelData"
                           :total="uploadedExcelData.length"
                />
                <div  v-else>
                    <card class="bg-theme border-theme bg-opacity-25 mb-3">
                        <card-body>
                          <h5>{{fileType}} File uploaded </h5> <br/>
                            ( {{fileSize}} )
                        </card-body>
                    </card>
                    <div class="alert alert-danger mt-3" v-if="fileType !== 'geojson'">
                        Only .xlsx (microsoft spreadsheets) files and .geojson files are supported for uploading.
                        if you are trying to upload spatial file try convert your data to GeoJSON from arc gis or qgis
                    </div>
                </div>
            </card-body>
        </card>
    </div>
</template>


<script>
import VueTable from "../../plugins/VueTable.vue";
import VueSelect from "../../plugins/VueSelect.vue";
import {XlsxDownload, XlsxJson, XlsxRead, XlsxSheet, XlsxSheets, XlsxTable, XlsxWorkbook} from "vue3-xlsx";
import * as XLSX from "xlsx";
import {toRaw} from "vue";
import {toast} from "vue3-toastify";
import generalAxiosRequest from "../../../composables/application/generalAxiosRequest";
import {removeLocalStorageData} from "../../../composables/application/localStorageHandling";
import NotificationHandling from "../../../composables/application/notificationHandling";
import {getReadableFileSize} from "../../../composables/FileManagement";
import CardBody from "../../bootstrap/CardBody.vue";
import colorPicker from '@caohenghu/vue-colorpicker';
import notificationHandling from "../../../composables/application/notificationHandling";

export default {
    components: {
        CardBody,
        VueTable,
        VueSelect,
        XlsxRead,
        XlsxTable,
        XlsxSheets,
        XlsxJson,
        XlsxWorkbook,
        XlsxSheet,
        XlsxDownload,
        colorPicker
    },
    props:['lid'],
    emits: ['requestClose','startUpload'],
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
            loading:false,
            fileType:null,
            fileName:null,
            fileSize:null,
            isInvaliInput:true,
            layerName:"",
            color:"#FF0000"
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
            this.fileType = this.selectedFile[0].type;
            this.fileName = this.selectedFile[0].name;
            this.fileSize = getReadableFileSize(this.selectedFile[0].size)

            let splitted = this.fileName.split('.')
            this.fileType = splitted[splitted.length-1];
            // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            if (this.fileType === 'xlsx'){
                const data = await file.arrayBuffer();

                const workbook = XLSX.read(data, { type: 'array' });
                this.sheetNames = workbook.SheetNames;

                if (this.sheetNames.length > 0) {
                    this.selectedSheet = this.sheetNames[0];
                    this.processSheet(this.selectedSheet, workbook);
                }
            }else{

                this.isInvaliInput = this.fileType !== 'geojson';
            }
            this.layerName = splitted[0];
            console.log("fucking file type",this.fileType)


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
                this.isInvaliInput = true;
                return;
            }
            // Assuming the first row of the sheet contains column names
            const columnNames = data_preview[0];
            console.log("fucking data",columnNames);
            let requiredColumns = ['lat', 'lng']
            const missingColumns = requiredColumns.filter(col => !columnNames.includes(col));
            this.allColumnNames = columnNames;
            console.log("fucking missing data",missingColumns);
            if (missingColumns.length > 0) {
                toast.error(`Missing columns: ${missingColumns.join(', ')}`);
                this.isInvaliInput = true;
                // this.$emit("startScreenLoading",{flag:false});
                // alert(`Missing columns: ${missingColumns.join(', ')}`);
                return;
            }
            this.isInvaliInput = false;
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
            const progress = this.$progress.start();
            let time = new Date();
            let formData = new FormData();
            formData.append("collection",this.layerName);
            formData.append("file",this.selectedFile[0]);
            formData.append("fileType",this.fileType);
            formData.append("xlsxdataset",JSON.stringify(this.uploadedExcelData));
            formData.append("metadata",JSON.stringify({created_by:'admin',time:time,year:this.dataYear}));
            //special case cannot use common general axios request. reason is there are file upload in this function
            await axios.post('https://services.gsentry.cloud/api/v1/gis-layers/spatialUpload', formData)
                .then((response) => {
                    if (response.data && response.data.data){
                        NotificationHandling('success',response.data.data);
                        let new_layer = {lid:0,name:this.layerName,value:this.layerName,visibility:false,layer:null,
                            color:this.color,fillColor:this.color}
                        let payload = {
                            data:new_layer,lid:this.lid
                        }
                        this.$store.commit('setNewLayer',payload)
                    }else{
                        notificationHandling("error","No Data Available")
                    }
                })
                .catch((error) => {
                    progress.finish();
                    notificationHandling("error",error.message);
                });


            this.layerName = "";
            this.fileName = "";
            this.fileSize = "";
            this.fileType = null;
            this.selectedFile = null;
            this.allColumnNames = [];
            this.isInvaliInput = true;
            this.excelPreviewHeaders = [];
            this.uploadedExcelData = [];
            this.sheetNames = [];

            progress.finish();
            this.$emit("requestClose")
            // const confirmed = this.$confirm({
            //     title: ' Refresh page?',
            //     message: 'To apply changes you need to refresh. continue?'
            // }).then(function (o) {
            //     if (o) {
            //         removeLocalStorageData()
            //         window.location.reload()
            //     }
            //     console.log("fucking confirmed",o)
            // });

            // this.$emit('requestClose');
        },
        changeColor(color) {
            const { r, g, b, a } = color.rgba
            // this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
            this.color = color.hex;
        }
    }
};
</script>


<style scoped>

</style>
