import {toRaw} from "vue";

const applyMapLegend = (name,color,type,legends = [],lid,store) => {
    let dataLegend = [];
    if (legends.length>0){

        legends.forEach(function (o) {
            dataLegend.push({lid:lid,name:o.attr,logic:o.logic,color:o.color,value:o.value,type:type,visibility:true});
        })
    }else{
        let obj = {lid:lid,name:name,logic:null,value:null,color:color,type:type,visibility:true};
        dataLegend.push(obj);
    }
    let upddata = _.concat(dataLegend,store.state.legend);
    console.log("finalized",upddata)
    store.commit('setLegend',upddata);
}

const showHideLegends = (lid,visibility,name,store) => {
    let legendList = toRaw(store.state.legend);
    let updated_legend = [];

    legendList.forEach(function (o) {
        if (o.lid === lid){
            o.visibility = visibility;
        }
        updated_legend.push(o);
    })
    store.commit('setLegend',updated_legend);
}


export {applyMapLegend,showHideLegends}
