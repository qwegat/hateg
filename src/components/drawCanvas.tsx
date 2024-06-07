import { fabric } from "fabric";
import { Canvas } from 'fabric/fabric-impl';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
const canvasId = "canvas";

export interface DrawCanvasMethods {
    clear: () => void;
    getBase64Uri: () => string;
}

export const DrawCanvas = forwardRef((props: any, ref: any) =>{
    const [fabricCanvas, setFabricCanvas] = useState<Canvas>()
    

    const initialize = () =>{
        const canvas = new fabric.Canvas(canvasId, {
        isDrawingMode: true,
        backgroundColor: "rgba(255,255,255,0)",
        });
        canvas.setWidth(300)
        canvas.setHeight(300)
            
        canvas.freeDrawingBrush.color = "#000000";
        canvas.freeDrawingBrush.width = 7;
        canvas.clear()
        setFabricCanvas(canvas)
    }

    const clearing = () => {
        if (fabricCanvas !== undefined) {
            fabricCanvas.clear()
            fabricCanvas.getContext().fillRect(0,0,300,300)
            fabricCanvas.renderAll()
        }
    }
    useImperativeHandle(ref,()=>({
        clear: ()=>{
            clearing()
        },
        getBase64Uri: () => {
            return (document.getElementById(canvasId) as HTMLCanvasElement).toDataURL()
        }
    }))
    useEffect(initialize, []);

    return (
        <canvas id={canvasId} style={{height: "300px",width: "300px"}} />
    )
})