import { Paper, Typography, Stack } from "@mui/material"
import { getRanking } from "../utils"
import { RankCard } from "./rankCard"

interface Props {
    char: string;
}

export const SimpleRanking = (props: Props):JSX.Element => {
    return (
        <Paper elevation={3} style={{height: "100%"}}>
            <Typography variant="h6" gutterBottom>
                簡易ランキング
            </Typography>
                        
            <Stack spacing={2} height={"90%"} style={{overflowY: "scroll", height: "90%", padding: "3px"}} justifyContent={"flex-start"}>

            <>
            {
                getRanking(props.char).map((result,index)=>{
                    return <RankCard result={result} order={index+1} />
                })
            }
            </>
            </Stack>
        </Paper>
    )
}