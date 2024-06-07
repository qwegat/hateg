import { FormControl, Grid, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { PlayResult, getRanking, kanjiTable, storageGetter } from "../utils";
import { useEffect, useState } from "react";
import { RankCard } from "../components/rankCard";

interface Props {
    char: string;
}

type SortWay = "NtO" | "OtN" | "HtL" | "LtH"

export const RankingPage = (props: Props):JSX.Element => {
    const storageBuffer = storageGetter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const listKanjis: string[] = []
    const [target, setTarget] = useState("");
    const [sortWay, setSortWay] = useState<SortWay>("HtL");
    const [ranking, setRanking] = useState<PlayResult[]>([]);
    storageBuffer.forEach(result => {
        if (!listKanjis.includes(result.character)) {
            listKanjis.push(result.character)
        }
    })

    const refreshSorting = (way: SortWay, currentRanking: PlayResult[]) => {
        setSortWay(way)
        switch (way) {
            case "HtL":
                setRanking(currentRanking.slice().sort((a,b)=>b.score-a.score))
                break
            case "LtH":
                setRanking(currentRanking.slice().sort((a,b)=>a.score-b.score))
                break
            case "NtO":
                setRanking(currentRanking.slice().sort((a,b)=>{
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    return bDate.getTime()-aDate.getTime();
                }))
                break
            case "OtN":
                setRanking(currentRanking.slice().sort((a,b)=>{
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    return aDate.getTime()-bDate.getTime();
                }))
                break
        }
    }

    const refreshRanking = (tar: string) => {
        setTarget(tar)
        refreshSorting(sortWay,getRanking(tar==="All"?"":tar))
    }

    useEffect(()=>{
        const tar = listKanjis.includes(props.char)?props.char:"All"
        refreshRanking(tar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // eslint-disable-next-line array-callback-return
    const selectArray = kanjiTable.split("").map(kanji=> {
        if (listKanjis.includes(kanji)){
            return <MenuItem value={kanji} key={kanji}>{kanji}</MenuItem>
        }
    })
    return (
    <Paper elevation={3} style={{padding: "10px"}}>
        <Typography variant="h3">ランキング</Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                <Select
                    value={target}
                    onChange={(e:any)=>refreshRanking(e.target.value)}
                    style={{
                        fontSize: "1em",
                        lineHeight: "0.8em",
                        height: "4em",
                        marginTop: "10px"
                    }}
                    fullWidth
                >
                    <MenuItem value={"All"} key="All">All</MenuItem>
                    {selectArray}
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                <Select
                    value={sortWay}
                    onChange={(e:any)=>refreshSorting(e.target.value as SortWay,ranking)}
                    style={{
                        fontSize: "1em",
                        lineHeight: "0.8em",
                        height: "4em",
                        marginTop: "10px"
                    }}
                    fullWidth
                >
                    <MenuItem value={"HtL"} key="HtL">スコアが高い順</MenuItem>
                    <MenuItem value={"LtH"} key="LtH">スコアが低い順</MenuItem>
                    <MenuItem value={"NtO"} key="NtO">新しい順</MenuItem>
                    <MenuItem value={"OtN"} key="OtN">古い順</MenuItem>
                </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Stack spacing={2} height={"60%"} style={{overflowY: "scroll", height: "70vh", padding: "20px"}}>
            <>
            {
                ranking.map((result,index)=>{
                    return <RankCard result={result} order={index+1} />
                })
            }
            </>
        </Stack>
    </Paper>
    )
    
}