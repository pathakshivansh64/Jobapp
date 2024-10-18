import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { setsearchquery } from '@/redux/jobslice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Categorycarosel() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchHandler=(query)=>{
      dispatch(setsearchquery(query));
      navigate('/browse');
  }


    const category=[
        "frontend Developer",
        "Backend Developer",
        "Data Scientist",
        "Data Analyst",
        "Graphic Designer",
        "3D Animation",
        "Cyber Security",
        "Game Development"
    ]

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-14">
        <CarouselContent>
            {
                category.map((cat,index)=>(
                    <CarouselItem className="md:basis-1/2 lg:basis-2/6" key={index}>
                        <Button onClick={()=>searchHandler(cat)} variant="outline" className="rounded-full bg-[#6A38C2] text-white  transition-transform duration-300 ease-in-out transform hover:scale-110 ">{cat}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious className=" transition-transform duration-300 ease-in-out transform hover:scale-110"/>
        <CarouselNext className=" transition-transform duration-300 ease-in-out transform hover:scale-110" />
      </Carousel>
    </div>
  )
}

export default Categorycarosel
