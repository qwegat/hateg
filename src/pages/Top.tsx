import { Button,Typography, Paper, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface Props {
    char: string;
}


export const TopPage = (props: Props):JSX.Element => {
    const navigate = useNavigate()
    return (
        <Box style={{padding:20}}>
            <Paper style={{padding:20}}>
            <Typography variant={"h3"} gutterBottom>
                現在の漢字：<strong>{props.char}</strong>
            </Typography>
            <Typography variant={"body1"} gutterBottom>
                漢字は1時間ごとに変わります
            </Typography><br/><br/><br/>
            <Button variant="contained" style={{margin: "10px auto", fontSize: 40, display: "block", width: "10em"}} onClick={()=>navigate("/game")}>遊ぶ</Button>
            <Button variant="outlined" style={{margin: "10px auto", fontSize: 40, display: "block", width: "10em"}} onClick={()=>navigate("/ranking")}>ランキングを見る</Button>
            </Paper>
        </Box>
    )
}