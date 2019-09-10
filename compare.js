const fs = require('fs') 
   
fs.readFile('sp-pages-baseline.stats.json', 'utf-8', (err, databaseline) => { 
    if (err) throw err; 
  
    fs.readFile('sp-pages.stats.json', 'utf-8', (err, datapr) => { 
        if (err) throw err; 

        var modulesbaseline = JSON.parse(databaseline).modules;
        var modulespr = JSON.parse(datapr).modules;

        var baselinesizes = [];
        for(var i = 0;i<modulesbaseline.length;i++)
        {
            if(modulesbaseline[i].name.includes(" + "))
            {
                for(var j = 0;j<modulesbaseline[i].modules.length;j++)
                {
                    baselinesizes.push({name: modulesbaseline[i].modules[j].name, size: modulesbaseline[i].modules[j].size, fullname: modulesbaseline[i].modules[j].name})        
                }
            }
            else 
            {
                baselinesizes.push({name: modulesbaseline[i].id, size: modulesbaseline[i].size, fullname: modulesbaseline[i].name})
            }
        }
        // console.log(baselinesizes);

        var prsizes = [];
        for(var i = 0;i<modulespr.length;i++)
        {
            if(modulespr[i].name.includes(" + "))
            {
                for(var j = 0;j<modulespr[i].modules.length;j++)
                {
                    prsizes.push({name: modulespr[i].modules[j].name, size: modulespr[i].modules[j].size, fullname: modulespr[i].modules[j].name})        
                }
            }
            else 
            {
                prsizes.push({name:modulespr[i].id, size:modulespr[i].size, fullname: modulespr[i].name})
            }
        }
        // console.log(prsizes);

        for(var i = 0;i<baselinesizes.length;i++)
        {
            var namebaseline = baselinesizes[i].name;
            var sizebaseline = baselinesizes[i].size;
            var fullnamebaseline = baselinesizes[i].fullname;
            var serial = i;
            
            for(var j = 0;j<prsizes.length;j++)
            {
                var namepr = prsizes[j].name;
                var sizepr = prsizes[j].size;
                
                if( (namebaseline === namepr) && (sizebaseline != sizepr) && !(fullnamebaseline.includes("!")))
                {
                    console.log("serial: " + serial + ", file: " + fullnamebaseline + ", baseline size: " + sizebaseline + ", pr size: " + sizepr + ", diff: " + (sizepr - sizebaseline));
                    // console.log(fullnamebaseline);
                    // console.log(sizebaseline);
                    // console.log(sizepr);
                    // console.log((sizepr - sizebaseline));
                }
            }            
        }
    }) 
}) 
