import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import store from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

function Appliedjobs() {
  const {appliedjobs}=useSelector(store=>store.job)
  
  return (
    <div>
      <Table>
       
        <TableHeader>
            <TableRow>
                <TableHead>Date </TableHead>
                <TableHead>Job role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
           {
             appliedjobs.length<=0?<span className='font-bold'>You haven't applied to any job yet.</span>:appliedjobs.map((appliedjob,index)=>(
                <TableRow key={appliedjob?._id}>
                    <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{appliedjob?.job?.title}</TableCell>
                    <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                    <TableCell className="text-right"  ><Badge className={`${appliedjob?.status==='rejected'?"bg-red-400":`${appliedjob?.status==='pending'?"bg-gray-400":"bg-green-400"}`} text-black hover:bg-bule-300`}>{appliedjob?.status?.toUpperCase()}</Badge></TableCell>
                </TableRow>
             ))
           }
        </TableBody>
      </Table>
    </div>
  )
}

export default Appliedjobs
