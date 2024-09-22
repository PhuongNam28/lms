"use client";
import * as z from "zod";
import axios from "axios";
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button";
import { ImageIcon, ImagesIcon, Pencil, PlusCircle } from "lucide-react";
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
