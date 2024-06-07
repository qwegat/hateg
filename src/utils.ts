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
    const filteredResults = storageGetter().filter(result=>(result.character === character))
    filteredResults.sort((a,b)=>b.score-a.score)
    return filteredResults
}


