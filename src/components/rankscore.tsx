import React from 'react';
import { PlayResult } from '../utils';
import { CardContent, Typography } from '@mui/material';

interface Props {
    result: PlayResult;
    order: number;
}

export const GamePage = (props: Props): JSX.Element => {
    return(
        <CardContent>
            
            <Typography variant={"h6"}>{props.order}位</Typography>
            <Typography variant={"body1"}><strong>{props.result.playerName}</strong> さん</Typography>
            <Typography variant={"body1"}>{props.result.score}点</Typography>
        </CardContent>
    )
}
