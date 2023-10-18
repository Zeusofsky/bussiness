import React, { useRef, useEffect, useState, LegacyRef, createRef, RefObject } from 'react';


interface ISecurityCodeProps {
  _forceRefresh: boolean,
  _refresh: boolean
}
interface TextStyle {
  fontSize:Number, 
  fontFamily:String, 
  fontWeight:String, 
  textWidth:number, 
  textAlign:CanvasTextAlign, 
  textBaseline:CanvasTextBaseline
}
const SecurityCode = ({ _forceRefresh, _refresh }: ISecurityCodeProps) => {
    const canvasRef = createRef<any>();
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();
    const [context, setContext] = useState<CanvasRenderingContext2D>()
    const [forceRefresh, setForceRefresh] = useState(_forceRefresh)
    const [refresh, setRefresh] = useState(false)
    // const [draw, setDraw] = useState<boolean>(true);

    useEffect(() => {
      setRefresh(_refresh)
      if (canvasRef.current) {
          setCanvas(canvasRef.current);
          canvas!.width = canvasRef.current?.clientWidth!;
          canvas!.height = canvasRef.current?.clientHeight!;
          setContext(canvasRef.current?.getContext('2d'));  
          if (context) {
            context.clearRect(0, 0, canvas!.width, canvas!.height);
          }
          // writeText({ text: generateCode(), x: 5, y: 0 });
      }
    },[]);
    useEffect(() => {  
      console.log('Canves useEffect not start')
      if(refresh){console.log('Canves useEffect start')
        writeText({ text: generateCode(), x: 2, y: 0 });
      }
    }, [refresh]);

    const writeText = (info: any, style: TextStyle = {fontSize: 14, fontFamily: 'Arial', fontWeight: 'bold', textWidth: 80, textAlign: 'left', textBaseline: 'top'}) => {
      const { text, x, y } = info;
      const { fontSize, fontFamily, fontWeight, textWidth, textAlign, textBaseline } = style;
  
      var gradient = context?.createLinearGradient(20, 0, 80, 0);
      gradient?.addColorStop(0,  'rgb(253, 56, 7)');
      gradient?.addColorStop(.5, '#fd8555');
      gradient?.addColorStop(1, 'rgb(253, 56, 7)');
  
      context?.beginPath();
      context!.font = fontWeight + ' ' + fontSize + 'pt ' + fontFamily;
      // context!.textWidth = textWidth!;
      context!.textAlign = textAlign;
      context!.textBaseline = textBaseline;
      context!.fillStyle = gradient!;
      context!.fillText(text, x, y, textWidth);
      context!.stroke();
    }
  
    const generateCode = () => {
      let text = "QWERTYUIOPASDFGHJKLZXCVBNM123456789QWERTYUIOPASDFGHJKLZXCVBNM123456789"
      let code = ''
  
      for(var i=0; i<6; i++){
        let rndm = Math.random()
        let start = (Math.floor(rndm * text.length + 1) <= text.length - 1) ? Math.floor(rndm * text.length + 1) : text.length - 1
  
        let one_char = text.substring(start, start + 1);
        code += one_char;
      }
      sessionStorage.setItem("securityCode", code);
      return code;
    }
  
    const refreshing = () =>{
      if(canvas && refresh){
        setContext(undefined);
  
        setContext(canvas.getContext("2d")!);
        context?.clearRect(0, 0, canvas.width, canvas.height);
  
        writeText({ text: generateCode(), x: 2, y: 0 });
      }

      setRefresh(refresh);
      setForceRefresh(forceRefresh);
      return ''
    }

    return (
      <div>    
        { (forceRefresh !== _forceRefresh) || (refresh !== _refresh) ? refreshing() : '' }
        <canvas ref={canvas as any} width="80" height="20"></canvas>
      </div>
    );
};
// as RefObject<LegacyRef<HTMLCanvasElement>>
export default SecurityCode;
