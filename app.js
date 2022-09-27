import * as fs from 'fs';
import * as ibm866 from 'ibm866';
var data = fs.readFileSync('test.txt');
var text = ibm866.decode(data);
//var text = process.argv[2];

const DATA_TYPES = {
    'RSDLPSTR': 0,
    'RSDLONG': 1,
    'RSDDATE': 2,
    'RSDSHORT':3,
    'RSDCHAR':4
}

const replaceAt = (str,index, replacement)=>{
    if(replacement===''){
        replacement=null;
    }
    let res = str.substring(0, index) + replacement + str.substring(index+1);
    return res;
}

const getValueByType=(valueType,value)=>{
    switch (valueType) {
        case DATA_TYPES.RSDLPSTR:
            let tmpValue;
            if(value===''){
                tmpValue = 'CHR(1)';
            }
            else{
                tmpValue = `'${value}'`
            }
            
            return (tmpValue);
        case DATA_TYPES.RSDLONG:
            return value;
        case DATA_TYPES.RSDSHORT:
            return value;
        case DATA_TYPES.RSDCHAR:
            return `CHR(${value})`;
        case DATA_TYPES.RSDDATE:
            return `to_date('${value}','dd.mm.yyyy')`;
        default:
            break;
    }
}

const getValues = (str) => {
    let values = [];
    let tmpArr=str.split('\n');
    let tmpIdx;
    let valueType;
    tmpArr.forEach((item)=>{
        for (let t in DATA_TYPES){
            if(item.includes(t)){
                valueType = DATA_TYPES[t];
                break;
            } 
        }

        tmpIdx = item.indexOf('value: ');
        if(tmpIdx!=-1){
            let tmpValue = item.substring((tmpIdx+7)).split('  ')[0];
            tmpValue= getValueByType(valueType,tmpValue);
            values.push(tmpValue);
        }   
    })

    return values;

}

const getQuery = (str) => {
    
    let query = str.split('SQL\\Execute ')[1];
    let tmpQuery = query.trim().split('\n')
    tmpQuery[0] = tmpQuery[0].split('  ')[0];
    tmpQuery = tmpQuery.map(item=>{
        return item.trim();
    })
    let resQuery = tmpQuery.join(' ');
    getValues(str).forEach((item) =>{
        let idx = resQuery.indexOf('?');
        if(idx>=0){
            resQuery = replaceAt(resQuery,idx,item);
        }
    })   

    return resQuery;

}
console.clear();
console.log(getQuery(text))
