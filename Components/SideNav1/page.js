import React from 'react';
import Link from 'next/link';
import '../../ui/sidebar.css';

export default function SideNav1() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link href="/" className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
                <div className="w-32 text-white md:w-40">
                </div>
            </Link>
            <Link href="/Regional/" className="nav-link">Home</Link>
            <Link href="/Regional/add" className="nav-link">Add Blood</Link>
            <Link href="/Regional/approve" className="nav-link">Approve Blood</Link>
            <Link href="/Regional/update" className="nav-link">Update Blood</Link>
            
                <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">

                    <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                    <form>
                        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">

                            <div className="hidden1 md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
                ); 
            }
        
        
        
        