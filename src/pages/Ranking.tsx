import { Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { PlayResult, getRanking, kanjiTable, storageGetter } from "../utils";
import { useEffect, useState } from "react";

interface Props {
    char: string;
}

export const RankingPage = (props: Props):JSX.Element => {
    const storageBuffer = storageGetter()
    const listKanjis: string[] = []
    const [target, setTarget] = useState("");
    const [ranking, setRanking] = useState<PlayResult[]>([]);
    storageBuffer.forEach(result => {
        if (!listKanjis.includes(result.character)) {
            listKanjis.push(result.character)
        }
    })

    const refreshRanking = (tar: string) => {
        setTarget(tar)
        setRanking(getRanking(tar=="All"?"":tar))
    }

    useEffect(()=>{
        const tar = listKanjis.includes(props.char)?props.char:"All"
        refreshRanking(tar)
    },[])
    const selectArray = kanjiTable.split("").map(kanji=> {
        if (listKanjis.includes(kanji)){
            return <MenuItem value={kanji}>{kanji}</MenuItem>
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
            <MenuItem value={"All"}>All</MenuItem>
            {selectArray}
        </Select>
        </FormControl>
        <Stack spacing={2} height={"60%"} style={{overflowY: "scroll", height: "70vh", padding: "20px"}}>
            <>
            {
                ranking.map(result=>{
                    return <Card style={{display: "flex"}}>
                        <CardContent style={{width: "70%"}}>
                            <Typography variant="h5" style={{borderBottom: "1px solid black"}}>
                                {result.playerName} さん
                            </Typography>
                            <Typography variant="h5" style={{borderBottom: "1px solid black"}}>
                                お題：<strong>{result.character}</strong>
                            </Typography>
                            <Typography variant="caption">
                                {result.date}
                            </Typography>
                            <Typography variant="h4">
                                <strong>{result.score}</strong>点
                            </Typography>
                        </CardContent>
                        <CardMedia style={{width: "30%", display: "flex", justifyContent: "center"}}>
                            <img src={result.base64Uri} style={{height: "90%", border: "solid 1px black", margin: "auto"}} />
                        </CardMedia>
                    </Card>
                })
            }
            </>
        </Stack>
    </Paper>
    )
    
}