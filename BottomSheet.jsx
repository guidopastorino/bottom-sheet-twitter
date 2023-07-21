'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots, BsPersonSlash, BsPerson, BsPeople } from 'react-icons/bs'
import { PiPaperPlaneTilt } from 'react-icons/pi'
import ReactDOM from 'react-dom'

const BottomSheet = ({username}) => {
    const BtnMenuRef = useRef()
    const MenuRef = useRef()

    const [menu, setMenu] = useState(false)
    const [animation, setAnimation] = useState(false)

    useEffect(() => {
        if (menu) {
            // sibling main container
            document.querySelector("#_next").classList.add("brightness-50", "pointer-events-none")
        } else {
            document.querySelector("#_next").classList.remove("brightness-50", "pointer-events-none")
        }
    }, [menu])

    useEffect(() => {
        let handler = e => {
            if (e.target === BtnMenuRef.current) return;
            if (menu) {
                if (!MenuRef.current.contains(e.target)) {
                    setAnimation(false)
                    setTimeout(() => {
                        setMenu(false)
                    }, 150);
                }
            }
        }

        document.addEventListener("mousedown", handler)

        return () => document.removeEventListener("mousedown", handler)
    })

    return (
        <>
            <button ref={BtnMenuRef} onClick={() => {
                setAnimation(true)
                setMenu(true)
            }} className='w-6 h-6 rounded-full duration-100 active:brightness-75 active:scale-90 flex justify-center items-center text-[#f0f2f2]'><BsThreeDots /></button>

            {menu && <>
                {
                    ReactDOM.createPortal(
                        <div ref={MenuRef} className={`${animation ? "showMenu" : "hideMenu"} fixed z-50 rounded-tr-xl pt-3 rounded-tl-xl shadow-lg right-0 left-0 bg-[#15202b] text-[#f0f2f2] h-auto max-h-[60vh] overflow-y-auto`}>
                            <ul>
                                <li className='w-full p-3 flex justify-start items-center gap-3 text-lg active:bg-[#0e161d]'>
                                    <BsPerson className='text-2xl' />
                                    <span>Follow @{username}</span>
                                </li>

                                <li className='w-full p-3 flex justify-start items-center gap-3 text-lg active:bg-[#0e161d]'>
                                    <BsPersonSlash className='text-2xl' />
                                    <span>Block @{username}</span>
                                </li>

                                <li className='w-full p-3 flex justify-start items-center gap-3 text-lg active:bg-[#0e161d]'>
                                    <BsPeople className='text-2xl' />
                                    <span>Add to lists</span>
                                </li>

                                <li className='w-full p-3 flex justify-start items-center gap-3 text-lg active:bg-[#0e161d]'>
                                    <PiPaperPlaneTilt className='text-2xl' />
                                    <span>Send post to a friend</span>
                                </li>
                            </ul>
                        </div>,
                        document.body
                    )
                }
            </>}
        </>
    )
}

export default BottomSheet