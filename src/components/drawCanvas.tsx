import { fabric } from "fabric";
import { Canvas } from 'fabric/fabric-impl';
import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from "react";
const canvasId = "canvas";

export interface DrawCanvasMethods {
    clear: () => void;
    getBase64Uri: () => string;
}

export const DrawCanvas = forwardRef((props: any, ref: any) =>{
    const [fabricCanvas, setFabricCanvas] = useState<Canvas>()
    

    const clearing = () =>{
        const canvas = new fabric.Canvas(canvasId, {
        isDrawingMode: true,
        backgroundColor: "#ffffff",
        });
        canvas.setWidth(300)
        canvas.setHeight(300)
            
        canvas.freeDrawingBrush.color = "#000000";
        canvas.freeDrawingBrush.width = 7;
        canvas.clear()
        setFabricCanvas(canvas)
    }
    useImperativeHandle(ref,()=>({
        clear: ()=>{
            clearing()
        },
        getBase64Uri: () => {
            return (document.getElementById(canvasId) as HTMLCanvasElement).toDataURL()
        }
    }))
    useEffect(clearing, []);

    const handleBeforeUnload = () => {
        clearing()
    }
    
    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [handleBeforeUnload])

    return (
        <canvas id={canvasId} style={{height: "300px",width: "300px"}} />
    )
})