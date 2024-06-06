import { AppBar, Button, CardContent, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useRef } from 'react';
import { PlayResult } from '../utils';
import { DrawCanvas, DrawCanvasMethods } from '../components/drawCanvas';


interface Props {
    char: string;
    ranking: PlayResult[];
}

export const GamePage = (props: Props): JSX.Element => {
    const canvas = useRef<DrawCanvasMethods | null>(null)
    return (
        <>
            <AppBar position="static" style={{padding: 10}}>
                <Typography variant="h5" gutterBottom>
                    読める範囲で下手な字を書いた奴が勝ちオフライン
                </Typography>
            </AppBar>
            <Grid container spacing={1} padding={1} sx={{height: "100%"}}>
                <Grid item xs={3} spacing={1} padding={2}>
                    <Paper>
                        <Typography variant="h6" gutterBottom>
                            お題の文字列：
                        </Typography>
                        <Typography sx={{ fontSize: "4em" }} fontWeight={"bold"} gutterBottom>
                            {props.char}
                        </Typography>
                    </Paper>
                    <Paper>
                        <Typography variant="h6" gutterBottom>
                            ランキング
                        </Typography>
                        {
                            
                        }
                    </Paper>
                </Grid>
                <Grid item xs={9} spacing={1} padding={2} sx={{height: "90vh"}}>
                    <Paper style={{position: "relative"}} sx={{height: "100%"}}>
                        <Typography variant="body1" gutterBottom>
                            ・指定された文字を<strong>読める範囲で、なるべく下手に</strong>なるよう枠内に書き込んでください<br/>
                            ・文字を書き終えたら『完了』ボタンを押してください<br/>
                            ・AIがあなたの書いた文字を判定し、<br/>
                            　A. お題の文字ではないと判断した場合、0点を与えます<br/>
                            　B. お題の文字だと判断した場合、下手なほど高得点です
                        </Typography>
                        <Box position={"absolute"} top={0} bottom={0} left={0} right={0} maxHeight={"300px"} maxWidth={"300px"} margin={"auto"} border={"solid 4px black"} padding={0} boxSizing={"content-box"}>
                            <DrawCanvas ref={canvas} />
                            <Button variant="outlined" style={{position: "absolute", right: -100, bottom: 0, margin: "auto"}} onClick={()=>{
                                canvas.current?.clear()
                            }}>クリア</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}