import { Button,Typography, Paper, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface Props {
    char: string;
}


export const TopPage = (props: Props):JSX.Element => {
    const navigate = useNavigate()
    return (
        <Container style={{padding:20}}>
            <Paper style={{padding:20}}>
            <Typography variant={"h3"} gutterBottom>
                現在の漢字：<strong>{props.char}</strong>
            </Typography>
            <Typography variant={"caption"} gutterBottom>
                漢字は1時間ごとに変わります
            </Typography>
            <Button variant="contained" style={{margin: "10px auto", fontSize: 40}} onClick={()=>navigate("/game")}>遊ぶ</Button><br/>
            <Button variant="outlined" style={{margin: "10px auto", fontSize: 40}}>ランキングを見る</Button>
            </Paper>
        </Container>
    )
}