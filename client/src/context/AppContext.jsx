import { createContext, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    // const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState([true])

    // Fetch aLL cOUrses
    const fetchAllCourses = async ()=>{
        setAllCourses(dummyCourses)
    }
    // Function to calculate average rating of course
    const calculateRating = (course)=>{
        if (course.courseRatings.length ===0){
            return 0
        }
        let totalRating = 0
        course.courseRatings.forEach(rating=>{
            totalRating+=rating.rating
        })
        return totalRating/course.courseRatings.length

    }

    // Function to calculate course chapter time
    const calculateChapterTime = (chapter)=>{
        let time = 0
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time* 60 * 1000, {units:["h","m"]})
    }

    // Function to calculate course Duration
    const calculateCourseDuration = (course)=>{
        let time = 0
        course.courseContent.map((chapter)=>chapter.chapterContent.map(
            (lecture)=> time+=lecture.lectureDuration
        ))
        return humanizeDuration(time* 60 * 1000, {units:["h","m"]})
    }

    // Function to calculate to No of lectures in the course
    const calculateNoOfLectures = (course)=> {
        let totalLecture = 0;
        course.courseContent.forEach(chapter=>{
            if(Array.isArray(chapter.chapterContent)){
                totalLecture+=chapter.chapterContent.length
            }
        });
        return totalLecture
    }

    useEffect(()=>{
        fetchAllCourses()
    },[])

    const value = {
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

