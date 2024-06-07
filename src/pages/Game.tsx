import { Button, Grid, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRef } from 'react';
import { PlayResult, getRanking } from '../utils';
import { DrawCanvas, DrawCanvasMethods } from '../components/drawCanvas';
import { useNavigate } from 'react-router-dom'; //追加
import { RankCard } from '../components/rankCard';


interface Props {
    char: string;
    ranking: PlayResult[];
}

export const GamePage = (props: Props): JSX.Element => {
    const canvas = useRef<DrawCanvasMethods | null>(null)
    const navigate = useNavigate()
    return (
        <>
            <Grid container spacing={1} padding={1} sx={{height: "100%"}}>
                <Grid item xs={3} padding={2}>
                    <Paper elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            お題の漢字：
                        </Typography>
                        <Typography sx={{ fontSize: "4em" }} fontWeight={"bold"} gutterBottom>
                            {props.char}
                        </Typography>
                    </Paper>
                    <Paper elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            ランキング
                        </Typography>
                        
                        <Stack spacing={2} height={"60%"} style={{overflowY: "scroll", height: "65vh", padding: "3px"}}>

                        <>
                        {
                            getRanking(props.char).map(result=>{
                                return <RankCard result={result} />
                            })
                        }
                        </>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={9} padding={2} sx={{height: "90vh"}}>
                    <Paper elevation={3} style={{position: "relative",padding: "10px"}} sx={{minHeight: "90%"}}>
                        <Typography variant="body1" gutterBottom>
                            ・指定された文字を<strong>読める範囲で、なるべく下手に</strong>なるよう枠内に書き込んでください<br/>
                            ・文字を書き終えたら『完成！』ボタンを押してください<br/>
                            ・AIがあなたの書いた文字を判定し、<br/>
                            　A. お題の文字ではないと判断した場合、0点を与えます<br/>
                            　B. お題の文字だと判断した場合、下手なほど高得点です
                        </Typography>
                        <Box position={"absolute"} top={0} bottom={0} left={0} right={0} maxHeight={"300px"} maxWidth={"300px"} margin={"auto"} border={"solid 4px black"} padding={0} boxSizing={"content-box"}>
                            <DrawCanvas ref={canvas} />
                            {/*<Button variant="outlined" color="error" style={{position: "absolute", left: -100, bottom: 0, margin: "auto"}} onClick={()=>{
                                canvas.current?.clear()
                            }}>クリア</Button>*/}
                        </Box>
                        <Button variant="contained" style={{position: "absolute", bottom: 20, right: 20, margin: "auto"}} onClick={()=>navigate("/result",{state: {base64Uri: canvas.current?.getBase64Uri(),char: props.char}})}>完成！</Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}