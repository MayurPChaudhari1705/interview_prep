import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const page = async ({ params } : RouteParams) => {
    const { id } = await params;
    const user = await getCurrentUser();
    const interview = await getInterviewById(id);
    const feedback = await getFeedbackByInterviewId({ interviewId : id , userId : user?.id!})
    const formattedDate = dayjs( feedback?.createdAt ).format('MMM D , YYYY - h:mm A');
  return (
    <section className='flex flex-col items-center w-[80%] mx-auto gap-4 '>
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-4xl'>Feedback on the Interview &ndash; <span className='capitalize'>{interview?.role}</span>&nbsp;Interview </h1>
            <div className='flex flex-row gap-4 py- px-4 justify-around'>
                <div className='flex flex-row gap-2 px-4'>
                    <Image src='/star.svg' alt='star' width={22} height={22} />
                    <p className='font-semibold capitalize'>Overall Impression : <span className='px-2'>{feedback ? feedback.totalScore : '---'} / 100</span> </p>
                </div>
                <div className='flex flex-row gap-2 px-4'>
                    <Image src='/calendar.svg' alt='calendar' width={22} height={22} />
                    <p className='font-semibold capitalize'>{formattedDate} </p>
                </div>
            </div>
        </div>
        <div className='w-full h-[1px] bg-dark-200' />
        <div className='flex flex-col gap-4 px-12'>
            <p className='font-semibold text-lg text-light-100/80'>{feedback?.finalAssessment} </p>
            <div>
                <h2 className='text-2xl mb-4'>Breakdown of Evaluation :</h2>
                <ol className='list-decimal px-4 text-lg'>
                     {feedback?.categoryScores.map(({name , score , comment } , index ) => (
                        <li key={index} >
                            <h3 className='text-lg flex pr-2'>{name}  <p className='px-2'>({score} / 100)</p> </h3>
                            <ul>
                                {comment.split(/\.(?!\s*$)/).map(( sentence , index ) => (
                                    <li key={index} className='text-light-100/50'>
                                        {sentence}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
                <div className='my-4'>
                    <h2 className='text-2xl'>Strength :</h2>
                    <ol className='list-decimal px-8'>
                        {feedback?.strengths.map(( sentence , index ) => (
                            <li key={index} className='text-light-100/50 px-2'>
                                {sentence}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className='my-4'>
                    <h2 className='text-2xl'>Areas of Improvement :</h2>
                    <ol className='list-decimal px-8'>
                        {feedback?.areasForImprovement.map(( sentence , index ) => (
                            <li key={index} className='text-light-100/50 px-2'>
                                {sentence}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
        <div className='buttons'>
                <Button className='btn-secondary mx-4 flex-1'>
                    <Link href='/' className='flex w-full justify-center' >
                    <p className='text-sm font-semibold text-primary-200 text-center'>Back to Dashboard</p>
                    </Link>
                </Button>
                 <Button className='btn-primary mx-4'>
                    <Link href={`/interview/${id}`} className='flex w-full justify-center' >
                    <p className='text-sm font-semibold text-black text-center'>Retake Interview</p>
                    </Link>
                </Button>
        </div>
    </section>
  )
}

export default page