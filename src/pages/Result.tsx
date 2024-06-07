import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { PSM, createWorker, OEM } from 'tesseract.js';

import { AppBar, Button, CardContent, Grid, Paper, Box, Typography } from '@mui/material';
import { kanjis } from '../others/kanjis';
import { PlayResult, resizeImg, storageGetter, storagePusher } from '../utils';



interface State {
    char: string;
    base64Uri: string;
}

export const ResultPage = (): JSX.Element => {
    const location = useLocation(); 
    const {char, base64Uri} = location.state as State
    const [confidence,setConfidence] = useState<number>(-1);
    const [script,setScript] = useState<string>("");
    const [waiting,setWaiting] = useState<boolean>(true)
    const [score,setScore] = useState<number>(-1)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const worker = await createWorker("jpn",OEM.TESSERACT_LSTM_COMBINED)
            await worker.setParameters({tessedit_pageseg_mode: PSM.SINGLE_CHAR})
            await worker.setParameters({tessedit_char_whitelist: kanjis})
            const { data } = await worker.recognize(base64Uri);
            if (data.symbols.length>0) {
                setScript(data.symbols![0].text)
                setConfidence(data.symbols![0].confidence!)
                setWaiting(false)
                if (data.symbols![0].text === char) {
                    setScore(Math.round((100-data.symbols![0].confidence!)*1000)/1000)
                } else {
                    setScore(0)
                }

            } else {
                
                setScript("判読不能")
                setScore(0)
                setWaiting(false)
            }
            await worker.terminate();
          })();
    }, []);
    return (
        <>
        <Grid container padding={4} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={3} style={{padding: 10}}>
                    <Typography variant="h4">お題に出た文字</Typography>
                    <Box border={"solid 1px black"} width={150} height={150} margin={"10px auto"} padding={0}>
                        <Typography fontSize={150} textAlign={"center"} fontFamily={"serif"} lineHeight={"150px"}>{char}</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={3} style={{padding: 10}}>
                    <Typography variant="h4">あなたが書いた文字</Typography>
                    <Box border={"solid 1px black"} width={150} height={150} margin={"10px auto"}>
                        <img src={base64Uri} width={150} height={150} />
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
            {waiting?"読み込み中……":(
                <Paper>
                    <Typography variant="h4" textAlign={"center"}>
                        AIはあなたの文字を <strong>{script}</strong> と判断しました
                    </Typography>
                    <Typography variant="h4" textAlign={"center"}>
                    スコア： <strong>{score}</strong>
                    </Typography>
                <Button variant="contained" style={{margin: "10px auto", fontSize: 40, display: "block", width: "10em"}} onClick={()=>navigate("/game")}>もう一度</Button>
                <Button variant="outlined" style={{margin: "10px auto", fontSize: 40, display: "block", width: "10em"}} onClick={()=>{
                    const playerName = window.prompt("プレイヤー名を入力してください")
                    if (playerName === null) {
                        navigate("/")
                    } else {
                        const d = new Date()
                        const outResult: PlayResult = {
                            playerName: playerName,
                            base64Uri: resizeImg(base64Uri),
                            score: score,
                            character: char,
                            date: d.toString()
                        }
                        storagePusher(outResult)
                        console.log(storageGetter().length)
                        navigate("/")
                    }
                }}>ランキングに登録</Button>
                <Button variant="contained" style={{margin: "10px auto", fontSize: 40, display: "block", width: "10em"}} onClick={()=>navigate("/top")}>タイトルへ</Button>

                </Paper>
            )}
            </Grid>
        </Grid>
        </>
    )
}