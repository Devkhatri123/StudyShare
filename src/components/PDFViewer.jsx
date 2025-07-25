import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
export default function PDFViewer(props){
    const defaultPluginInstance = defaultLayoutPlugin();
    return (
      <div>
       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
       
       <Viewer fileUrl={props.pdfURL} plugins={[defaultPluginInstance]}/>
       
       </Worker>
     </div>
    )
}