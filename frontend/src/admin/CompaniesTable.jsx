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
import { Edit, MoreHorizontal } from "lucide-react";


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  
  const navigate=useNavigate();
  const { companies,searchcompany } = useSelector(store => store.company);
  const [filtercompanies,setfiltercompany]=useState(companies);
  
  
  useEffect(()=>{
  const filteredcompany=companies.length>0 && companies.filter((company)=>{
    if(!searchcompany){
      return true;
    }
    return company?.name?.toLowerCase().includes(searchcompany?.toLowerCase())
  });
  setfiltercompany(filteredcompany)
  },[companies,searchcompany])
  return (
    <div>
      <Table className="my-2">
        <TableCaption>A list of your recent registered company</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {
    filtercompanies&&
      filtercompanies?.map((company)=>{
        return(
        <>
        
        <TableRow key={company._id}>
            <TableCell>
              <Avatar className="cursor-pinter">
                <AvatarImage
                  className="object-contain"
                  src={company.logo}
                />
              </Avatar>
            </TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-fit p-2 px-4 cursor-pointer">
                  <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex gap-3">
                    <Edit className="w-4" />
                    <span>Edit</span>
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

export default CompaniesTable;
