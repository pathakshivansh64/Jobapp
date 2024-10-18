import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { applicationapi } from '@/const'
import axios from 'axios'
import { CircleCheck, CircleX, MoreHorizontal } from 'lucide-react'

import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

function ApplicantsTable() {
    const shortlistingstatus=["Accepted","Rejected"];
    const {applicants}=useSelector(store=>store.applicant)
    
    

    const statusHandler=async(status,id)=>{
         try {
            const res=await axios.post(`${applicationapi}/updatestatus/${id}`,{status},{withCredentials:true})
            
            if(res.data.success){
                toast.success(res.data.message);
            }
         } catch (error) {
          toast.error(error.response.data.message)
            
         }
         finally{
           
         }
    }
  return (
    <div>
        <div>
      <Table className="my-2">
        <TableCaption>A list of your recent registered company</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {
    applicants?.appliction?.length <=0?<span className="my-2 font-bold ">No One Applied Yet!</span>:(
      applicants?.appliction?.map((applicant)=>{
        return(
          <>
        
          <TableRow key={applicant?.applicant?._id}>
            
             
              <TableCell>{applicant?.applicant?.fullname}</TableCell>
              <TableCell>{applicant?.applicant?.email}</TableCell>
              <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
              <TableCell>{applicant?.applicant?.profile?.resumerealname}</TableCell>
              <TableCell>{applicant?.applicant?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
               {
                applicant?.status==="pending"? <Popover>

                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-fit p-2 px-4 cursor-pointer">
               
                  {
                      shortlistingstatus.map((status,index)=>{
                          return(
                          <div onClick={()=>statusHandler(status,applicant?._id)} className='font-bold cursor-pointer' key={index}>
                             {status}
                          </div>
                          )
                      })
                  
                  }
               
                </PopoverContent>
              </Popover>:<Badge className={`${applicant?.status==='rejected'?"bg-red-400":`${applicant?.status==='pending'?"bg-gray-400":"bg-green-400"}`} text-black hover:bg-bule-300`}>You Already {applicant?.status} him</Badge>
               }
              </TableCell>
            </TableRow>
          </>
        )
      })
    )
  }        
         
        </TableBody>
      </Table>
    </div>
    </div>
  )
}

export default ApplicantsTable
