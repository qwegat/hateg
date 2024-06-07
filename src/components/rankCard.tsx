import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { PlayResult } from "../utils"

interface Props {
    result: PlayResult;
}

export const RankCard = ({result}:Props):JSX.Element => {
    return (
        <Card style={{display: "flex", padding: "3px",  overflow: "visible"}}>
            <CardContent style={{width: "55%", padding: "4px"}}>
                <Typography variant="h6" style={{fontSize: "0.9em"}}>
                    <strong>{result.playerName}</strong> さん
                </Typography>
                <Typography variant="h5">
                    お題：<strong>{result.character}</strong>
                </Typography>
                <Typography variant="caption" style={{lineHeight: "0.6em"}}>
                    {result.date}
                </Typography>
                <Typography variant="h5">
                    <strong>{result.score}</strong>点
                </Typography>
            </CardContent>
            <CardMedia style={{width: "45%", display: "flex", justifyContent: "center", padding: "2px"}}>
                <img src={result.base64Uri} style={{maxHeight: "90%",maxWidth: "95%", border: "solid 1px black", margin: 10, objectFit: "contain", padding: 0,}} />
            </CardMedia>
        </Card>
    )
}