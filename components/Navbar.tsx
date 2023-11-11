import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faCalendar, faComments, faGear, faHome, faPen, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {

  return (
    <nav className="text-white bg-black h-screen w-10 flex flex-col justify-between">
      <ul className="flex flex-col justify-center">
        <Link href="/code/home">
          <FontAwesomeIcon icon={faHome} className="text-2xl m-2 cursor-pointer" title="Home" />
        </Link>
        <Link href="/code/problemset">
          <FontAwesomeIcon icon={faBrain} className="text-2xl m-2 cursor-pointer" title="Problem Set" />
        </Link>
        <Link href="/code/contests">
          <FontAwesomeIcon icon={faCalendar} className="text-2xl m-2 cursor-pointer" title="Contests" />
        </Link>
        <Link href="/code/blogs">
          <FontAwesomeIcon icon={faComments} className="text-2xl m-2 cursor-pointer" title="Blogs" />
        </Link>
        <Link href="/code/create">
          <FontAwesomeIcon icon={faPen} className="text-2xl m-2 cursor-pointer" title="Create" />
        </Link>
      </ul>

      <ul className="flex flex-col justify-center">
      <Link href="/code/profile">
        <FontAwesomeIcon icon={faUser} className="text-2xl m-2 cursor-pointer" title="Profile" />
      </Link>
      <Link href="/code/settings">
        <FontAwesomeIcon icon={faGear} className="text-2xl m-2 cursor-pointer" title="Settings" />
      </Link>
      </ul>
    </nav>
  )
}

export default Navbar
