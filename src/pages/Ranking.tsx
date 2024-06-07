import { FormControl, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { PlayResult, getRanking, kanjiTable, storageGetter } from "../utils";
import { useEffect, useState } from "react";
import { RankCard } from "../components/rankCard";

interface Props {
    char: string;
}

export const RankingPage = (props: Props):JSX.Element => {
    const storageBuffer = storageGetter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const listKanjis: string[] = []
    const [target, setTarget] = useState("");
    const [ranking, setRanking] = useState<PlayResult[]>([]);
    storageBuffer.forEach(result => {
        if (!listKanjis.includes(result.character)) {
            listKanjis.push(result.character)
        }
    })

    const refreshRanking = (tar: string) => {
        console.log(tar)
        setTarget(tar)
        setRanking(getRanking(tar==="All"?"":tar))
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
        <FormControl style={{width: "40%"}}>
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
        <Stack spacing={2} height={"60%"} style={{overflowY: "scroll", height: "70vh", padding: "20px"}}>
            <>
            {
                ranking.map(result=>{
                    return <RankCard result={result} />
                })
            }
            </>
        </Stack>
    </Paper>
    )
    
}