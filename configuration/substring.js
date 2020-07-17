'use strict'
let string ='aaabbbbaaaaacccddddddddeeee',preIndex=0;
let tempVar =new Array(),substring="";;
/***For intial substring operation */
for(let i=0,tempcamp=0;i<string.length;i++)
{
    if(i!=0) tempcamp =i-1;
    if(string[tempcamp]!=string[i])
    {
        tempVar.push(substring);
        substring="";
    }
    
    else
    substring =substring+string[i];
}
let maxLength = tempVar.reduce((acc,curr)=> acc.length> curr.length ? acc.length:curr.length);
console.log(maxLength);