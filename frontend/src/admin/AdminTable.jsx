import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import store from "@/redux/store";
import { Edit, Eye, MoreHorizontal } from "lucide-react";


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminTable() {
  
  const navigate=useNavigate();
  const { adminjobs ,searchjobs} = useSelector(store => store.company);
  const [filterjobs,setfilterjobs]=useState(adminjobs);
  
  
  
  useEffect(()=>{
  const filteredjobs=adminjobs.length>0 && adminjobs.filter((job)=>{
    if(!searchjobs){
      return true;
    }
    return job?.company?.name?.toLowerCase().includes(searchjobs?.toLowerCase())||job?.title?.toLowerCase().includes(searchjobs?.toLowerCase())
  });
  setfilterjobs(filteredjobs)
  },[adminjobs,searchjobs])
  return (
    <div>
      <Table className="my-2">
        <TableCaption>A list of your recent registered jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name </TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {
    filterjobs&&
      filterjobs.map((job)=>{
        return(
          <>
        
          <TableRow key={job?._id}>
             
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-2 px-4 cursor-pointer">
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}`)} className="flex gap-3">
                      <Edit className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex gap-3 my-1">
                      <Eye className="w-4 " />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          </>
        )
      })
    
  }        
         
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminTable;
