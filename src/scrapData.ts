const _importDynamic = new Function('modulePath', 'return import(modulePath)')

async function fetch(...args) {
  const {default: fetch} = await _importDynamic('node-fetch')
  return fetch(...args)
}
import cheerio = require('cheerio');
import fs = require('fs');


const ordhekDinData=[]

//for get the biodata number
const getId = (str) => {
	let ans=''
	for(let i=0;i<str.length;i++){
		if(str[i]>='0'&& str[i]<='9')ans+=str[i]
	}
	return ans
}

//get html data
const getOrdhekDinData = async (pagiNation:number) => {
	const response = await fetch('https://ordhekdeen.com/biodatas/?upage='+ pagiNation);
	const body = await response.text();
	return body;
};

//write data to the json file
const writeData =  ( ) =>{
	var ordhekDinJsonData = JSON.stringify(ordhekDinData,null , 2)
    console.log(ordhekDinJsonData)
		fs.writeFile('./ordhekDinData.json', ordhekDinJsonData, err => {
			if (err) {
				console.log('Error writing file', err)
			} else {
				console.log('Successfully wrote file')
			}
		})

}




let control = -1   //control array collection of object data


const collectData = (pagiNation) => {
   
//for scrapping the data	
 getOrdhekDinData(pagiNation)
 .then(res=>{
		const bioDataNumber = []
		const status = []
		const bioDataLink =[]

		const $ = cheerio.load(res);
		
		//for get the biodata link
		$('.avatar a').each((i,el)=>{
			bioDataLink.push($(el).attr('href'))
		})
		//for biodata number
		$('.avatar').find('h4').each((i,el)=>{
			bioDataNumber.push(getId($(el).text()))
		})
		//for maritalStatus,birthYear & profession
		$('.search-body').find('p').each((i,el)=>{
             status.push($(el).text())
		})
        
		for(var i=0;i<bioDataLink.length;i++){
			let count = i*3
			var metadata = {
				bioDataNumber: bioDataNumber[i],
		        maritalStatus: status[count],
				birthYear : status[count+1],
				proffesion: status[count+2],
				bioDataLink: bioDataLink[i]
			};
			ordhekDinData[control+=1] = metadata
			
		}
	
  })
  console.log(`page ${pagiNation} data collection done`)
}


export function scrapBiodata (startPage:number,lastPage:number){
        collectData(startPage)
        if(lastPage==startPage){
            writeData()  
        }
}
	
   



