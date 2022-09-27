const fs = require('fs');
//var text = fs.readFileSync('test1.txt','utf-8');
var text = process.argv[2];

const types = {
    'RSDLPSTR': 0,
    'RSDLONG': 1,
    'RSDDATE': 2,
    'RSDSHORT':3
}

const replaceAt = (str,index, replacement)=>{
    if(replacement===''){
        replacement=null;
    }
    let res = str.substring(0, index) + replacement + str.substring(index+1);
    return res;
}

const getValueByType=(type,value)=>{
    switch (type) {
        case types.RSDLPSTR:
            return (`'${value}'`);
        case types.RSDLONG:
            return value;
        case types.RSDSHORT:
            return value;
        case types.RSDDATE:
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
        for (type in types){
            if(item.includes(type)){
                valueType = types[type];
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
