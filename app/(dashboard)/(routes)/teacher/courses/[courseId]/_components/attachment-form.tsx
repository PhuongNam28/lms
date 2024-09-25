"use client";
import * as z from "zod";
import axios from "axios";
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button";
import { File, ImageIcon, ImagesIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


import Image  from "next/image";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & {attachments: Attachment[]}
  courseId: string;
}

const formSchema = z.object({
 url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };
  const router = useRouter()

 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   try {
     await axios.post(`/api/courses/${courseId}/attachments`, values)
     toast.success("Course updated")
     toggleEdit()
     router.refresh()
   } catch (error) {
    toast.error("Something went wrong")
   }
  };
  const onDelete = async (id: string) => {
    try {
      setDeletingId(id)
      axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Attachment deleted successfully")
      router.refresh()
    } catch {
        toast.error("Something went wrong")
    }
    finally{
      setDeletingId(null)
    }
  }
  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between ">
        Course Attachment
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          ) }
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2"/>
              Add an file
            </>
          )}
          
        </Button>
      </div>
      {!isEditing && (
       <>
        {initialData.attachments.length===0 && (
          <p className="text-sm mt-2 text-slate-500 italic">
            No Attachments yet 
          </p>
        )}
        {initialData.attachments.length > 0 &&(
          <div className="space-y-2">
            {
              initialData.attachments.map((attachment=>(
                <div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin"></Loader2>
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button onClick={()=>onDelete(attachment.id)} className="ml-auto hover:opactity-75 transition">
                      <X className="h-4 w-4"></X>
                    </button>
                  )}
                </div>
              )))
            }
          </div>
        )}
       </>
      )}
        {isEditing && (
            <div>
              <FileUpload
              endpoint="courseAttachment"
              onChange={(url)=>{
                if(url){
                  onSubmit({url : url})
                }
              }}/>
              <div className="text-xs text-muted-foreground mt-4">Add anything your student might need to complete the course</div>
            </div>
        )}
    </div>
  );
};

export default AttachmentForm;
