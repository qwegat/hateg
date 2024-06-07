import { Button,Typography, Paper, Container } from "@mui/material";

interface Props {
    char: string;
}


export const TopPage = (props: Props):JSX.Element => {
    return (
        <Container style={{padding:3}}>
            <Paper style={{padding:3}}>
            <Typography variant={"h3"} gutterBottom>
                現在の漢字：<strong>{props.char}</strong>
            </Typography>
            <Button size={"large"}>遊ぶ</Button>
            </Paper>
        </Container>
    )
}