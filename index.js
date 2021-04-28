const fs = require('fs')
const jsdom = require('jsdom')
const moment = require('moment')
var info = 'Matricola,Modello,Ore Motore, Percussione1,Percussione2,Percussione3,Scheda Lavoro,Data,Giorno,Mese,Anno,SPO_V,SPO_L,SPS_V,SPS_L,STD_V,STD_L,STR_V,STR_L,MNT_V,MNT_L,MF_L,MF_V,MNF_V,MNF_L,File\n'
var dati
var list = fs.readdirSync('./test/')
var cliente, v,u,n,dom,righe
var rig=''
list.map(a=>{
    cliente = a.substring(20,a.length)
    if(cliente.substring(0,8)=='IMI FABI'){
        v = fs.readFileSync('./test/' + a, 'utf-8')
        u = JSON.parse(v)
        if(u.tabset){
            n=`<table>${u.tabset}</table>` 
            dom = new jsdom.JSDOM(n)
            righe = dom.window.document.getElementsByTagName('tr') 
            for(let r=3;r<8;r++){
                if(righe[r].getElementsByTagName('td')[0].innerHTML!=''){
                    dati=[
                        u.matricola,
                        u.prodotto1,
                        u.orem1.replace('.',''),
                        u.perc11? u.perc11.replace('.','') : 0,
                        u.perc21? u.perc21.replace('.','') : 0,
                        u.perc31? u.perc31.replace('.','') : 0,
                        u.docbpcs,
                        moment(new Date(
                            righe[r].getElementsByTagName('td')[3].innerHTML,
                            righe[r].getElementsByTagName('td')[2].innerHTML,
                            righe[r].getElementsByTagName('td')[1].innerHTML,
                        )).format('YYYYMMDD'),
                        righe[r].getElementsByTagName('td')[1].innerHTML,
                        righe[r].getElementsByTagName('td')[2].innerHTML,
                        righe[r].getElementsByTagName('td')[3].innerHTML,
                        righe[r].getElementsByTagName('td')[4].innerHTML,
                        righe[r].getElementsByTagName('td')[5].innerHTML,
                        righe[r].getElementsByTagName('td')[6].innerHTML,
                        righe[r].getElementsByTagName('td')[7].innerHTML,
                        righe[r].getElementsByTagName('td')[8].innerHTML,
                        righe[r].getElementsByTagName('td')[9].innerHTML,
                        righe[r].getElementsByTagName('td')[10].innerHTML,
                        righe[r].getElementsByTagName('td')[11].innerHTML,
                        righe[r].getElementsByTagName('td')[12].innerHTML,
                        righe[r].getElementsByTagName('td')[13].innerHTML,
                        righe[r].getElementsByTagName('td')[14].innerHTML,
                        righe[r].getElementsByTagName('td')[15].innerHTML,
                        righe[r].getElementsByTagName('td')[16].innerHTML,
                        righe[r].getElementsByTagName('td')[17].innerHTML,
                        a.substring(0,a.length-2) + 'pdf'
                    ]
                    if (info==undefined){
                        info=dati.toString() + '\n'
                    }else{
                        info+=dati.toString() + '\n'
                    }
                }
            }
        } else {
            for(let i=1;i<8;i++){
                if(u['tecnico' + i + 1]){
                    dati=[
                        u.matricola,
                        u.prodotto1,
                        u.orem1.replace('.',''),
                        u.perc11? u.perc11.replace('.','') : 0,
                        u.perc21? u.perc21.replace('.','') : 0,
                        u.perc31? u.perc31.replace('.','') : 0,
                        u.docbpcs, 
                        u['dat' + i + 3] +u['dat' + i + 2] +u['dat' + i + 1],   
                        u['dat' + i + 1],
                        u['dat' + i + 2],
                        u['dat' + i + 3],   
                        u['spov' + i + 1],
                        u['spol' + i + 1],
                        u['spsv' + i + 1],
                        u['spsl' + i + 1],
                        u['stdv' + i + 1],
                        u['stdl' + i + 1],
                        u['strv' + i + 1],
                        u['strl' + i + 1],
                        u['mntv' + i + 1],
                        u['mntl' + i + 1],
                        u['mfv' + i + 1],
                        u['mfl' + i + 1],
                        u['mnfv' + i + 1],
                        u['mnfl' + i + 1],
                        a.substring(0,a.length-2) + 'pdf'
                    ]
                    if (info==undefined){
                        info=dati.toString() + '\n'
                    }else{
                        info+=dati.toString() + '\n'
                    }
                }
            }
            
        }
           
        /*n=`<table>${u.tabset}</table>`
        
        if(righe!=undefined){
            for(let r=1;r<8;r++){
                if(righe[r].getElementsByTagName('td')[0].innerHTML!=''){
                    dati=[
                        u.matricola,
                        u.prodotto1,
                        u.orem1.replace('.',''),
                        u.perc11.replace('.',''),
                        u.perc21.replace('.',''),
                        u.perc31.replace('.',''),
                        u.docbpcs,
                        moment(new Date(
                            righe[r].getElementsByTagName('td')[3].innerHTML,
                            righe[r].getElementsByTagName('td')[2].innerHTML,
                            righe[r].getElementsByTagName('td')[1].innerHTML,
                        )).format('YYYYMMDD'),
                        righe[r].getElementsByTagName('td')[1].innerHTML,
                        righe[r].getElementsByTagName('td')[2].innerHTML,
                        righe[r].getElementsByTagName('td')[3].innerHTML,
                        righe[r].getElementsByTagName('td')[4].innerHTML,
                        righe[r].getElementsByTagName('td')[5].innerHTML,
                        righe[r].getElementsByTagName('td')[6].innerHTML,
                        righe[r].getElementsByTagName('td')[7].innerHTML,
                        righe[r].getElementsByTagName('td')[8].innerHTML,
                        righe[r].getElementsByTagName('td')[9].innerHTML,
                        righe[r].getElementsByTagName('td')[10].innerHTML,
                        righe[r].getElementsByTagName('td')[11].innerHTML,
                        righe[r].getElementsByTagName('td')[12].innerHTML,
                        righe[r].getElementsByTagName('td')[13].innerHTML,
                        righe[r].getElementsByTagName('td')[14].innerHTML,
                        righe[r].getElementsByTagName('td')[15].innerHTML,
                        righe[r].getElementsByTagName('td')[16].innerHTML,
                        righe[r].getElementsByTagName('td')[17].innerHTML,
                        a.substring(0,a.length-2) + 'pdf'
                    ]
                    if (info==undefined){
                        info=dati.toString() + '\n'
                    }else{
                        info+=dati.toString() + '\n'
                    }
                }
            }
        }*/        
    }
})


setTimeout(() => {
    console.log(info.toString())
    fs.createWriteStream('rapporto.txt')
    fs.writeFileSync('rapporto.txt', info.toString())
}, 1500);
