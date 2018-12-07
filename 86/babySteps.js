console.log((process.argv).slice(2).reduce((acc, cur)=>{
        return acc + +cur;
},0));
