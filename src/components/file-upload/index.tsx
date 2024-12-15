import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { Suspense } from "react";
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
}
const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  onChange,
  value,
}) => {
    
    const fileType = value?.split('.')?.pop()

    if(value && fileType !== 'pdf') {
        return (
            <>
            <div className="relative h-20 w-20">
                <Image fill className="rounded-full" alt="upload" src={value}/>
                <button 
             onClick={()=>onChange("")} 
             className="rounded-full bg-rose-500 text-white p-1 absolute top-0 right-0 shadow-sm" 
             type="button" 
             >
                <X className="w-4 h-4"/>
            </button>   
            </div>
            
            </>
        )
    }
  return (
    <Suspense fallback={<div>Loading Upload...</div>}>

    
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url) }
      onUploadError={(error : Error)=>{console.log(error)}}
    />
    </Suspense> 
    
  );
};

export default FileUpload;
