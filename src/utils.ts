import { Low } from "lowdb";

export interface PlayResult {
    playerName: string;
    base64Uri: string;
    score: number;
    character: string;
    date: Date;
}

export interface DbSchema {
    results: PlayResult[];
}
/*
export const getRanking = async (character: string,db: Low<DbSchema>):Promise<PlayResult[]> =>{
    await db.read();
    const filteredResults = db.data.results.filter(result=>(result.character === character))
    filteredResults.sort((a,b)=>b.score-a.score)
    return filteredResults
}
*/