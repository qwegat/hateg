import { Low } from "lowdb";

export interface PlayResult {
    playerName: string;
    base64Uri: string;
    score: number;
    character: string;
    date: string;
}

export interface DbSchema {
    results: PlayResult[];
}

export const storageGetter = (): PlayResult[] => {
    const item = localStorage.getItem("HategStorage")
    if (item == null) {
        localStorage.setItem("HategStorage","[]")
        return []
    } else {
        return JSON.parse(item) as PlayResult[]
    }
}

export const storagePusher = (result: PlayResult) => {
    const item = storageGetter()
    item.push(result)
    localStorage.setItem("HategStorage",JSON.stringify(item))

}

export const getRanking = (character: string):PlayResult[] =>{
    let filteredResults = storageGetter()
    if (character !== "") {
        filteredResults = filteredResults.filter(result=>(result.character === character))
    }

    filteredResults.sort((a,b)=>b.score-a.score)
    return filteredResults
}


export const kanjiTable = "命神変道金朝岩学芽臣雪町剣馬交銃男魚選君猫更軽赤夜"

export const getCurrentKanji = ():string => {
    const dt = new Date()
    return kanjiTable[dt.getHours()]
}

export const resizeImg = (input_base64: string):string => {
    const imageData = new Image()
    imageData.src = input_base64
    const canvas = document.createElement('canvas');
    canvas.width = 75;
    canvas.height = 75;
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(imageData, 0, 0,75,75);
    return canvas.toDataURL('image/png')
  }