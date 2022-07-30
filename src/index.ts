import { AppDataSource1,AppDataSource2 } from "./data-source"
import { Biodata1,Biodata2 } from "./entity/Biodata"
import { scrapBiodata } from "./scrapData";
import * as fs from 'fs';




let AppDataSource=AppDataSource2

type jsonDataType = {
    "bioDataNumber": string
    "maritalStatus": string
    "birthYear": string
    "proffesion":string
    "bioDataLink": string
  }
  let jsonString: jsonDataType[]= []

  const readJsonData = async( ) =>{
      fs.readFile ("./ordhekDinData.json", "utf8", async (err, data) => {
      if (err) {
        console.log("File read failed:", err);
      }
      console.log("retrive data successfully...");
      let val = await JSON.parse(data)
      // console.log(val.length)
      await val.map((el:jsonDataType)=>jsonString.push(el))
    });
    
  }

const pushData = async(Biodata: Biodata1|Biodata2) =>{
    try{
        const bio = await AppDataSource.manager.save(Biodata)
        console.log("data save successfully...", bio)
    }
    catch(err){
        console.log('data already save in database')
        // console.log(err)
    }
    
}

const main = async (wichDatabase:string)=>{
    wichDatabase=='mongodb'? AppDataSource = AppDataSource2 : AppDataSource = AppDataSource1
    await readJsonData()
    await AppDataSource.initialize().
    then(async () => {
    let count = 0

    while(count<jsonString.length){
        let {bioDataNumber,maritalStatus,birthYear,proffesion,bioDataLink} = jsonString[count]
        let bio: Biodata1 | Biodata2
        wichDatabase=='mongodb'? bio= new Biodata2():bio=new Biodata1();
      
          bio.bioDataNumber = bioDataNumber
          bio.maritalStatus = maritalStatus
          bio.birthYear = birthYear
          bio.proffesion = proffesion
          bio.bioDataLink = bioDataLink
         await pushData(bio)
         console.log(count)
       // await AppDataSource.createQueryBuilder().delete().from(Biodata1).execute()
         count+=1
    }

}).catch((error: any) => console.log(error))

}

let start = 90
let end = 92

const interval1 =setInterval(()=>{    
    scrapBiodata(start,end)
    if(start == end ){
       const interval2 = setInterval(()=>{
         //which databse you want to store data(mongodb or postgree)
        main('mongodb')//mongodb
        .then(()=>console.log('all data push in Database'))
        clearInterval(interval2)
       },3000) 
       clearInterval(interval1)
    }
    start+=1

},2000)



