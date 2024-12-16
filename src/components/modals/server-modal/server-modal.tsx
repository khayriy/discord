"use client"
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-state";
import dynamic from "next/dynamic";
import FileUpload from '@/components/file-upload'
// const FileUpload = dynamic(() => import("@/components/file-upload"), { ssr: true });



const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server Name Is Require",
  }),
  imageUrl: z.string().min(1, {
    message: "Server Image Is Require",
  }),
});

const ServerModal = () => {

   

    const {isOpen , type  ,onClose} = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'createServer'
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   try {
      await axios.post('/api/servers' , values)
      form.reset() 
      router.refresh()
      onClose() 
     
   }
   catch(err) {
    console.log(err)
   }
  };

  const handleClose = ()=>{
    form.reset() 
    onClose()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Your Server
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Make it shine with attractive name and image , you can change it
            later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField 
                control={form.control} 
                name="imageUrl" 
                render={({field})=>
                     (
                      <FormItem>
                        <FormControl>
                          <FileUpload 
                          endpoint='serverImage' 
                          value={field.value} 
                          onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )
                }
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" {...field} placeholder="Enter Server Name"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
  )
                }
              />
            </div>
            <DialogFooter className="bg-gray-100 p-6 flex items-center justify-center">
                <Button variant='primary'>
                    Create
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServerModal;